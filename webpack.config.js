const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {
	name: 'React basic setting',
	mode: 'development',
	devtool: 'source-map',
	resolve: {
		modules: [path.join(__dirname, 'src'), 'node_modules'],
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json'],
	},

	entry: {
		app: ['./src/index'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							'@babel/preset-typescript',
						],
					},
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
		new CleanWebpackPlugin({
			cleanAfterEveryBuildPatterns: ['public/build'],
		}),
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
