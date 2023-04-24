import { Configuration, DefinePlugin, RuleSetRule } from 'webpack'
import path from 'path'
import { BuildPaths, Project } from '../build/types/config'
import { buildCssLoader } from '../build/loaders/buildCssLoader'
import { buildSVGLoader } from '../build/loaders/buildSVGLoader'

const project: Project = 'storybook'

export default ({ config }: {config: Configuration}) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
    locales: '',
    buildLocales: '',
  }

  config!.resolve!.modules!.unshift(paths.src)
  config!.resolve!.extensions!.push('.ts', '.tsx')

  // eslint-disable-next-line no-param-reassign
  // @ts-ignore
  config!.module!.rules = config!.module!.rules!.map((rule: RuleSetRule) => {
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i }
    }

    return rule
  })

  config!.module!.rules!.push(buildSVGLoader())
  config!.module!.rules!.push(buildCssLoader(true))
  config!.plugins!.push(new DefinePlugin({
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify(''),
    __PROJECT__: JSON.stringify(project),
  }))

  return config
}
