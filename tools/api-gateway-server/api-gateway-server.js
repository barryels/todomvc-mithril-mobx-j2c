'use strict';

var port = 8401,
	express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	router = express.Router();


function allowCrossDomain(req, res, next) {
	console.log('allowCrossDomain()....................');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers: X-Requested-With');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With, Content-Type, Accept');

	next();
}


function consoleLogRequest(req, res, next) {
	console.log(req.url);
	next();
}


router.all('/ping', function (req, res) {
	var response = {};

	console.log('query: ');
	console.log(req.query);

	console.log('body: ');
	console.log(req.body);

	res.json(response);
	res.end();
});


router.get('/gateway/distro/:distroID', function (req, res) {
	var response = {
		"some": "data"
	};

	res.json(response);
	res.end();
});


app.use(allowCrossDomain);
app.use(consoleLogRequest);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(router);


app.listen(port);
