module.exports = {
    "roots": [
        "<rootDir>/tests"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "cacheDirectory": "jest-cache/",
    "collectCoverage": true,
    "coverageDirectory": "jest-coverage"
}
