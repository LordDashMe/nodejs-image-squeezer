module.exports = {
  "roots": [
    "<rootDir>/tests"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "cacheDirectory": "jest-cache/",
  "collectCoverage": true,
  "collectCoverageFrom": [
    "src/**/*.ts",
    "!src/ImageSqueezer.ts"
  ],
  "coverageDirectory": "jest-coverage"
}
