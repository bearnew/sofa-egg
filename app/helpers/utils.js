// 判断是否是空对象
function isEmptyObj(obj) {
    return !obj || ((Object.prototype.toString.call(obj) === '[object Object]' && Object.keys(obj).length === 0))
}

module.exports = {
    isEmptyObj
}
