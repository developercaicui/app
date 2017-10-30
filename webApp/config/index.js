const path = require('path');
const env = require('./dev.env');
const theme = require('./theme.color');

module.exports = {
  build: {
    env: env,
    index: path.resolve(__dirname, `../dist/index.html`),
    assetsRoot: path.resolve(__dirname, `../dist`),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'csws']
  },
  dev: {
    env: env,
    port: 3000,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/api': env.WEB_SITE.includes('zbgedu') ? 'http://api.zbgedu.com' : 'http://api.caicui.com/',
    },
    cssSourceMap: false
  }
};
