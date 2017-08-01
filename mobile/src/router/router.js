import VueRouter from 'vue-router';
import Reg from '../page/Reg';
import FindPwd from '../page/FindPwd';

export default  new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/findpwd',
      component: FindPwd
    },
    {
      path: '/reg',
      component: Reg,
    }
   ]
});
