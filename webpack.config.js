const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: 'body'
  })],
  resolve: {
    extensions: [".tsx", ".js", ".scss"]
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'}
    ]
  }
}