
import { getNoteList } from '../../../api/port';
import webApi from '../../../api/api';

const state = {
  list: [],
  params: {
    token: '', // key只
    self: 1, // 1代表自己 0代表全部
  }
}

const getters = {
  getList: state => state.list,
  getParams: state => state.params,
}


const actions = {

   fetchList({ commit, state }) {

     getNoteList(state.params)

     .then(res =>{

   			webApi.closeLoadingData();

   			if(!res || res.state != 'success'){
   				webApi.alert('获取列表失败，请稍后再试');
   				return false;
   			}

        commit('updateList', res.data);

 		  })

   }

}

const mutations = {

   updateList(state, payload) {
     state.list = payload;
   },

   updateParams(state, {token: token, self: self}) {
     state.params.token = token;
     state.params.self = self;
   },


}


export default {
  state,
  mutations,
  actions,
  getters
}
