module.exports = {
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest", // Use babel-jest for .js and .jsx
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  transformIgnorePatterns: [
    "/node_modules/(?!axios)" // Transpile axios (which is ESM)
  ],
  extensionsToTreatAsEsm: [".js"],
  moduleFileExtensions: ["js", "jsx"]
};