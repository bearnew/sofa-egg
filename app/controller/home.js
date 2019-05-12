const Controller = require('egg').Controller;
const { AppID, AppSecret } = require('../constant/index');
const { isEmptyObj } = require('../helpers/utils');

class HomeController extends Controller {
	async index() {
		const { ctx } = this;
		ctx.body = 'hi, egg';
	}

	async login() {
		const { ctx } = this;
		const {
			jsCode,
			language,
			gender,
			...userInfo // avatarUrl, city, country, nickName, province
		} = ctx.query;

		const result = await ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${AppID}&secret=${AppSecret}&js_code=${jsCode}&grant_type=authorization_code`, {
			dataType: 'json'
		});

		const {
			session_key,
			openid
		} = result.data;

		const role = await ctx.model.User.findOne({
			where: {
				openid
			}
		});

		if (isEmptyObj(role)) {
			ctx.model.User.create({
				openid: openid,
				gender: gender === 1 ? 'male' : 'female',
				...userInfo
			});
		}

		const token = await this.service.actionToken.apply({ openid, session_key });

		ctx.status = 201;
		ctx.body = {
			token,
			openid
		}
	}

	async getUserInfo() {
		const { ctx } = this;
		const { openid } = ctx.request.body;

		const role = await ctx.model.User.findOne({
			where: {
				openid
			}
		});
		ctx.status = 200;
		ctx.body = {
			userInfo: role
		}
	}

	async praise() {
		const { ctx } = this;
		const {
			originalId,
			openid
		} = ctx.request.body;
		let msg = '';
		let code = 0;

		console.log('6666', JSON.stringify(ctx.request.body))
		const role = await ctx.model.User.findOne({
			where: {
				openid
			}
		});
		console.log('7777', JSON.stringify(role))

		const order = await ctx.model.Order.findOne({
			where: {
				user_id: role.id
			}
		});
		console.log('888', JSON.stringify(order))

		if (isEmptyObj(order)) {
			ctx.model.Order.create({
				user_id: role.id,
				likes_count: 1,
				likes_user_ids: JSON.stringify([role.id])
			});
			msg = '点赞成功!';
			code = 0;
		} else {
			const likes_user_ids = JSON.parse(order.likes_user_ids);
			likes_user_ids.push(role.id);

			ctx.model.Order.update({
				likes_user_ids: JSON.stringify(likes_user_ids)
			}, {
					where: {
						id: order.id
					}
				})
			msg = '你已经点过赞了!';
			code = 1;
		}

		ctx.status = 200;
		ctx.body = {
			code,
			msg
		}
	}
}

module.exports = HomeController;
