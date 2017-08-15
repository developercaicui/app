import Vue from 'vue';
import Vuex from 'vuex';

import deviceInfo from './modules/deviceInfo'; // 设备信息

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    deviceInfo
  }
});
