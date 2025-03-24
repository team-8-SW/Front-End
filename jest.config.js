export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.js"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
};
