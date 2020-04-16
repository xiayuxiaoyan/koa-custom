// 参考https://github.com/koajs/compose/blob/master/index.js
module.exports = function (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }
  return (ctx => {
    // 递归调用
    function disptch(i){
      let fn = middleware[i];
      // 最后一个middleware如果调用了promise就返回成功状态的promise
      if(!fn){
        return Promise.resolve();
      }
      return Promise.resolve(fn(ctx, disptch.bind(null, i+1)))
    }
    return disptch(0);
    // 函数最终返回一个posmise
  })
}