const Router = require('koa-router');
const db = require('./db/questions.js');
const tests = db;

const router = new Router({
	prefix: '/test'
});

router.get('/', (ctx, next) => {
	ctx.response.status = 400;
	ctx.body = {
		status: 'Error!',
		message: "id of test is required!"
	};
	next();
});

router.get('/:id', (ctx, next) => {
	let getRequestedTest = tests.filter(function (test) {
		if (test.id == ctx.params.id) {
			return true;
		}
	});

	if (getRequestedTest.length) {
		ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		ctx.set('Access-Control-Allow-Origin', '*');
		ctx.set('Access-Control-Allow-Methods', 'POST, GET');
		ctx.response.status = 200;
		ctx.body = getRequestedTest[0];
	} else {
		ctx.response.status = 404;
		ctx.body = {
			status: 'Error!',
			message: 'test Not Found with that id!'
		};
	}
	next();
});

module.exports = router;