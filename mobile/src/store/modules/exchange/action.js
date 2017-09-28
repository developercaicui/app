
import webApi from '../../../api/api';

import {
  getExchangeList
} from '../../../api/port';


export default {

  // 交流列表
  fetchExchangeList({commit, state}) {

    getExchangeList(state.exchangeListParams)

    .then(res =>{

      webApi.closeLoadingData();

      if(!res || res.state != 'success'){
        webApi.alert('获取列表失败，请稍后再试');
        return false;
      }

      commit('updateExchangeList', res);

    })

  },

}
