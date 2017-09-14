
import webApi from '../../../api/api';
import {
  getNoteList,
  getNoteDetailsList
} from '../../../api/port';

const state = {

  list: [],
  params: {
    token: '', // key只
    self: 1, // 1代表自己 0代表全部
  },

  detailsList: [],
  detailsParams: {
    pageNo: 1,
    pageSize: 20,
    charpterid: '',
    ordertype: '',
    self:'',
    token: ''
  },

}

const getters = {
  getList: state => state.list,
  getParams: state => state.params,
  getDetailsList: state => state.detailsList,
  getDetailsParams: state => state.detailsParams,
}


const actions = {

   //笔记列表
   fetchNoteList({ commit, state }) {

     getNoteList(state.params)

     .then(res =>{

   			webApi.closeLoadingData();

   			if(!res || res.state != 'success'){
   				webApi.alert('获取列表失败，请稍后再试');
   				return false;
   			}

        commit('updateList', res.data);

 		  })

   },

   // 笔记详情列表
   fetchNoteDetailsList({ commit, state }) {

     getNoteDetailsList(state.detailsParams)

     .then(res =>{

   			webApi.closeLoadingData();

   			if(!res || res.state != 'success'){
   				webApi.alert('获取列表失败，请稍后再试');
   				return false;
   			}

        commit('updateDetailsList', res.data);

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

   updateDetailsList(state, payload) {
     state.detailsList = payload;
   },

   updateDetailsParams(state, data) {
     state.detailsParams.pageNo = data.pageNo;
     state.detailsParams.pageSize = data.pageSize;
     state.detailsParams.charpterid = data.charpterid;
     state.detailsParams.ordertype = data.ordertype;
     state.detailsParams.self = data.self;
     state.detailsParams.token = data.token;
   },


}


export default {
  state,
  mutations,
  actions,
  getters
}
