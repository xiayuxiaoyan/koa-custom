// 代理委托模式
// 单一原则
const delegate = require('delegates');
const statuses = require('statuses');

const proto = module.exports = {
  onerror(err){
    if(err === null){
      return;
    }
    // delegate
    this.app.emit('error', err, this);

    // ENOENT support
    if ('ENOENT' == err.code){
      err.status = 404;
    }
    // default to 500
    if ('number' != typeof err.status || !statuses[err.status]){
      err.status = 500;
    }

    const code = statuses[err.status];
    const msg = err.expose ? err.message : code;
    // this.status = err.status;
    res.end(msg);
  }
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