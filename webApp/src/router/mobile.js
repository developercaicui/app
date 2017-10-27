
import VueRouter from 'vue-router';

const Login = r => require.ensure([], () => r(require('../Ipad/Login')), 'login')
const Reg = r => require.ensure([], () => r(require('../Ipad/Reg')), 'reg')
const FindPwd = r => require.ensure([], () => r(require('../Ipad/FindPwd')), 'fidPwd')
const Index = r => require.ensure([], () => r(require('../Mobile/Index')), 'index')

export default  new VueRouter({
  mode: 'hash',
  routes: [{
      path: '/',
      redirect: '/login'
    },{
      path: '/findpwd', // 找回密码
      component: FindPwd
    },{
      path: '/reg', // 注册
      component: Reg,
    },{
      path: '/login', //登录
      component: Login,
    },{
      path: '/index', // 首页
      component: Index,
    }

  ]
});
