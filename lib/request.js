const parse = require('parseurl');
const qs = require('querystring');

module.exports = {
  get headers(){
    return this.req.headers;
  },
  set headers(val){
    this.req.headers = val
  },
  get query(){
    const querystring = parse(this.req).query;
    return qs.parse(querystring);
  }
}