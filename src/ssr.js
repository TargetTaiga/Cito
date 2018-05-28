const webpack = require('webpack');
const memory_fs = require('memory-fs');
const crypto = require('crypto');
const path = require('path');
const html = require('./html');
const {strMapToObj} = require('./utils');

const build = (pages) => new Promise((resolve, reject) => {
	const cwd = process.cwd();
	const webpack_config = require('./config');

	const pathesMap = new Map();

	pages.forEach((pagePath) => {
		const pagePathHash = crypto.createHash('sha256').update(pagePath).digest('hex');
		webpack_config.entry[pagePathHash] = pagePath;
		pathesMap.set(pagePath, pagePathHash + '.js');
	});

	const compiler = webpack(webpack_config);

	const memory_use = false;

	if (memory_use) {
		fs_instance = new memory_fs();
		compiler.outputFileSystem = fs_instance;
	} else {
		fs_instance = require('fs');
	}

	const get = (pagePath, htmlOptions) => {
		const inline = fs_instance.readFileSync(path.resolve(cwd, 'build', pathesMap.get(pagePath))).toString();

		console.log(fs_instance.readdirSync(path.resolve(cwd, 'build')));

		return html({
			inline,
			title: htmlOptions.title,
			vendor: '/static/vendor.js',
			react: fs_instance.readFileSync(path.resolve(cwd, 'build', 'react.js')).toString(),
			reactDOM: fs_instance.readFileSync(path.resolve(cwd, 'build', 'react-dom.js')).toString(),
			data: htmlOptions.data
		});
	};
	const middleware = () => null;

	const watching = compiler.run((err) => {
		console.log(`Compiled! Errors: ${err}`);

		resolve({
			get: get,
			static: middleware
		});
	});
});

function removeExtension(path) {
	return path.substring(0, path.lastIndexOf('.')) // TODO unsafe
}

module.exports = {
	build
};