const Koa = require('./lib/application-compose.js');
const open = require('open');

const app = new Koa()

app.use((req, res, next) => {
  console.log('中间价1正在执行');
  next();
})

app.use((req, res, next) => {
  console.log('中间价2正在执行');
  res.end('lalala', () => console.log('response end'))
  next();
})

const port = 3333;
app.listen(port)
open(`http://localhost:${port}/`)
