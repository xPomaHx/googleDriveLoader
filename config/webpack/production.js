const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './../../index.js'),
  output: {
    path: path.resolve(__dirname, './../../dist'),
    filename: 'index.js'
  },
  target: 'node',
  resolve: {
    alias: {
      '@root': path.resolve(__dirname, './../../')
    }
  },
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
