import HtmlWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function(env, argv) {

	var isDevelopment = argv.mode === 'development';

	return {
		entry: {
			app: './app.js'
		},
		output: {
			publicPath: '/',
			path: path.resolve(__dirname, isDevelopment ? 'dist_dev' : 'dist_prod'),
			filename: 'static/[contenthash].js',
			clean: true
		},
		mode: isDevelopment ? 'development' : 'production',
		devtool: 'source-map',
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use:
					{ 
						loader: "babel-loader",
						options: {
							presets: [
								["@babel/preset-env", {
										"targets": "defaults",

										// polyfills
										"useBuiltIns": "usage",
										"corejs": "3.47",
										
										// https://stackoverflow.com/questions/59111587/why-is-webpack-not-generating-chunks-from-my-dynamic-imports
										exclude: ['proposal-dynamic-import']	
									}
								]
							],
							plugins: [
							]
						}
					}
				},
				{
					test: /\.vue$/,
					loader: 'vue-loader'
				}
			],
		},
		optimization: {
			usedExports: true,
			minimize: !isDevelopment,
			splitChunks: {
				chunks: 'all'
			}
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, "app.html"),
				filename: 'app.html',
				inject: 'body',
			}),
			new VueLoaderPlugin(),
			new BundleAnalyzerPlugin({
				analyzerMode: 'server'
			})
		]
	};
};