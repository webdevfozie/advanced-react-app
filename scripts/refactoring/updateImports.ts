import { Project } from 'ts-morph'

const project = new Project({})

project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

const files = project.getSourceFiles()

function isAbsolutePath(path: string) {
  const layers = ['shared', 'entities', 'widgets', 'pages', 'features', 'app']
  return layers.some((layer) => path.startsWith(layer))
}

files.forEach((file) => {
  const importDeclarations = file.getImportDeclarations()
  importDeclarations.forEach((importDecl) => {
    const value = importDecl.getModuleSpecifierValue()

    if (isAbsolutePath(value)) {
      importDecl.setModuleSpecifier(`@/${value}`)
    }
  })
})

project.save()
