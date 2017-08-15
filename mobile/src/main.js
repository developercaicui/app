import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';

import store from './store'
import router from './router/router';
import webApi from './api/api';


Vue.use(VueRouter);

Vue.prototype.webApi = webApi;



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
