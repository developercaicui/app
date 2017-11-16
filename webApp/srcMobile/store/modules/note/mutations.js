import * as types from './mutations-types';

const mutations = {

  [types.SET_ME_NOTE_LIST](state, list) {
    state.meNoteList = list;
  },

  [types.SET_ALL_NOTE_LIST](state, list) {
    state.allNoteList = list;
  },

  [types.SET_NOTE_DETAILS_LIST](state, list) {
    state.noteDetailsList = list;
  },

  [types.SET_SELECT_COURSE_LIST](state, list) {
    state.selectCourseList = list;

  },



};

// params flag

export default mutations;
