module.exports = {
  parser: 'babel-eslint',
  extends: ['plugin:react/recommended', 'plugin:flowtype/recommended', 'plugin:prettier/recommended', 'airbnb', 'prettier', 'prettier/flowtype', 'prettier/react'],
  plugins: ['react', 'import', 'flowtype', 'prettier'],
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: false
    }
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
      }
    ],
    'no-console': 1,
    'no-debugger': 1,

    'react/prop-types': 0,
    'react/jsx-filename-extension': 0,
    'react/prefer-stateless-function': 0,
    'react/require-default-props': 0
  },
};
