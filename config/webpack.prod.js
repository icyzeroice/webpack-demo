const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: '[name].bundle.js',
    publicPath: './'
  },
  plugins: [
    new CleanWebpackPlugin('./dist', {
      root: path.resolve(__dirname, '../')
    })
  ]
});
