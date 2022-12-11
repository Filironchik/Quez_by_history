const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Cors = require('@koa/cors');
const app = new Koa();
let testing = require('./testlab-router.js');
app.use(bodyParser());
app.use(Cors());
app.use(testing.routes());
app.listen(3000);