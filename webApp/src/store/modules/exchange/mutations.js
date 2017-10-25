
export default {

  updateExchangeListP(state, params) {
    Object.assign(state.exchangeListParams, params);
  },
	updateExchangeList(state, params) {
		state.exchangeList = params;
	},
  updateExchangeList(state, params) {
		state.exchangeList = params;
	},
  reductionExchangeList(state) {
    state.exchangeList = [];
  },

  CHANGE_Course_Exchange_List(state, params) {
    state.courseexchangeList = params;
  },

  CHANGE_Course_Exchange_List_Me(state, params) {
    state.courseeExchangeListMe = params;
  },


}
