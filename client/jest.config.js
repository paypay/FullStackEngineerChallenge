module.exports = {
  testURL: "http://localhost",
  setupFiles: ["./src/__tests__/jest.setup.ts"],
  moduleFileExtensions: ["js", "ts", "tsx"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
      diagnostics: false
    }
  },
  testMatch: ["**/__tests__/**/*test.ts?(x)"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)$":
      "<rootDir>/src/__tests__/mock/fileMock.js",
    "\\.(css)$": "<rootDir>/src/__tests__/mock/styleMock.js",
    "^~/(.*)$": "<rootDir>/src/$1"
  },
  preset: "ts-jest"
};
