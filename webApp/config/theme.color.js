const fs = require('fs');
const env = require('./dev.env');

const themeConfig = './src/assets/style/config.scss';
const outputTheme = './src/assets/style/theme.scss';

fs.readFile(themeConfig, 'utf-8', (err, data) => {

  if(err) throw err;

  data = data.replace(/\$themeColor/ig, env.THEME_COLOR.replace(/"/g, ''));

  fs.writeFile(outputTheme, data, (err) => {
    if (err) throw err;
  });

});
