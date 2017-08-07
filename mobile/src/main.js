import Vue from 'vue';
import App from './App';
import router from './router/router';
import nativeApi from '../static/public';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';



Vue.use(VueRouter);
Vue.use(VueResource);

Vue.prototype.nativeApi = nativeApi;



new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
