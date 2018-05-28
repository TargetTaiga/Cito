// const ssr = require('../index');
const Builder = require('../src/builder');
const express = require('express');

const pages = [
	'./src/pages/page-1.js',
	'./src/pages/page-2.js',
	'./src/pages/page-3.js',
];

const app = express();

new Builder().build(pages).then((build) => {
	app.use(build.middleware());

	////

	app.get('/1', async (req, res) => {
		const page = await build.get(pages[0], {title: 'Title 1', data: {value: 'azaza'}});
		res.send(`<html><body>${page}</body></html>`);
	});

	app.get('/2', (req, res) => {
		res.send(build.get(pages[1], {title: 'Title 2'}));
	});

	app.get('/3', (req, res) => {
		res.send(build.get(pages[2], {title: 'Title 3'}));
	});

	app.listen(4200, () => console.log('Listening!'));
});

// ssr.build(pages).then((builder) => {
// 	app.use('/static', express.static('./build/.static')); // TODO middleware
//
// 	////
//
// 	app.get('/1', (req, res) => {
// 		res.send(builder.get(pages[0], {title: 'Title 1', data: { value: 'azaza' }}));
// 	});
//
// 	app.get('/2', (req, res) => {
// 		res.send(builder.get(pages[1], {title: 'Title 2'}));
// 	});
//
// 	app.get('/3', (req, res) => {
// 		res.send(builder.get(pages[2], {title: 'Title 3'}));
// 	});
//
// 	app.listen(4200, () => console.log('Listening!'));
// });