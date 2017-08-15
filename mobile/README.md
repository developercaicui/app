
## 百度脑图

[访问百度脑涂][1]

## 开发人员任务安排

李鹏：用户登录，第三方，下载视频，观看视频，课程首页

张杰：注册，测试登陆界面，首页，笔记，交流，消息中心，

朱军营：我的，（在学、未激活，已过期）课程，视频缓存

赵攀科：题库，试卷，知识点，错题

## 编译设置

```
# 安装依赖
npm install

# 启动服务
npm run dev

# 打包压缩
npm run build
```

## 技术栈 vue  + vue-router + vuex + webpack + ES6/7 + axios + sass + flex


## API接口跨域访问处理

> 原请求地址 `http://api.caicui.com/api/zbids/app/gettoken/v1.0/`  , 删除 ~~http://api.caicui.com~~ 既可访问




## 项目结构

```
.
├── build                                       // 配置文件
├── config                                      // 环境配置区分
├── dist                                        // 上线项目文件，放在服务器即可正常访问
├── src                                         // 源码目录
│   ├── mock                                    // 数据交互假数据

│   ├── api                                     // 常用接口封装
│   │    ├── api                                // 常用的api方法
│   │    └── port                               // 常用的接口
│
│   ├── components                              // 组件
│   │   ├── Comm                                // 公共组件
│   │         ├── Tip/                          // 提示组件
│   │         └── Loading/                      // Loading动画
│   │   └── Header                              // 头部公共组件
│   ├── page
│   │    ├── Reg/                               // 注册
│   │    ├── Index/                             // 首页
│   │    ├── Login/                             // 登录页面
│   │    └── findPwd/                           // 找回密码  
│ 
│   ├── router
│   │   └── router.js                           // 路由配置
│ 
│   ├── store                                   // vuex状态管理
│
│   └── assets
│       └── style
│             ├── ipad                          // ipad样式
│             ├── mobile                        // 手机端样式
│             ├── common.scss                   // 公共样式文件
│             └── mixin.scss                    // 样式配置文件
│
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── index.html                                  // 入口html文件
.

```



[1]: http://naotu.baidu.com/file/839ab1af76e753dac4b42116a599bfd7?token=9439c3be6f84ac64
