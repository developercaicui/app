
export default {

	updateMsgList(state, list) {
    state.msgList = list;
  },
  updateMsgListParams(state, params) {
    Object.assign(state.msgListP, params);
  },
  updateUserDetails(state, params) {
    Object.assign(state.userDetails, params);
  },
  updateExamDateParams(state, params) {
    Object.assign(state.examDateParams, params);
  },
  updateExamDate(state, params) {
    state.examData = params;
  },
  updateLoginLogParams(state, params) {
    Object.assign(state.LoginLogParams, params);
  },
  updateLoginLog(state, params) {
    Object.assign(state.loginLogData, params);
  },
	updateActivityList(state, params) {
		Object.assign(state.activityList, params);
	}

}
