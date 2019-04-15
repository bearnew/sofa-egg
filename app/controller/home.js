const Controller = require('egg').Controller;
const { AppID, AppSecret } = require('../constant/index');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async login() {
    const { ctx, app } = this;
    const { jsCode } = ctx.query;

    const result = await ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${AppID}&secret=${AppSecret}&js_code=${jsCode}&grant_type=authorization_code`, {
      dataType: 'json'
    });

    // const {
    //   session_key,
    //   openid
    // } = result.data;

    // console.log('ssssssssssss', session_key, openid)
    // const token = app.config.jwt.sign({ openid }, app.config.jwt.secret);
    // console.log('---------', token)

    console.log('22222', JSON.stringify(result))
    console.log('33333', JSON.stringify(ctx.app.middlewares))
  }
}



module.exports = HomeController;
