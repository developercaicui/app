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
    assets: path.resolve(__dirname, `../assets`),
    base: path.resolve(__dirname, `../base`),
    compoenets: path.resolve(__dirname, `../compoenets`),
    containers: path.resolve(__dirname, `../containers`),
  }),

};
