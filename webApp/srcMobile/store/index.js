import Vue from 'vue';
import Vuex from 'vuex';

import index from 'srcIpad/store/modules/index'; // 试卷

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    index,
  }
});
