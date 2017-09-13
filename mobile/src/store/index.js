import Vue from 'vue';
import Vuex from 'vuex';

import deviceInfo from './modules/deviceInfo'; // 设备信息
import noteList from './modules/note/list'; // 我的笔记列表

import exam from './modules/vuex-exam'; // 试卷

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    deviceInfo,
    exam,
    noteList,
  }
});
