const path = require("path");

module.exports = {
  env: {
    node: true,
    browser: true,
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      legacyDecorators: true,
    },
    babelOptions: {
      configFile: path.join(__dirname, ".babelrc"),
    },
  },

  extends: [
    "plugin:bedrock/recommended",
    "plugin:bedrock/jest",
    "plugin:react/recommended",
  ],

  reportUnusedDisableDirectives: true,
  globals: {
    __ENV__: "readonly",
  },
};
