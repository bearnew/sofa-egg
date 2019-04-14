module.exports = options => {
    const { whiteList } = options;

    if (Object.prototype.toString.call(whiteList) !== '[object Array]') {
        throw Error('----------跨域白名单必须设置为数组------------');
    }

    return async function setOrigin(ctx, next) {
        const { origin } = ctx.request.header;

        if (whiteList.includes('*') || whiteList.indexOf(origin) > -1) {
            ctx.response.set('Access-Control-Allow-Origin', origin);
        }

        await next();
    }
}