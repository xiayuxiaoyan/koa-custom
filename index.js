const Koa = require('./lib/application.js');
const open = require('open');

const app = new Koa()

app.use((req, res) => {
  console.log('中间价1正在执行');
})

app.use((req, res) => {
  console.log('中间价2正在执行');
  res.end('lalala', () => console.log('response end'))
})

const port = 3333;
app.listen(port)
open(`http://localhost:${port}/`)
