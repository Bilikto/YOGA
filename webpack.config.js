const path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/mainScript.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  watch: true,
  devtool: 'source-map',

  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              debug: true,
              corejs: '3.10.1',
              useBuiltIns: "usage"
            }]
          ]
        }
      }
    }]
  }
};