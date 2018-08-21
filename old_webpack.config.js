const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname + '/client',
  entry: './index.js',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env']
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules,localIdentName="[name]-[local]-[hash:base64:6]"',
        }),
      },
    ],
  },
  output: {
    path: __dirname + '/public',
    filename: 'app.js',
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
    }),
  ],
};
