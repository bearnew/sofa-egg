const Controller = require('egg').Controller;
const { AppID, AppSecret } = require('../constant/index');
const { isEmptyObj } = require('../helpers/utils');

class HomeController extends Controller {
	async index() {
		const { ctx } = this;
		ctx.body = 'hi, egg';
	}

	// 登录
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

		let role = await ctx.model.User.findOne({
			where: {
				openid
			}
		})

		// 未注册过
		if (isEmptyObj(role)) {
			role = await ctx.model.User.create({
				openid: openid,
				gender: gender === 1 ? 'male' : 'female',
				...userInfo
			})
		}

		const token = await this.service.actionToken.apply({ openid, session_key });

		ctx.status = 201;
		ctx.body = {
			userId: role.dataValues.id,
			token,
			openid
		}
	}

	// 根据用户id创建订单
	async createOrder() {
		const { ctx } = this;
		const { userId } = ctx.request.body;

		let msg = '获取订单成功!';
		let orderData = await ctx.model.Order.findOne({
			where: {
				userId
			}
		});

		if (isEmptyObj(orderData)) {
			orderData = await ctx.model.Order.create({
				userId: userId,
				likes_count: 0,
				likes_user_ids: '[]'
			})
			msg = '创单成功!'
		}

		ctx.status = 201;
		ctx.body = {
			orderId: orderData.id,
			msg
		}
	}

	// 根据orderId获取用户信息
	async getShareUserInfo() {
		const { ctx } = this;
		const { orderId } = ctx.request.body;

		const orderData = await ctx.model.Order.findOne({
			where: {
				id: orderId
			}
		});

		const role = await ctx.model.User.findOne({
			where: {
				id: orderData.userId
			}
		});

		ctx.status = 200;
		ctx.body = {
			shareUserInfo: role
		}
	}

	// 根据orderId获取点赞人的头像
	async getLikesAvatar() {
		const { ctx } = this;
		const { orderId } = ctx.request.body;

		const orderData = await ctx.model.Order.findOne({
			where: {
				id: orderId
			}
		});

		console.log('22222', orderData.likes_user_ids)

		const users = await ctx.model.User.findAll({
			where: {
				id: {
					in: JSON.parse(orderData.likes_user_ids)
				}
			}
		});

		let avatars = [];
		if (!isEmptyObj(users)) {
			avatars = users.reduce((acc, user) => {
				acc.push(user.avatarUrl);
				return acc;
			}, []);
		}

		ctx.status = 200;
		ctx.body = {
			avatars
		}
	}

	// 点赞
	async praise() {
		const { ctx } = this;
		const {
			orderId,
			userId
		} = ctx.request.body;
		let msg = '';
		let code = 0;

		const order = await ctx.model.Order.findOne({
			where: {
				id: orderId
			}
		});

		const likes_user_ids = JSON.parse(order.likes_user_ids);

		if (likes_user_ids.includes(userId)) {
			msg = '你已经点过赞了!';
			code = 1;
		} else {
			likes_user_ids.push(userId);

			ctx.model.Order.update({
				likes_user_ids: JSON.stringify(likes_user_ids)
			}, {
					where: {
						id: orderId
					}
				})

			msg = '点赞成功!';
			code = 0;
		}

		ctx.status = 200;
		ctx.body = {
			code,
			msg
		}
	}
}

module.exports = HomeController;
