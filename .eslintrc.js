module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:i18next/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'i18next',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
    semi: ['error', 'never'],
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'i18next/no-literal-string': ['error', { markupOnly: true }],
  },
  globals: {
    __IS_DEV__: true,
  },
}
