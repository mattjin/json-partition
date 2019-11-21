module.exports = {
  "coverageDirectory": "<rootDir>/@coverage",
  "globals": {
      "ts-jest": {
          "tsConfig": "tsconfig.test.json"
      }
  },
  "moduleFileExtensions": ["js", "ts"],
  "testRegex": "/test/.+\\.(test|spec)\\.ts$",
  "transform": { "^.+\\.ts$": "ts-jest" },
  "verbose": true
};