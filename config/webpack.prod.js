
// NEXT: Uglify

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const commonConfig = require('./webpack.common');

let prodConfig = merge(commonConfig, {
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: '[name].bundle.js',
    publicPath: './'
  },
  plugins: [
    new CleanWebpackPlugin('./dist', {
      root: path.resolve(__dirname, '../')
    }),

    // output uglified source
    new UglifyjsWebpackPlugin({
      test: /\.jsx?/i,
      parallel: true,
      uglifyOptions: {
        ecma: 5,
        output: {
          comments: false,
          beautiful: false
        }
      }
    })
  ]
});

module.exports = prodConfig;