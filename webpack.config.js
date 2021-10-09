const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CSSMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
console.log(process.env.NODE_ENV);
const isProd = !isDev;

module.exports = {
	mode: "development",
	context: path.resolve(__dirname, "src"),
	entry: { main: ["@babel/polyfill", "./index.js"] },
	output: {
		filename: "[name].[hash].js",
		path: path.resolve(__dirname, "dist"),
	},
	watch: true,
	resolve: {
		extensions: [".js"],
	},
	optimization: {
		splitChunks: {
			chunks: "all",
		},
		minimizer: [new CSSMinimizerWebpackPlugin(), new TerserWebpackPlugin()],
		minimize: !isDev,
	},
	devtool: isDev ? "source-map" : undefined,
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [MiniCSSExtractPlugin.loader, "css-loader"],
			},
		],
	},
	plugins: [
		new MiniCSSExtractPlugin({
			filename: "./css/index.css",
		}),
		new HTMLWebpackPlugin({
			template: "./index.html",
			minify: {
				collapseWhitespace: isProd,
			},
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "./img", to: "./img" },
				{ from: "./icons", to: "./icons" },
			],
		}),
	],
};
