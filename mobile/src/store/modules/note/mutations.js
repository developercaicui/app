
export default {

  updateNoteSelectedList(state, params) {
    state.noteSelectedList =  params;
  },
	updateNoteSelectedListP(state, params) {
    Object.assign(state.noteSelectedListP, params);
	},
  updateNoteList(state, params) {
    state.noteList = params;
  },
  updateNoteListParams(state, params) {
    Object.assign(state.noteListParams, params);
  },

  updateNoteDetailsList(state, params) {
    state.noteDetailsList = params;
  },

  updateNoteDetailsParams(state, params) {
    Object.assign(state.noteDetailsParams, params);
  },

  updateNoteDetailsParams(state, params) {
    Object.assign(state.noteDetailsParams, params);
  },

  reductionNoteDetailsList(state) {
    state.noteDetailsList = [];
  },

  CHANGE_COURSE_NOTE_LIST_ALL(state, params) {
    state.courseNoteListAll = params;
  },

  CHANGE_COURSE_NOTE_LIST_ME(state, params) {
    state.courseNoteListMe = params;
  },

}
