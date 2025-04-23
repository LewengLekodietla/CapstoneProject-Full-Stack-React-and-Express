module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current", // Target current Node version
        },
      },
    ],
    "@babel/preset-react", // Add support for JSX
  ],
};