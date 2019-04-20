'use strict';

const Service = require('egg').Service;

class ActionTokenService extends Service {
    async apply(info) {
        const { ctx } = this;
        return ctx.app.jwt.sign(
            {
                data: {
                    openid: info.openid,
                    session_key: info.session_key
                },
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
            },
            ctx.app.config.jwt.secret
        );
    }
}

module.exports = ActionTokenService;