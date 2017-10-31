import Vue from 'vue';
import Vuex from 'vuex';

import createLogger from 'vuex/dist/logger';

import note from './modules/note'; // 笔记相关

Vue.use(Vuex);

const debug = process.env.NODE_ENV.includes('dev');

export default new Vuex.Store({
  modules: {
    note,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
