/* eslint-env node */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (...args) => {
  const config = {
    mode: "development",
    devtool: "eval-source-map",
    performance: { hints: false },
    devServer: {
      watchFiles: ["src/*.jsx", "src/*.js"],
      static: path.join(__dirname, "public"),
      host: "127.0.0.1",
      port: 7777,
      historyApiFallback: true,
      hot: true,
    },
    entry: "./src/index.jsx",
    output: {
      path: path.resolve(__dirname, "www"),
      filename: "bundle.min.js",
      clean: true,
      publicPath: "/",
    },
    plugins: [new HtmlWebpackPlugin()],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [require.resolve("style-loader"), require.resolve("css-loader")],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, "src"),
          use: [
            {
              loader: require.resolve("babel-loader"),
            },
          ],
        },
        {
          test: /\.(jpe?g|gif|png|ico|svg|wav|mp3|mp4|avi|mov|xls|xlsx)$/i,
          type: "asset",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/inline",
        },
      ],
    },
  };

  return config;
};
