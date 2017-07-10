var webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

var APP_NAME = 'main';

module.exports = {
    entry: './assets/js/main.js',
    devtool: 'source-map',
    output: {
      path: __dirname + '/assets/dist',
      filename: APP_NAME + '.js',
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
          }
      ],

    },
    plugins: [
        extractSass
    ]
};