module.exports = {
  ignorePatterns: 'build',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'standard',
    'react-app',
    'react-app/jest',
    'plugin:cypress/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-force': 'warn',
    'cypress/no-async-tests': 'error',
    'cypress/no-pause': 'error'
  },
  plugins: [
    'cypress'
  ]
}
