const webpack = require('webpack');
const memory_fs = require('memory-fs');
const path = require('path');
const html = require('./html');

const build = (pages) => new Promise((resolve, reject) => {
	const cwd = process.cwd();
	const webpack_config = require('./config');
	let fs_instance;

	pages.forEach((pagePath) => webpack_config.entry[removeExtension(pagePath)] = pagePath);

	const compiler = webpack(webpack_config);

	const memory_use = false;

	if (memory_use) {
		fs_instance = new memory_fs();
		compiler.outputFileSystem = fs_instance;
	} else {
		fs_instance = require('fs');
	}

	const get = (pagePath) => {
		const inline = fs_instance.readFileSync(path.resolve(cwd, 'build', pagePath)).toString();

		return html({
			inline,
			vendor: '/static/vendor.js',
			react: fs_instance.readFileSync(path.resolve(cwd, 'build', 'react.js')).toString(),
			reactDOM: fs_instance.readFileSync(path.resolve(cwd, 'build', 'react-dom.js')).toString()
		});
	};
	const middleware = () => null;

	const watching = compiler.watch({
		aggregateTimeout: 1000,
		poll: 1000
	}, (err) => {
		console.log(`Compiled! Errors: ${err}`);

		resolve({
			get: get,
			static: middleware
		})
	});
});

function removeExtension(path) {
	return path.substring(0, path.lastIndexOf('.')) // TODO unsafe
}

module.exports = {
	build
};