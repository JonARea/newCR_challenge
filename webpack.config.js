const webpack = require('webpack')
const path = require('path')

module.exports = {
  context: __dirname,
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
        },
      },
      {
        test: /\.(css)/,
        exclude: /node_modules/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  }
}
