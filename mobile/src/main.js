import Vue from 'vue';
import App from './App';
import router from './router/router';
import webApi from './api/api';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

Vue.prototype.webApi = webApi;



new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
