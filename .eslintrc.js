module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    "@typescript-eslint/no-unused-vars": 0
  }
}
