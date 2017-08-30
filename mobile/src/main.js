import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import { Loadmore, Spinner, DatetimePicker } from 'mint-ui';



import store from './store'
import router from './router/router';
import webApi from './api/api';


Vue.use(VueRouter);

Vue.component(Loadmore.name, Loadmore); // 下拉上拉加载
Vue.component(Spinner.name, Spinner); // loading
Vue.component(DatetimePicker.name, DatetimePicker);//时间选择器

Vue.prototype.webApi = webApi;



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
