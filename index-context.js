const Koa = require('./lib/application-context.js');
const open = require('open');

const app = new Koa()

app.use((ctx, next) => {
  console.log('中间价1正在执行');
  next();
})

app.use((ctx, next) => {
  console.log('中间价2正在执行');
  console.log(ctx.headers);
  console.log(ctx.query);
  ctx.set('content-type', 'text/html;charset=utf-8');
  ctx.body = '<h1>hello myKoa</h1>';

  next();
})

const port = 3333;
app.listen(port)
open(`http://localhost:${port}/`)
