import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueTouch from 'vue-touch';
import { Spinner, DatetimePicker } from 'mint-ui';
import fastclick from 'fastclick';
import PicPreview from './base/PicPreview/init';

import store from './store';
import router from './router/index';
import webApi from './api/api';


import vConsole from 'vconsole';

// 开启调试模式

if(__DEV__) new vConsole();

// fastclick.attach(document.body);

Vue.use(PicPreview)
Vue.use(VueRouter);
Vue.use(VueTouch, {name: 'v-touch'});
Vue.component(Spinner.name, Spinner); // loading

Vue.prototype.webApi = webApi;

console.log(`%c\n${process.env.HELP.replace(/\/n/g,'\n\n')}`, 'color: red');

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
