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
  respond(req, res){
    let body = res.body;
    if(typeof body === 'object'){
      body = JSON.stringify(body)
    }
    res.end(body);
  }
  callback() {
    // 串联所有middleware
    const fn = compose(this.middleware);

    return (req, res) => {
      fn(req, res).then(() => this.respond(req, res))
    }
  }
}