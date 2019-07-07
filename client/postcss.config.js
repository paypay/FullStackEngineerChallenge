"use strict";
const postcssPresetEnv = require("postcss-preset-env");
const url = require("postcss-url");
const assets = require("postcss-assets");
const pxtorem = require("postcss-pxtorem");

const plugins = [
  postcssPresetEnv(),
  assets(),
  url({ url: "inline" }),
  pxtorem({
    rootValue: 14,
    unitPrecision: 3,
    selectorBlackList: [":root"]
  })
];

module.exports = {
  plugins
};
