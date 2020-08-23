module.exports = {
  theme: {
    extend: {
      text: {
        "2lg": "1.775rem",
      },
      maxHeight: {
        64: "16rem",
        84: "18.75rem",
      },
      minHeight: {
        32: "512px",
      },
    },
  },
  variants: {},
  plugins: [],
  purge: [
    "./src/components/**/*.tsx",
    "./src/components/**/*.ts",
    "./src/pages/**/*.tsx",
    "./src/pages/**/*.ts",
    "./src/helpers/**/*.ts",
  ],
};
