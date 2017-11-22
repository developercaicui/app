
import * as types from './mutations-types';
import webApi from 'api/api';
import {
  getNewNoteList,
  getNoteList,
  getNoteDetailsList,
  getCourseNoteList
 } from 'IpadApi/port';

export const fetchSelectCourseList = ({ commit }, params) =>{

  getNewNoteList(params)

  .then(res =>{

    if(!res || res.state != 'success'){
      res = {
        data: [],
        msg: res.msg || '数据异常',
        state: 'error'
      }
    }

    commit(types.SET_SELECT_COURSE_LIST, res.data.courselist);

  })


}

export const fetchNoteDetailsList = ({ commit }, params) =>{

  webApi.loadingData();

  getNoteDetailsList(params)

  .then(res =>{

    webApi.closeLoadingData();
    
    if(!res || res.state != 'success'){
      res = {
        data: [],
        msg: res.msg || '数据异常',
        state: 'error'
      }
    }

    let list, date;

    list = res.data.map(item =>{

      date = new Date( item.updateTime * 1000 );

      item.newTime = `${date.getFullYear()}-${webApi.isSmallTen(date.getMonth() + 1)}-${webApi.isSmallTen(date.getDate())}  ${webApi.isSmallTen(date.getHours())}:${webApi.isSmallTen(date.getMinutes())}`;
      item.progress = `${ webApi.formatType(item.taskType, item.taskprogress) }`;

      item.imgPath != ',' && item.imgPath.length && (item.allPic = item.imgPath.split(',').map(src => `${webApi.cdnImgUrl}${src}`));

      return item;
    });

    commit(types.SET_NOTE_DETAILS_LIST, list);

  });


}

export const fetchMeNoteList =  ({ commit }, params) =>{

  if(params.hasOwnProperty('isLoad')) {
    delete params['isLoad'];
    webApi.loadingData();
  }

  getNoteList(params)

  .then(res =>{

    webApi.closeLoadingData();

     if(!res || res.state != 'success'){
       res = {
         data: [],
         msg: res.msg || '数据异常',
         state: 'error'
       }
     }

     commit(types.SET_ME_NOTE_LIST, res.data);

   });


}


export const fetchAllNoteList = ({ commit }, params) =>{

  if(params.hasOwnProperty('isLoad')) {
    delete params['isLoad'];
    webApi.loadingData();
  }

  getCourseNoteList(params)

  .then(res =>{

     webApi.closeLoadingData();


     if(!res || res.state != 'success'){
       res = {
         data: [],
         msg: res.msg || '数据异常',
         state: 'error'
       }
     }

     commit(types.SET_ALL_NOTE_LIST, [res.data]) ;

   });


}
