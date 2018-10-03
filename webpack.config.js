const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	entry: [
		path.join(__dirname, 'app', 'js', 'app.js'),
		path.join(__dirname, 'app', 'scss', 'app.scss'),
	],

	mode: isProd ? 'production' : 'development',
	target: 'node',

	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
		},
		extensions: ['.js', '.vue'],
	},

	module: {
		rules: [{
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				optimizeSSR: false
			},
		},
		{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader'
			},
		},
		{
			test: /\.css$/,
			loaders: ['vue-style-loader', MiniCssExtractPlugin.loader, 'css-loader']
		},
		{
			test: /\.scss$/,
			include: [/node_modules/, path.join(__dirname, 'app', 'scss')],
			use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
		},
		{
			test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
			use: [
				'file-loader?name=fonts/[name].[ext]'
			]
		}],
	},

	output: {
		filename: 'js/app.js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
	},

	plugins: [
		new VueLoaderPlugin(),

		new MiniCssExtractPlugin({
			filename: 'css/app.css'
		}),

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: `'${process.env.NODE_ENV}'`,
			}
		}),
	],

	...isProd ? {
		optimization: {
			minimizer: [
				new TerserWebpackPlugin({
					cache: true,
					parallel: true,
					sourceMap: false,
				}),
				new OptimizeCssAssetsPlugin(),
			]
		}
	} : {},
};