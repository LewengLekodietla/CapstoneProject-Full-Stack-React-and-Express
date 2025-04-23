module.exports = {
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest", // Use babel-jest for .js and .jsx
  },
  testEnvironment: "jsdom", // Use browser-like testing environment
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Setup testing library extensions
  transformIgnorePatterns: [
    "/node_modules/(?!axios)" // Transpile axios (which is ESM)
  ],
  extensionsToTreatAsEsm: [".js"],
  moduleFileExtensions: ["js", "jsx"]
};