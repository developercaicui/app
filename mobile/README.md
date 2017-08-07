

## 编译设置

```
# 安装依赖
npm install

# 启动服务
npm run dev

# 打包压缩
npm run build
```

## API接口跨域访问处理

> 原请求地址 `http://api.caicui.com/api/zbids/app/gettoken/v1.0/`

> 删除 ~~http://api.caicui.com~~ 既可访问






## 项目结构

```
.
├── build                                       // 配置文件
├── config                                      // 环境配置区分
├── dist                                        // 上线项目文件，放在服务器即可正常访问
├── static                                      // 静态文件
│     └── public.js                             // 公用调取方法
├── src                                         // 源码目录
│   ├── mock                                    // 数据交互假数据
│
│   ├── components                              // 组件
│   │   ├── Comm                                // 公共组件
│   │         └── Loading/                      // Loading动画
│   │   ├── Footer                              // 底部公共组件
│   │   └── Header                              // 头部公共组件
│ 
│   ├── page
│   │    ├── Home/                              // 入口页面
│   │    ├── Reg/                               // 注册
│   │    ├── Index/                             // 首页
│   │    ├── Login/                             // 登录页面
│   │    └── findPwd/                           // 找回密码  
│ 
│   ├── router
│   │   └── router.js                           // 路由配置
│ 
│   ├── store                                   // 后续vuex的状态管理
│
│   └── assets
│       └── style
│             ├── common.scss                   // 公共样式文件
│             └── mixin.scss                    // 样式配置文件
│
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── index.html                                  // 入口html文件
.

```
