
// import
const http = require('http');
const path = require('path');
const webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// config
const Port = 1234;
const Hostname = '127.0.0.1'
const Config = {
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    })
  ],
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: '[name].bundle.js',
    publicPath: './',
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

let DevConfig = {
  noInfo: true,
  quiet: false,
  lazy: true,
  watchOption: {
    aggregateTimeout: 3000,
    poll: true
  },
  publicPath: '../',
  index: '../dist/index.html',
  headers: {
    'X-Custom-Headers': 'yes',
  },
  mineType: {
    'text/html': ['phtml']
  },
  stats: {
    color: true
  },
  reporter: null,
  serverSideRender: false,
}

// instantiation
let compiler = webpack(Config);
let webpackDevMiddleware = WebpackDevMiddleware(compiler, DevConfig);
let webpackHotMiddleware = WebpackHotMiddleware(compiler, {
  log: () => {},
  heartbeat: 2000
});
let server = http.createServer((req, res) => {

  res.end(__dirname);

  // express middleware hack
  // based on callback function
  webpackDevMiddleware(req, res, () => {
    webpackHotMiddleware(req, res, () => {})
  });
});

server.listen(Port, Hostname, () => {
  
  // run webpack
  compiler.run((err, stats) => {
    if(err) {
      console.error(err);
      return;
    } else {
      console.log(stats.toString({
        colors: true
      }));
    }
  });
});