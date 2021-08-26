const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const port = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
	name: 'React basic setting',
	mode: isDevelopment ? 'development' : 'production',
	devtool: !isDevelopment ? 'hidden-source-map' : 'eval',
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json'],
		alias: {
			'@hooks': path.resolve(__dirname, 'hooks'),
			'@components': path.resolve(__dirname, 'components'),
			'@pages': path.resolve(__dirname, 'pages'),
			'@utils': path.resolve(__dirname, 'utils'),
		},
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
							[
								'@babel/preset-env',
								{
									targets: { browsers: ['last 2 chrome versions'] },
									debug: isDevelopment,
								},
							],
							'@babel/preset-react',
							'@babel/preset-typescript',
						],
						env: {
							development: {
								plugins: [require.resolve('react-refresh/babel')],
							},
						},
					},
				},
				exclude: path.join(__dirname, 'node_modules'),
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
		new ForkTsCheckerWebpackPlugin({
			async: false,
		}),
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
		historyApiFallback: true,
		host: 'localhost',
		port: port,
		open: true,
		hot: true,
		proxy: {
			'/api/': {
				target: 'http://localhost:3000',
				changeOrigin: true,
			},
		},
	},
};
