const path = require('path');
const env = require('./dev.env');
const theme = require('./theme-color');
const outerFile = env.NODE_ENV.includes('developZbgedu') ? 'distZbgedu' : 'distCaicui';

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, `../${outerFile}/index.html`),
    assetsRoot: path.resolve(__dirname, `../${outerFile}`),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: env,
    port: 3000,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/api': env.NODE_ENV.includes('developZbgedu') ? 'http://api.zbgedu.com' : 'http://api.caicui.com/',
    },
    cssSourceMap: false
  }
};
