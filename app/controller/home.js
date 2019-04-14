const Controller = require('egg').Controller;
const { AppID, AppSecret } = require('../constant/index');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async login() {
    const ctx = this.ctx;
    const { jsCode } = ctx.query;

    const result = await ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${AppID}&secret=${AppSecret}&js_code=${jsCode}&grant_type=authorization_code`, {
      dataType: 'json'
    });

    console.log('22222', JSON.stringify(result))
  }
}



module.exports = HomeController;
