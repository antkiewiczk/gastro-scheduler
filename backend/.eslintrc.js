module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'mongodb'
  ],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'class-methods-use-this': 'off',
    'react/button-has-type': 'off',
    'no-console': ["error", { allow: ["warn", "error"] }],
    'no-underscore-dangle' : 'off'
  },
};
