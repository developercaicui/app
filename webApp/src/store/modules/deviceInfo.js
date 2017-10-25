
const state = {
  deviceInfo: '',
};


const actions = {

};

const getters = {
  getDeviceInfo: state => state.deviceInfo
};

const mutations = {
	updateDeviceInfo(state, deviceInfo) {
		state.deviceInfo = deviceInfo;
	},
};


export default {
  state,
  mutations,
  actions,
  getters
}
