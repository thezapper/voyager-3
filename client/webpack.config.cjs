//var webpack = require('webpack');
//import  path from 'path';
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: APP_DIR + '/index.tsx',
  devtool: 'inline-source-map',
  mode: 'development',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  watchOptions: {
    // Necessary to get reasonable behavior from "watch" on Windows.
    aggregateTimeout: 500,
    poll: 1000,
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.js', '.js', '.ts']
  }
};