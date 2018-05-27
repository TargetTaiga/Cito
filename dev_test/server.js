const ssr = require('../index');
const express = require('express');

const pages = [
	'./src/pages/page-1.js',
	'./src/pages/page-2.js',
	'./src/pages/page-3.js',
];

const app = express();

ssr.build(pages).then((builder) => {
	app.use('/static', express.static('./build/.static')); // TODO

	app.get('/1', (req, res) => {
		res.send(builder.get(pages[0]));
	});

	app.get('/2', (req, res) => {
		res.send(builder.get(pages[1]));
	});

	app.get('/3', (req, res) => {
		res.send(builder.get(pages[2]));
	});

	app.listen(4200, () => console.log('Listening!'));
});