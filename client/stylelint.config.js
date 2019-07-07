module.exports = {
  rules: {
    "property-no-unknown": [
      true,
      {
        ignoreProperties: ["composes"]
      }
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"]
      }
    ]
  },
  extends: ["stylelint-config-standard", "stylelint-config-rational-order"],
  ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"]
};
