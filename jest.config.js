// jest.config.js
const { defaults } = require("jest-config");

module.exports = {
  // ...
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/packages/**/src/**/*"
  ],
  transform: {
    "\\.[jt]sx?$": "babel-jest"
  },
  transformIgnorePatterns: [],
  preset: 'ts-jest/presets/js-with-babel',
  globals: {
    'ts-jest': {
      babelConfig: true,
    }
  },
  "coverageThreshold": {
    "global": {
      "branches": 50,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
};
