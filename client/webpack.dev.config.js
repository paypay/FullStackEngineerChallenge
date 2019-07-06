"use strict";

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HappyPack = require("happypack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const InlineManifestWebpackPlugin = require("inline-manifest-webpack-plugin");
const path = require("path");

module.exports = {
  context: __dirname,
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  entry: {
    main: __dirname + "/src/index.tsx"
  },
  output: {
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "happypack/loader?id=ts"
      },
      {
        include: /.*blueprint(-icons)?\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.css$/,
        exclude: /.*blueprint(-icons)?\.css$/,
        loaders: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]__[hash:base64:5]"
              }
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "fonts/[hash].[ext]",
            limit: 5000,
            mimetype: "application/font-woff"
          }
        }
      },
      {
        test: /\.(ttf|eot|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[hash].[ext]"
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "~": path.resolve(__dirname, "src/client")
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    },
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: "body",
      template: __dirname + "/public/index.ejs"
    }),
    new InlineManifestWebpackPlugin("manifest"),
    new HappyPack({
      id: "ts",
      threads: 2,
      loaders: [
        {
          path: "ts-loader",
          query: {
            happyPackMode: true
          }
        }
      ]
    }),
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true })
  ]
};
