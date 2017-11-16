import * as types from './mutations-types';

const mutations = {

  [types.GET_ALL_EXCHANGE_LIST](state, list) {
    state.allList = list;
  },

  [types.GET_ME_EXCHANGE_LIST](state, list) {
    state.meList = list;
  },

  updateAllListPraise(state, { index,  num }) {
  	state.allList[index].praiseCount = num;
  }

};

export default mutations;

