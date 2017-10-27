
const childprocess = require('child_process');

const colors = require('colors');
const vorpal = require('vorpal')();

const env = require('../config/dev.env');



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

      this.log(`
        DeviceType：${colors.cyanBG(_mode)}
      `);

      env.DEVICE_TYPE = _mode;

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

    ,-~~-.___.
   / |  '     \/
  (  )        0 ------> 请选择主题颜色(默认粉色)   ${colors.green('|')}  1、绿色 2、粉色 3、粉色(临时调试接口为财萃) ${colors.green('|')}
   \_/-, ,----'
      ====           //
     /  \-'~;    /~~~(O)
    /  __/~|   /       |
  =(  _____| (_________|
 /**********/**********/**********/

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

    vorpal.find('exit');


    var child = childprocess.exec(`npm run ${env.NODE_ENV}`,(err, stdout, stderr) =>{
      if(err) throw err;
    });

    child.stdout.on('data', function (data) {
    	console.log(data);
    });


  });

}
