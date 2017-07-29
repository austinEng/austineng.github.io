var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path')
var data = require('./src/data')
var webpack = require('webpack')

module.exports = {
  entry: {
    'init': './src/init.jsx',
    'main': './src/client.jsx',
    'resume': './src/resume.jsx'
  },
  output: {
    path: __dirname,
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            "react",
            ["es2015", {modules: false}],
          ]
        }
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: true,
                sourceMap: true,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                config: {
                },
                sourceMap: true
              }
            },
            {
              loader: "less-loader",
              options: {
                sourceMap: true
              }
            },
          ]
        }),
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.less$/, // may apply this only for some modules
      options: {
        lessLoader: {
          includePaths: [path.resolve(__dirname, "./src/style")]
        },
      }
    }),
    new StaticSiteGeneratorPlugin('init.js', data.routes, data),
    new ExtractTextPlugin('[name].css')
  ],
  devtool: 'source-map'
}
