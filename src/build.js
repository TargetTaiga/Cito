const fs = require('fs');
const path = require('path');
const {makeBodyContent, fsReadPromise} = require('./utils');

class Build {
	constructor(map, config, {extension, staticPrefix = '/cito-static'}) {
		this.map = map;
		this.cwd = process.cwd();
		this.config = config;
		this.extension = extension;
		this.staticPrefix = staticPrefix
	}

	middleware() {
		return async (req, res, next) => {
			const url = req.url || '';
			if (url.startsWith(this.staticPrefix)) {
				const filePath = url.slice(this.staticPrefix.length);
				res.send(await fsReadPromise(path.join(this.config.output.path, filePath)));
			} else {
				next();
			}
		}
	}

	async get(pagePath, {rootId = 'root', data} = {}) {
		const inline = await fsReadPromise(path.resolve(this.config.output.path, this.map.get(pagePath)));
		const react = await fsReadPromise(path.resolve(this.config.output.path, 'react.js'));
		const reactDOM = await fsReadPromise(path.resolve(this.config.output.path, 'react-dom.js'));
		return makeBodyContent({
			rootId: rootId,
			global: this.config.output.library[0],
			data: data,
			inline: inline.toString(),
			vendor: path.join(
				this.staticPrefix,
				this.config
					.optimization
					.splitChunks
					.cacheGroups
					.vendor.name + '.' + this.extension),
			react: react.toString(),
			reactDOM: reactDOM.toString(),
		});
	}
}

module.exports = Build;