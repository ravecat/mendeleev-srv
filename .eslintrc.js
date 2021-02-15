module.exports = {
  root: true,
  parser: "babel-eslint",
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    mocha: true,
    node: true,
  },
  extends: [
    ".config/.eslintrc.common.js",
    "standard",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": 2,
  },
};
