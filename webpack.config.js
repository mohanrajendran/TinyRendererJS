const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: 'body'
  })],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss", ".obj"]
  },
  resolveLoader: {
    alias: {
      'obj-loader': path.join(__dirname, 'loaders', 'obj-loader.js')
    }
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
      { test: /\.obj$/, loader: 'obj-loader' }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
}