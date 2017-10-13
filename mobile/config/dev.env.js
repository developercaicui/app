const merge = require('webpack-merge');
const prodEnv = require('./prod.env');
const buildType = process.argv.splice(1);

module.exports = merge(prodEnv, {
  NODE_ENV: buildType.includes('caicui') ? '"developCaicui"' : '"developZbgedu"'
});
