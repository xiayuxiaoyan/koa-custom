const { createServer } = require('http');
const compose = require('./utils/koa-compose-context.js');
const context = require('./context.js')
const request = require('./request.js')
const response = require('./response.js')

module.exports = class Appliction{
  constructor(){
    this.middleware = [];
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  use(fn) {
    this.middleware.push(fn)
  }

  listen(...args){
    const server = createServer(this.callback())
    server.listen(...args);
  }

  respond(ctx){
    let body = ctx.body;
    const res = ctx.res;
    if(typeof body === 'object'){
      body = JSON.stringify(body)
    }
    res.end(body);
  }

  callback() {
    // 串联所有middleware
    const fn = compose(this.middleware);
    return (req, res) => {
      const ctx = this.createContext(req, res);
      fn(ctx).then(() => this.respond(ctx));
    }
  }

  createContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;

    return context;
  }
}