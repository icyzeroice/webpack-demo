
const webpack = require('webpack');
const express = require('express');
const devConfig = require('./webpack.dev')
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const opn = require('opn');

let app = new express();
let compiler = webpack(devConfig);

let devMiddleware = webpackDevMiddleware(compiler, {
  
  // publicPath is required
  publicPath: devConfig.output.publicPath,
  noInfo: false,
  stats: {
    colors: true
  }
});

let hotMiddleware = webpackHotMiddleware(compiler, {
  log: console.log
});


// register components
app.use(devMiddleware);
app.use(hotMiddleware);

let server = app.listen(1234, () => {

  // open the browser
  opn('http://127.0.0.1:1234');
});

module.exports = {
  close: () => server.close(),
}
