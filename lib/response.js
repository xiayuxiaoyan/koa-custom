const parse = require('parseurl');
const qs = require('querystring');

module.exports = {

  set (key, val){
    this.res.setHeader(key, val)
  },
  get status() {
    return this.res.statusCode;
  },
  set status(val) {
    return this.res.statusCode = val;
  },
  get body() {
    return this._body;
  },
  set body(val) {
    this._body = val
    this.status = 200;
    if (typeof val === 'object') {
      this.set('Content-Type', 'application/json');
    }
  }
  // ...
}