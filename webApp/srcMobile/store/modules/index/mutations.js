import * as types from './mutations-types';

const mutations = {

  [types.GET_ACTIVITY_LIST](state, list) {
    state.activityList = list;
  },

  [types.SET_IS_FIRST_GET_ACTIVITY](state, flag) {
    state.isRequestActivity = flag;
  },

  [types.SET_COURSE_LIST](state, list) {
    state.courseList = list;
  },

};

export default mutations;
