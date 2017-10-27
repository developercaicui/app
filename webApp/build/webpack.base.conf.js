const path = require('path');
const config = require('../config');
const utils = require('./utils');
const projectRoot = path.resolve(__dirname, '../');

const env = require('../config/dev.env');
const filePath = require('../config/file.path');
const cssSourceMapDev = (env.WEB_SITE.includes('zbgedu') || env.WEB_SITE.includes('caicui') && config.dev.cssSourceMap);
const cssSourceMapProd = (env.NODE_ENV.includes('build') && config.build.productionSourceMap);
const useCssSourceMap = cssSourceMapDev || cssSourceMapProd;

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: env.NODE_ENV.includes('build') ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'ipad': path.resolve(__dirname, '../src/Ipad'),
      'mobile': path.resolve(__dirname, '../src/Mobile'),
      'api': path.resolve(__dirname, '../src/api'),
      'store': path.resolve(__dirname, '../src/store'),
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },{
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },{
        test: /\.json$/,
        loader: 'json'
      },{
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },{
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },{
        test: /\.css$/,
        loader: ['css-loader','style-loader']
      },{
        test: /\.scss$/,
        loader: 'style!css!sass!autoprefixer-loader',
      }

    ]
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
}
