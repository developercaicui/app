
import VueRouter from 'vue-router';

const Index = r => require.ensure([], () => r(require('../page/Index')), 'index')
const Reg = r => require.ensure([], () => r(require('../page/Reg')), 'reg')
const FindPwd = r => require.ensure([], () => r(require('../page/FindPwd')), 'fidPwd')
const Login = r => require.ensure([], () => r(require('../page/Login')), 'login')
const Loading = r => require.ensure([], () => r(require('../components/Comm/Loading')), 'loading')
const Course = r => require.ensure([], () => r(require('../page/Course')), 'course')



export default  new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Loading
    },{
      path: '/index',
      component: Index
    },{
      path: '/findpwd',
      component: FindPwd
    },{
      path: '/reg',
      component: Reg,
    },{
      path: '/login',
      component: Login,
    },{
      path: '/course',
      component: Course,
    }
   ]
});
