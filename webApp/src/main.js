import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import {Spinner, DatetimePicker } from 'mint-ui';
import VueTouch from 'vue-touch';

import store from './store';
import router from './router/index';
import webApi from './api/api';


Vue.use(VueRouter);
Vue.use(VueTouch, {name: 'v-touch'});
Vue.component(Spinner.name, Spinner); // loading
Vue.component(DatetimePicker.name, DatetimePicker); //时间选择器

Vue.prototype.webApi = webApi;


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
