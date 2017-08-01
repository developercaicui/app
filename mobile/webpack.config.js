const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {

  entry: './src/main.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: './[name].js'
  },
  resolve: {
      extensions: ['.js', '.vue', '.css', '.scss'],
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: path.join(__dirname, 'node_modules'),
      loader: 'babel-loader'
    },{
      test: /\.json$/,
      exclude: path.join(__dirname, 'node_modules'),
      loader: 'json'
    },{
      test: /\.vue$/,
      loader: 'vue-loader'
    },{
      test: /\.css$/,
      loader: ['css-loader','style-loader']
    },{
      test: /\.scss$/,
      loader: 'style!css!sass!autoprefixer-loader?{ browsers: ["> 1%", "IE 7","Firefox 15"], cascade: false }',
    },{
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'url?limit=8192'
    },]
  },
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      hash: true,
      template: './index.html',
    })
  ],

};
