const webpack = require('webpack');
const crypto = require('crypto');
const Build = require('./build');
const webpack_config = require('./config');

class Builder {
	constructor() {
		this.cwd = process.cwd();
		this.map = new Map();
		this.config = webpack_config();
		this.extension = 'js';
	}

	build(pagesPaths) {
		this.mapPaths(pagesPaths);

		const compiler = webpack(this.config);

		return new Promise(((resolve, reject) => {
			compiler.run((err) => {
				console.log(`Build ready. Errors: ${err}`);
				resolve(new Build(this.map, this.config, {
					extension: this.extension
				}));
			});
		}));
	}

	mapPaths(pagesPaths) {
		pagesPaths.forEach((pagePaths) => {
			const pagePathHash = crypto.createHash('sha256').update(pagePaths).digest('hex');
			this.config.entry[pagePathHash] = pagePaths;
			this.map.set(pagePaths, pagePathHash + '.js');
		});
	}
}

module.exports = Builder;