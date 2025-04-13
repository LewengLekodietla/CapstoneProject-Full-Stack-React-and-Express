module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest", // ✅ Use babel-jest for .js and .jsx
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)", // ✅ Transpile axios (which is ESM)
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleFileExtensions: ["js", "jsx"],
};