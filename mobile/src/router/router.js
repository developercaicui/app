import VueRouter from 'vue-router';
import Reg from '../page/Reg';
import FindPwd from '../page/FindPwd';
import Index from '../page/Index/';
import Login from '../page/Login';
import Course from '../page/Course';

export default  new VueRouter({
  mode: 'hash',
  routes: [
    {
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
