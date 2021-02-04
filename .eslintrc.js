module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': 'off',
    "no-mixed-spaces-and-tabs": 0,
  },
  parserOptions: {
    parser: "babel-eslint",
    sourceType: 'module',
    allowImportExportEverywhere: true
  }
};
