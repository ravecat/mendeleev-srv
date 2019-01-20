module.exports = {
  collectCoverageFrom: ["src/**/*.js"],
  testEnvironment: "node",
  testURL: "http://localhost",
  moduleDirectories: ["node_modules"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.js$"],
  modulePaths: ["<rootDir>/src"]
};
