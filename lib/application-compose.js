const { createServer } = require('http');
const compose = require('./utils/koa-compose.js');

module.exports = class Appliction{
  constructor(){
    this.middleware = [];
  }
  use(fn) {
    this.middleware.push(fn)
  }
  listen(...args){
    const server = createServer(this.callback())
    server.listen(...args);
  }
  callback() {
    // 串联所有middleware
    const fn = compose(this.middleware);

    return (req, res) => {
      fn(req, res).then(() => console.log('all middleware done'))
    }
  }
}