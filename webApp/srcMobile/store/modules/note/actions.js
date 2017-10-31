
import * as types from './mutations-types';
import webApi from 'api/api';

export const getNoteMeList =  ({ commit }) =>{
  commit(types.SET_ME_LIST, ['1', '2', '3']);
}
