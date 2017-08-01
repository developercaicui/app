import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import router from './router/router';

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
