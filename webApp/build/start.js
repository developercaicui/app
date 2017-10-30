
const fs = require('fs');
const childprocess = require('child_process');

const colors = require('colors');
const vorpal = require('vorpal')();

const env = {
  DEVICE_TYPE: 'mobile',
  NODE_ENV: 'dev',
  THEME_COLOR: '#fc3a6f',
  WEB_SITE: 'caicui',
  PAGE_SRC: 'srcMobile',
  HELP: `
       "process.env.DEVICE_TYPE -> 设备类型,分别是手机(mobile)和平板设备(ipad)\/n" +
       "process.env.NODE_ENV -> 开发模式,分别为开发(dev)和打包(build)\/n" +
       "process.env.THEME_COLOR -> 主题颜色,分别为粉色(#fc3a6f)和绿色(#00a185)\/n" +
       "process.env.WEB_SITE -> 网站主域,分别为财萃(caicui)和中博(zbgedu)\/n"
  `
};



vorpal
  .command('init', '初始化应用程序')
  .action(selectDevice);

vorpal
  .delimiter('myapp$')
  .show();

  function selectDevice(args) {

    this.prompt({
      type: 'input',
      name: 'type',
      message: `
                              |-------------------------------|
                              |                               |
                                   请选择设备类型(默认Mobile)
                |-----------> |                               |
                |             |       1.Ipad  2.Mobile        |
                |             |                               |
            ,%%%%%%%%,        |-------------------------------|
          ,%%/\%%%%/\%%
         ,%%%\c "" J/%%%
%.       %%%%/ o  o \%%%
%%.      %%%%    _  |%%%
%%       %%%%(__Y__)%%'
//       ;%%%%%\-/%%%'
((       /  %%%%%%%'
\/\    .'       |
\/\  /      \  | |
\/\/        ) | |
\         /_ | |__
(___________)))))))


      `
    }, (result) =>{

      let _mode = result.type == 1 ? '"ipad"' : '"mobile"' ;
      let _src = Array.from(_mode.replace(/"/g,''));

      this.log(`
        DeviceType：${colors.cyanBG(_mode)}
      `);

      env.DEVICE_TYPE = _mode;
      env.PAGE_SRC = `src${_src[0].toUpperCase()}${_src.toString().replace(/,/g,'').substr(1)}`;

      selectMode.call(this);

    });

  }


function selectMode(args) {

  this.prompt({
    type: 'input',
    name: 'type',
    message: `

    ,___,       |       请选择开发模式(默认Dev)
    (${colors.red('9')}v${colors.red('9')})       |
    (_^((\       |         1.Build   2.Dev

 ^^^"^" \\^^^^
  ^^^^^^^^^^^^^

    `
  }, (result) =>{

    let _mode = result.type == 1 ? '"build"' : '"dev"' ;

    this.log(`
      Mode：${colors.cyanBG(_mode)}
    `);

    env.NODE_ENV = _mode;

    selectColor.call(this);

  });

}

function selectColor() {

  this.prompt({
    type: 'input',
    name: 'type',
    message: `

----------------------------------------
      请选择主题颜色(默认粉色)

1、绿色 2、粉色 3、粉色(临时调试接口为财萃)


    `
  }, (result) =>{

    let _color = result.type == 1 ? '"#00a185"' : '"#fc3a6f"' ;

    this.log(`
      Color：${colors.cyanBG(_color)}
      \n
    `);

    env.THEME_COLOR = _color;
    env.WEB_SITE = _color.includes('#00a185') ? '"caicui"' : '"zbgedu"' ;

    env.WEB_SITE = result.type == 3 ? '"caicui"' : env.WEB_SITE ;

    fs.writeFile('./config/dev.env.js', `module.exports = ${ JSON.stringify(env) }`, (err) => {
      if (err) throw err;
    });

    vorpal.find('exit');

    var child = childprocess.exec(`npm run ${env.NODE_ENV.replace(/"/g, '')}`,(err, stdout, stderr) =>{
      if(err) throw err;
    });

    child.stdout.on('data', function (data) {
      console.log(data);
    });


  });

}
