const path = require('path');

const defaultAlias = {
  'vue$': 'vue/dist/vue',
  'srcMobile': path.resolve(__dirname, `../srcMobile`),
  'srcIpad': path.resolve(__dirname, `../srcIpad`),
}

module.exports = {

  ipad: Object.assign(defaultAlias, {
  }),

  mobile: Object.assign(defaultAlias, {
    IpadApi: path.resolve(__dirname, `../srcIpad/api`),
    IpadStore: path.resolve(__dirname, `../srcIpad/store`),
    api: path.resolve(__dirname, `../srcMobile/api`),
    assets: path.resolve(__dirname, `../srcMobile/assets`),
    base: path.resolve(__dirname, `../srcMobile/base`),
    compoenets: path.resolve(__dirname, `../srcMobile/compoenets`),
    containers: path.resolve(__dirname, `../srcMobile/containers`),
    store:  path.resolve(__dirname, `../srcMobile/store`),
  }),

};
