const merge = require('webpack-merge');
const prodEnv = require('./prod.env');
const buildType = process.argv.splice(1);

const mode = buildType.toString().includes('caicui') ? '"developCaicui"' : '"developZbgedu"';


module.exports = merge(prodEnv, {
  NODE_ENV: mode
});

prodEnv.NODE_ENV = mode;



