import { PluginItem } from '@babel/core'

export default function (): PluginItem {
  return {
    visitor: {
      Program(path, state) {
        const forbidden = state.opts.props || []

        path.traverse({
          JSXIdentifier(current) {
            const { name } = current.node

            if (forbidden.includes(name)) {
              current.parentPath.remove()
            }
          },
        })
      },
    },
  }
}
