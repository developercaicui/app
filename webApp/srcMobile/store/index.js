import Vue from 'vue';
import Vuex from 'vuex';

import exam from 'srcIpad/store/modules/vuex-exam'; // 试卷

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    exam,
  }
});
