const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// absolute address
const publicPath = 'http://127.0.0.1:1234';
// refer to webpack-hot-middle script address

const devConfig = {
  entry: {
    app: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, '../src/index.js')
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin ({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true
    })
  ],
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: '[name].bundle.js',
    publicPath: publicPath
  },
  module: {
    rules: [{
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.css$/,
      loader: 'css-loader'
    }, {
      test: /\.(gif|png|jpe?g|svg)$/,
      loader: 'url-loader'
    }, {
      test: /\.jsx?$/,
      loader: 'url-loader'
    }]
  }
}

// ------------------- ESPRESS -----------------------

const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const opn = require('opn');

let compiler = webpack(devConfig);
let app = new express();

app.use(webpackDevMiddleware(compiler, {

  // publicPath is required
  publicPath: devConfig.output.publicPath,
  noInfo: false,
  stats: {
    colors: true
  },
  headers: {
    'X-Custom-Header': 'yes'
  }
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));

app.listen(1234, () => {

  // open the browser
  opn(publicPath);
});
