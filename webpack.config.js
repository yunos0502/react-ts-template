const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const port = process.env.PORT || 3000;

module.exports = {
	name: 'React basic setting',
	mode: 'development',
	devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.jsx'],
	},

	entry: {
		app: ['./src/index'],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						[
							'@babel/preset-env',
							{
								targets: {
									browsers: ['> 1% in KR', 'not dead'],
								},
							},
						],
						'@babel/preset-react',
					],
					plugins: [
						'@babel/plugin-proposal-class-properties',
						'react-refresh/babel',
					],
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true,
						},
					},
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
					'style-loader',
				],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new RefreshWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'public/index.html',
		}),
		new MiniCssExtractPlugin({ filename: 'public/styles/style.css' }),
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.[hash].js',
	},
	devServer: {
		host: 'localhost',
		port: port,
		open: true,
		hot: true,
	},
};
