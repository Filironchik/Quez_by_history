const Router = require('koa-router');
const tests = require('./db/questions.js');
const AllAnswers = require('./db/answers.js');
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
	let getRequestedTest = tests.filter(function(test) {
		if (test.id == ctx.params.id) {
			return true;
		}
	});

	if (getRequestedTest.length) {
	  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		ctx.set('Access-Control-Allow-Origin', '*');
		ctx.type = 'text/json; charset=utf-8';
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

router.post('/:id', (ctx, next) => 
{
	let goodAnswers = 0;
	let rightAnswers = AllAnswers.filter(function(test) {
		if (test.id == ctx.params.id) {
			return true;
		}
	})[0].RightAnswers;

	ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	ctx.set("Access-Control-Allow-Origin", "*");
	let userAnswers = ctx.request.body;
	for(i=0;i<userAnswers.length;i++){
		if (userAnswers[i] == rightAnswers[i]) {goodAnswers++;}
	}
	ctx.response.status = 200;
	ctx.type = 'text/json; charset=utf-8';
	ctx.response.body = goodAnswers;
	next();
	}
);
module.exports = router;