import { RuleSetRule } from 'webpack'
import { BuildOptions } from './types/config'
import { buildCssLoader } from './loaders/buildCssLoader'
import { buildSVGLoader } from './loaders/buildSVGLoader'
import { buildBabelLoader } from './loaders/buildBabelLoader'

export function buildLoaders(options: BuildOptions): RuleSetRule[] {
  const { isDev } = options

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }

  const scssLoader = buildCssLoader(isDev)
  const svgLoader = buildSVGLoader()

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  }

  const babelLoader = buildBabelLoader(options)

  return [
    svgLoader,
    fileLoader,
    babelLoader,
    typescriptLoader,
    scssLoader,
  ]
}
