var webpack = require('webpack');
var config = require('./webpack.dev');

config.output.filename = 'main.min.js';
config.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true, sourceMap: false}));

module.exports = config;