import Vue from 'vue';
import Vuex from 'vuex';

import deviceInfo from './modules/deviceInfo'; // 设备信息
import note from './modules/note/index'; // 笔记
import index from './modules/index/index'; // 首页
import exchange from './modules/exchange/index'; // 交流

import exam from './modules/vuex-exam'; // 试卷

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    deviceInfo,
    exam,
    index,
    exchange,
    note
  }
});
