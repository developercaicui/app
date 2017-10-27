const fs = require('fs');
const env = require('./dev.env');

const routerfile = './src/router/index.js';

fs.readFile(routerfile, 'utf-8', (err, data) => {

  if(err) throw err;

  ['ipad', 'mobile'].map((item) =>{
    data = data.replace(`./${item}`, `./${env.DEVICE_TYPE.replace(/"/g, '')}`);
  });

  fs.writeFile(routerfile, data, (err) => {
    if (err) throw err;
  });

});
