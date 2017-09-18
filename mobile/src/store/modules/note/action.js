
import webApi from '../../../api/api';

import {
  getNewNoteList,
  getNoteList,
  getNoteDetailsList
} from '../../../api/port';


export default {

  // 新建笔记列表
  fetchNewNoteList({commit, state}) {

    getNewNoteList(state.noteSelectedListP)

    .then(res =>{

      webApi.closeLoadingData();

      if(!res || res.state != 'success'){
        webApi.alert('获取列表失败，请稍后再试');
        return false;
      }

      commit('updateNoteSelectedList', res.data);

    })

  },

  //笔记列表
  fetchNoteList({ commit, state }) {

    getNoteList(state.noteListParams)

    .then(res =>{

       webApi.closeLoadingData();

       if(!res || res.state != 'success'){
         webApi.alert('获取列表失败，请稍后再试');
         return false;
       }

       commit('updateNoteList', res.data);

     })

  },

  // 笔记详情列表
  fetchNoteDetailsList({ commit, state }) {

    getNoteDetailsList(state.noteDetailsParams)

    .then(res =>{

       webApi.closeLoadingData();

       if(!res || res.state != 'success'){
         webApi.alert('获取列表失败，请稍后再试');
         return false;
       }

       commit('updateNoteDetailsList', res.data);

     })

  }

}
