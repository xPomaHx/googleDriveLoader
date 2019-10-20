const path = require('path');

const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  devtool: 'eval',
  watch: true,
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'index.js'
  },
  target: 'node',
  resolve: {
    alias: {
      '@root': path.resolve(__dirname, './')
    }
  },
  plugins: [
    new NodemonPlugin() // Dong
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
};
