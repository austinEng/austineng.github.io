
const fs = require('fs')
const path = require('path')
const marked = require('marked')
const fm = require('front-matter')
const async = require('async')
const moment = require('moment')

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
})

function generatePosts(cb) {
  var paths = [
    '/',
    '/resume',
    '/blog'
  ]

  fs.readdir(path.join(__dirname, 'src/blog/posts'), function(err, files) {
    if (err) throw err;

    var post_data = {
      posts: [],
      tagged: { }
    }

    async.each(files, function(file, callback) {
      fs.readFile(path.join(__dirname, 'src/blog/posts', file), 'utf8', function(err, data) {
        if(err) return callback(err)

        var content = fm(data)
        var tags = content.attributes.tags
        var body = content.body
        var html = marked(body)

        var match = file.match(/(\d+\-\d+\-\d+)\-([a-zA-Z\-_\d]+)\.md/)
        
        var post = {
          tags,
          body,
          html,
          slug: match[1] + '-' + match[2],
          date: moment(match[1])
        }

        // console.log(post.date.format('D MMM YYYY'))

        post_data.posts.push(post)

        for (var tag of tags) {
          if (typeof post_data.tagged[tag] === "undefined") post_data.tagged[tag] = [];
          post_data.tagged[tag].push(post)  
        }

        callback()
      })
    }, function(err) {
      if(err) throw err;
      
      paths = paths.concat(post_data.posts.map(function(post) {
        return `/blog/post/${post.slug}`
      }))

      paths = paths.concat(Object.keys(post_data.tagged).map(function(tag) {
        return `/blog/tagged/${tag}`
      }))

      cb(paths, post_data)
    })
  })
}

const webpack = require('webpack')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

generatePosts(function(paths, post_data) {

  webpack({
    entry: {
      'init': './src/init.jsx',
      'js/home': './src/js/home.jsx'
    },
    output: {
      path: path.join(__dirname, 'dist'),
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
        },
        { 
          test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$|\.bmp$|\.webm$/, 
          loader: "file-loader?name=assets/[hash].[ext]"
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
      new StaticSiteGeneratorPlugin('init', paths, post_data),
      new ExtractTextPlugin('styles.css')
    ]
  }, function(err, stats) {
    if (err) { throw new Error('webpack:build', err); }
    console.log('[webpack:build]', stats.toString({
      chunks: false,
      colors: true
    }));

    if (fs.existsSync('./dist/init.js')) {
      fs.unlink('./dist/init.js')
    }

    fs.writeFile("dist/CNAME", "austin-eng.co")
  })
})
