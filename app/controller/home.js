const Controller = require('egg').Controller;
const { AppID, AppSecret } = require('../constant/index');
const { isEmptyObj } = require('../helpers/utils');

class HomeController extends Controller {
	async index() {
		const { ctx } = this;
		ctx.body = 'hi, egg';
	}

	async login() {
		const { ctx, app } = this;
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
			token
		}
	}
}

module.exports = HomeController;
