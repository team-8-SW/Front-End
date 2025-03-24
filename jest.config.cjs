module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.js"],
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
};
