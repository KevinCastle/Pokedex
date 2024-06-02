/* eslint-env node */

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/airbnb',
    '@vue/eslint-config-prettier',
    'plugin:import/typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'import/extensions': 0
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
}
