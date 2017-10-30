
import VueRouter from 'vue-router';

const Login = r => require.ensure([], () => r(require('srcIpad/page/Login')), 'login')
const Index = r => require.ensure([], () => r(require('../containers/Index')), 'index')

export default  new VueRouter({
  mode: 'hash',
  routes: [{
      path: '/',
      redirect: '/login'
    },{
      path: '/login', // 登陆
      component: Login
    },{
      path: '/index', // 首页
      component: Index
    }]
});
