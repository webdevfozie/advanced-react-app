import { Project } from 'ts-morph'
import path from 'path'

const project = new Project({})

project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

const files = project.getSourceFiles()
const sharedUiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui')
const sharedUiDirectory = project.getDirectory(sharedUiPath)
const componentsDirectories = sharedUiDirectory?.getDirectories()

function isAbsolutePath(path: string) {
  const layers = ['shared', 'entities', 'widgets', 'pages', 'features', 'app']
  return layers.some((layer) => path.startsWith(layer))
}

componentsDirectories?.forEach((directory) => {
  const indexFilePath = `${directory.getPath()}/index.ts`
  const indexFile = directory.getSourceFile(indexFilePath)

  if (!indexFile) {
    const sourceCode = `export * from './${directory.getBaseName()}'`
    const file = directory.createSourceFile(indexFilePath, sourceCode)

    file.save()
  }
})

files.forEach((file) => {
  const importDeclarations = file.getImportDeclarations()
  importDeclarations.forEach((importDecl) => {
    const value = importDecl.getModuleSpecifierValue()
    const valueWithoutAlias = value.replace('@/', '')
    const segments = valueWithoutAlias.split(path.sep)
    const isSharedLayer = segments?.[0] === 'shared'
    const isUiSlice = segments?.[1] === 'ui'

    if (isAbsolutePath(valueWithoutAlias) && isSharedLayer && isUiSlice) {
      const result = valueWithoutAlias.split(path.sep).slice(0, 3).join(path.sep)
      importDecl.setModuleSpecifier(`@/${result}`)
    }
  })
})

project.save()
