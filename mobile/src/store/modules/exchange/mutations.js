
export default {

  updateExchangeListP(state, params) {
    Object.assign(state.exchangeListParams, params);
  },
	updateExchangeList(state, params) {
		state.exchangeList = params;
	}

}
