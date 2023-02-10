import HtmlWebpackPlugin from 'html-webpack-plugin'
import { ProgressPlugin, WebpackPluginInstance, DefinePlugin, HotModuleReplacementPlugin } from 'webpack'
import { BuildOptions } from './types/config'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function buildPlugins(options: BuildOptions): WebpackPluginInstance[] {
	const {paths, isDev} = options
	return [
		new HtmlWebpackPlugin({
			template: paths.html
		}),
		new ProgressPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css'
		}),
		new DefinePlugin({
			__IS_DEV__: JSON.stringify(isDev)
		}),
		new HotModuleReplacementPlugin()
	]
}