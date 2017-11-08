import * as types from './mutations-types';

const mutations = {

  [types.GET_ALL_EXCHANGE_LIST](state, list) {
    state.allList = list;
  },

  [types.GET_ME_EXCHANGE_LIST](state, list) {
    state.meList = list;
  },

};

export default mutations;

