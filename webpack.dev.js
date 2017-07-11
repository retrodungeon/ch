var webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

var APP_NAME = 'main';

module.exports = {
    entry: './content/themes/cinemaholics/entry.js',
    devtool: 'source-map',
    output: {
      path: __dirname + '/content/themes/cinemaholics/assets/dist',
      filename: 'main.js',
    },
    module: {
      rules: [
          {
              test: /(\.jsx|\.js)$/,
              loader: 'babel-loader',
              exclude: /(node_modules)/,
              query: {
                presets: ['es2015', 'react']
              }
          }, {
              test: /\.css$/,
              use: [
                  { loader: 'style-loader'},
                  {
                      loader: 'css-loader',
                      options: {
                          modules: true
                      }
                  }
              ]
          }, {
              test: /\.scss$/,
              use: extractSass.extract({
                  use: [{
                      loader: "css-loader", options: {
                          sourceMap: true
                      }
                  }, {
                      loader: "sass-loader", options: {
                          sourceMap: true
                      }
                  }],
                  // use style-loader in development
                  fallback: "style-loader"
              })
          },
          {
              test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg|png)(\?.*$|$)/,
              use: [
                  { loader: 'ignore-loader'}
              ]
          }
      ],

    },
    plugins: [
        extractSass,
    ]
};