const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  entry: {
    app: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?reload=true',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: '[name].bundle.js',

    // public path defined by processEnviroment
    publicPath: 'http://127.0.0.1:1234',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
});