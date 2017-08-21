
const webpack = require('webpack');
const express = require('express');
const devConfig = require('./webpack.dev')
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
  opn('http://127.0.0.1:1234');
});
