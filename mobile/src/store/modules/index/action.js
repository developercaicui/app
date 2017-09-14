
import webApi from '../../../api/api';

import {
  getMsgList,
  getUserInfo,
  getExamDate,
  getLoginLog
} from '../../../api/port';


export default {

  // 获取最近登录时间
  fetchLoginLog({commit, state}) {

    getLoginLog(state.LoginLogParams)

    .then(res =>{

      let data = {
          time: !res || res.state != 'success' ? new Date().getTime() : webApi.stringData(res.data[0].loginTime)
      }

      commit('updateLoginLog', data);

    })

  },


  // 获取最近考试信息
  fetchExamDate({commit, state}) {

    getExamDate(state.examDateParams)

    .then(res =>{

      if(!res || res.state != 'success'){
        webApi.alert('网络异常，请稍后再试');
        return false;
      }

      commit('updateExamDate', res.data[0] || {});
    })

  },

  // 获取用户信息
  fetchUserInfo({commit, state}, params) {

    getUserInfo(params)

    .then(res =>{

      if(!res || res.state != 'success') {
        webApi.alert('网络异常，请稍后再试');
        return false;
      }

      commit('updateUserDetails', res.data);

    })

  },

  // 获取消息列表
  fetchMsgList({commit, state}) {

      getMsgList(state.msgListP)

      .then(res =>{

        if(!res || res.state != 'success') {
          webApi.alert('消息获取失败，请稍后再试');
          return false;
        }

        commit('updateMsgList', res.data);

      })

  },

}
