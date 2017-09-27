import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import {Spinner, DatetimePicker } from 'mint-ui';



import store from './store';
import router from './router/router';
import webApi from './api/api';
import VueTouch from 'vue-touch';


Vue.use(VueRouter);

Vue.component(Spinner.name, Spinner); // loading
Vue.component(DatetimePicker.name, DatetimePicker);//时间选择器

Vue.prototype.webApi = webApi;


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
Vue.use(VueTouch, {name: 'v-touch'})