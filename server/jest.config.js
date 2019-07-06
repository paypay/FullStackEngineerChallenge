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
    "^~/(.*)$": "<rootDir>/src/$1"
  },
  preset: "ts-jest"
};
