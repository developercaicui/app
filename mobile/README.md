

## 启动

`npm run start`


## 项目结构

```
.
├── build                                       // webpack配置文件，临时配置为（webpack.config.js）
├── config                                      // 项目打包路径
├── dist                                        // 上线项目文件，放在服务器即可正常访问
├── static                                      // 静态文件
├── src                                         // 源码目录
│   ├── components                              // 组件
│   │   ├── Comm                                // 公共组件
│   │   ├── Footer
│   │   │   └── index.vue                       // 底部公共组件
│   │   └── Header
│   │       └── index.vue                       // 头部公共组件
│   ├── page
│   │    └── Home/                              // 入口页面
│   │    └── Loading/                           // 入口等待动画    
│   │    └── Reg/                               // 注册
│   │    └── findPwd/                           // 找回密码  
│   ├── router
│   │   └── router.js                           // 路由配置
│   ├── mock                                    // 数据交互假数据
│   │   ├──
│   ├── store                                   // 后续vuex的状态管理
│   │   ├──
│   └── style
│       ├── common.scss                         // 公共样式文件
│       └── mixin.scss                          // 样式配置文件
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── index.html                                  // 入口html文件
.

```
