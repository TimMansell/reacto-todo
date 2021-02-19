module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
    'cypress/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['jest', 'react', 'prettier', 'cypress'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
