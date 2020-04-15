const { createServer } = require('http');

module.exports = class Appliction{
  constructor(){
    this.middleware = [];
  }
  use(fn) {
    this.middleware.push(fn)
  }
  listen(...args){
    const server = createServer((req, res) => {
      this.middleware.forEach(fn => fn(req, res))
    })
    server.listen(...args);
  }
}