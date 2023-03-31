/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

import path from 'path'
import { Project } from '../build/types/config'

const project: Project = 'jest'

export default {
  globals: {
    __IS_DEV__: true,
    __API__: '',
    __PROJECT__: project,
  },
  clearMocks: true,
  testEnvironment: 'jsdom',
  collectCoverage: false,
  moduleDirectories: [
    'node_modules',
  ],
  modulePaths: [
    '<rootDir>src',
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node',
  ],
  rootDir: '../../',
  testMatch: [
    '<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)',
  ],
  setupFilesAfterEnv: ['<rootDir>config/jest/setupTests.ts'],
  moduleNameMapper: {
    '\\.svg': path.resolve(__dirname, 'jestEmptyComponent.tsx'),
    '\\.s?css$': 'identity-obj-proxy',
    '^src/(.*)$': '<rootDir>/$1',
    axios: 'axios/dist/node/axios.cjs',
  },
}
