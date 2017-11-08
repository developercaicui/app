
import * as types from './mutations-types';
import webApi from 'api/api';
import {
  getExchangeList,
  getLearningCourse,
	getCourseProgres,
	getExamDate
 } from 'IpadApi/port';

export const fetchExchangeList =  ({ commit }, params) =>{

  webApi.loadingData();

  getExchangeList(params).then(res => {

    webApi.closeLoadingData();

    if(!res && res.state !== 'success') return;

    res.data.map(item =>{
        item.headImg = `${webApi.cdnImgUrl}${item.headImg}`;
        item.imgPath = `${webApi.isEmpty(item.imgPath)?'':item.imgPath}`;
        item.updateTime = `${webApi.isEmpty(item.updateTime)?'':webApi.formatDate(item.updateTime,'Y')}-${webApi.formatDate(item.updateTime,'M')}-${webApi.formatDate(item.updateTime,'D')}&nbsp;&nbsp;&nbsp;${webApi.formatDate(item.updateTime,'h')}:${webApi.formatDate(item.updateTime,'m')}`;
        item.taskprogress = `${item.taskprogress != '-1' && item.taskType != ' '&& item.taskType == 'video' && item.courseId && item.courseId != ' ' && item.chapterId && item.chapterId != ' ' && item.taskId && item.taskId != ' '?webApi.formatType(item.taskType,item.taskprogress):''}`;
    });

    commit(types.GET_ALL_EXCHANGE_LIST, res.data);

  });

}

