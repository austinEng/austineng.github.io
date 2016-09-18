var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path')
var data = require('./src/data')

module.exports = {
  entry: {
    'init': './src/init.jsx',
    'client': './src/client.jsx'
  },
  output: {
    path: __dirname,
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: "babel"
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      }
    ]
  },
  lessLoader: {
    includePaths: [path.resolve(__dirname, "./src/style")]
  },
  resolve: {
    extensions: ['.jsx', '.js', '']
  },
  plugins: [
    new StaticSiteGeneratorPlugin('init.js', data.routes, data),
    new ExtractTextPlugin('styles.css')
  ]
}
