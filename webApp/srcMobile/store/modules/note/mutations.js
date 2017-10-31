import * as types from './mutations-types';

const mutations = {

  [types.SET_ME_LIST](state, list) {
    state.meList = list;
  }

};

// params flag

export default mutations;
