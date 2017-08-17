const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');

const compiler = webpack({
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
  },
  /* devtool: 'inline-source-map', */
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist/'], {
      root: path.resolve(__dirname, '../')
    }),
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, '../favicon.ico'),
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true
    }),
    new OpenBrowserWebpackPlugin({
	    url: 'http://127.0.0.1:1234'
    })
  ],
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: '[name].bundle.js',
    publicPath: './',
    library: 'MyLibrary',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.html$/,
      loader: 'html-loader'
    },{
      test: /\.css$/,
      loader: 'css-loader'
    }, {
      test: /\.(gif|png|jpe?g|svg)$/,
      loader: 'url-loader'
    }, {
      test: /.\jsx?/,
      loader: 'url-loader'
    }]
  }
});

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  
  // handle error
  console.log(stats.toString({
    colors: true
  }));
});

// webpack watch
compiler.watch({
  
}, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  // handle error
  console.log(stats.toString({
    colors: true
  }));
});

const server = new WebpackDevServer(compiler, {
  stats: {
    colors: true
  }
});

server.listen(1234, '127.0.0.1', () => {
  console.log('webpack dev server start!');
});
