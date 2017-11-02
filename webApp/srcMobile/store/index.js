import Vue from 'vue';
import Vuex from 'vuex';

import createLogger from 'vuex/dist/logger';

import index from './modules/index'; // 首页相关
import note from './modules/note'; // 笔记相关

Vue.use(Vuex);

const debug = process.env.NODE_ENV.includes('dev');

export default new Vuex.Store({
  modules: {
    index,
    note,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
