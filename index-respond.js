const Koa = require('./lib/application-respond.js');
const open = require('open');

const app = new Koa()

app.use((req, res, next) => {
  console.log('中间价1正在执行');
  next();
})

app.use((req, res, next) => {
  console.log('中间价2正在执行');
  res.body = [1,2,3,4]
  next();
})

const port = 3333;
app.listen(port)
open(`http://localhost:${port}/`)
