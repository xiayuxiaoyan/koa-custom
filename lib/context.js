// 代理委托模式
// 单一原则
const delegate = require('delegates');

const proto = module.exports = {

};

delegate(proto, 'response')
  .method('set')
  .access('status')
  .access('body')

delegate(proto, 'request')
  .access('query')
  .getter('headers')

/**
 * method: 克隆普通方法
 * access：克隆带有get set描述符的方法
 * getter：克隆带有get描述符的方法
 * setter：克隆带有描述符的方法
 */