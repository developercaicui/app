
const exec = require('child_process').exec;


const colors = require('colors');
const vorpal = require('vorpal')();

const env = require('../config/dev.env');

let development = 'dev'; // 开发模式
let themeColor = '#fc3a6f'; // 主题颜色



vorpal
  .command('init', '初始化应用程序')
  .action(developmentMode);

vorpal
  .delimiter('myapp$')
  .show();

function developmentMode(args) {

  this.prompt({
    type: 'input',
    name: 'type',
    message: `
----------------------------------
    请选择开发模式（默认Dev）
       1、Build  2、Dev
----------------------------------
    `
  }, (result) =>{

    let _mode = result.type == 1 ? 'Build' : 'Dev';

    this.log(`
      Mode：${colors.cyanBG(_mode)}
    `);

    development = _mode;

    selectColor.call(this);

  });

}

function selectColor() {

  this.prompt({
    type: 'input',
    name: 'type',
    message: `
----------------------------------
    请选择主题颜色（默认粉色）
        1、绿色 2、${colors.green('粉色')}
----------------------------------
    `
  }, (result) =>{

    let _color = result.type == 1 ? '#00a185' : '#fc3a6f';

    this.log(`
      Color：${colors.cyanBG(_color)}
      \n
    `);

    themeColor = _color;

    vorpal.find('exit');

  });

}
