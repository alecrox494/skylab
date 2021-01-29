const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3002,
    contentBase: [
      path.resolve(__dirname, '../src/frontend/js'),
      path.resolve(__dirname, '../src/frontend/scss'),
      path.resolve(__dirname, '../src/frontend')
    ],
    publicPath: "/",
    watchContentBase: true
  }
});