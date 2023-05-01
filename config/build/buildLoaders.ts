import { RuleSetRule } from 'webpack'
import { BuildOptions } from './types/config'
import { buildCssLoader } from './loaders/buildCssLoader'
import { buildSVGLoader } from './loaders/buildSVGLoader'
import { buildBabelLoader } from './loaders/buildBabelLoader'

export function buildLoaders(options: BuildOptions): RuleSetRule[] {
  const { isDev } = options

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

  const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false })
  const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true })

  return [
    svgLoader,
    fileLoader,
    codeBabelLoader,
    tsxCodeBabelLoader,
    scssLoader,
  ]
}
