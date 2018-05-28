const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const cwd = process.cwd();

const buildFolder = path.resolve(cwd, 'build');

module.exports = {
	mode: "development",
	entry: {
		'react': require.resolve('react', {paths: [cwd]}),
		'react-dom': require.resolve('react-dom', {paths: [cwd]})
	},
	output: {
		path: buildFolder,
		filename: "[name].js",
		library: ["__PAGE_CONTENT__"],
		libraryExport: "default"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['react', 'es2015'],
						plugins: ['transform-class-properties']
					}
				}
			},
			{
				test: require.resolve('react-dom', {paths: [cwd]}),
				use: [{
					loader: 'expose-loader',
					options: 'ReactDOM'
				}]
			},
			{
				test: require.resolve('react', {paths: [cwd]}),
				use: [{
					loader: 'expose-loader',
					options: 'React'
				}]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin([buildFolder], {root: cwd})
	],
	optimization: {
		splitChunks: {
			chunks: 'initial',
			minChunks: 1,
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: 'all',
					name: '/.static/vendor',
					priority: 10,
					enforce: true
				}
			}
		},
	}
};