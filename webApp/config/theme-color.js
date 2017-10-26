const fs = require('fs');
const env = require('./dev.env');
const themeColor = env.NODE_ENV.includes('developZbgedu') ? '#fc3a6f' : '#00a185';

const themeConfig = './src/assets/style/config.scss';
const outputTheme = './src/assets/style/theme.scss';

fs.readFile(themeConfig, 'utf-8', (err, data) => {

  if(err) throw err;

  data = data.replace(/\$themeColor/ig, themeColor);

  fs.writeFile(outputTheme, data, (err) => {
    if (err) throw err;
  });

});
