
// common config
const path = require('path');
const webpack = require('webpack');



const commonConfig = {
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

module.exports = commonConfig;