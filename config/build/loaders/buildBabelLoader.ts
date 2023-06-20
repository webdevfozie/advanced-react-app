import { BuildOptions } from '../types/config'
import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin'

interface BuildBabelLoaderOptions extends BuildOptions {
  isTsx?: boolean;
}

export const buildBabelLoader = (options: BuildBabelLoaderOptions) => {
  const { isDev, isTsx } = options
  const isProd = !isDev

  return {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        cacheDirectory: true,
        plugins: [
          isDev && require.resolve('react-refresh/babel'),
          [
            '@babel/plugin-transform-typescript',
            {
              isTsx,
            },
          ],
          '@babel/plugin-transform-runtime',
          (isTsx && isProd) && [
            babelRemovePropsPlugin,
            {
              props: ['data-testid'],
            },
          ],
        ].filter(Boolean),
      },
    },
  }
}
