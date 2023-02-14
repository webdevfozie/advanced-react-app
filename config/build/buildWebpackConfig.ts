import { Configuration } from 'webpack'
import { BuildOptions } from './types/config'
import { buildPlugins } from './buildPlugins'
import { buildResolves } from './buildResolves'
import { buildLoaders } from './buildLoaders'
import { buildDevServer } from './buildDevServer'

export function buildWebpackConfig(options: BuildOptions): Configuration {
  const { isDev, paths, mode } = options

  return {
    mode,
    entry: {
      main: paths.entry,
    },
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true,
    },
    plugins: buildPlugins(options),
    resolve: buildResolves(options),
    module: {
      rules: buildLoaders(options),
    },
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  }
}
