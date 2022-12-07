const config = require("./config/main.cfg.js");
const db = require("./db/questions.js");
const Koa = require('koa');
//const koaBody = require('koa-body');

const app = new Koa();

//app.use(koaBody());

let testing = require('./testlab-router.js');
app.use(testing.routes());

app.listen(3000);