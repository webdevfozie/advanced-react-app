export type BuildMode = 'production' | 'development'
export type Project = 'storybook' | 'frontend' | 'jest'

export interface BuildPaths {
  entry: string,
  build: string,
  html: string,
  src: string
}

export interface BuildOptions {
  mode: BuildMode,
  paths: BuildPaths,
  isDev: boolean,
  port: number,
  apiURL: string
  project: Project
}

export interface BuildEnv {
  mode: BuildMode,
  port: number,
  apiURL: string
}
