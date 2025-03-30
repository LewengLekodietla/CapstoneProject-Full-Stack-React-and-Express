module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    transform: {
      "^.+\\.jsx?$": "babel-jest",
    },
    transformIgnorePatterns: [
      "node_modules/(?!(axios)/)", // allow ES modules in axios
    ],
    moduleFileExtensions: ["js", "jsx"],
  };