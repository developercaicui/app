
import * as types from './mutations-types';
import webApi from 'api/api';
import {
  getActivityList,
  getLearningCourse,
	getCourseProgres,
	getExamDate
 } from 'IpadApi/port';

export const fetchActivityList =  ({ commit }) =>{

  getActivityList().then(res => {

    if(!res && res.state !== 'success') return;

    commit(types.GET_ACTIVITY_LIST, res.data);
    commit(types.SET_IS_FIRST_GET_ACTIVITY, false);

  });

}

export const fetchCourseList =  ({ commit }, { isLoad }) =>{

  let learningCourseList = [];
  let userInfo = JSON.parse(webApi.getCookie('userInfo')) || {};

  isLoad && webApi.loadingData();


  // 最近所学课程
  getLearningCourse({
    verTT: new Date().getTime(),
    token: userInfo.token,
    pageNo: 1,
    pageSize: 999
  })

  .then(res =>{

    if(!res || res.state != 'success'){
      webApi.closeLoadingData();
      webApi.alert('在学课程列表获取失败，请稍后再试！');
      return false;
    }

    learningCourseList = res.data.courselist.map( item => {

      let expirationDate = new Date(item.expirationTime*1000);

      return {
        courseName: item.courseName,
        courseId: item.courseId,
        categoryId: item.categoryId,
        courseGroupId: item.courseGroupId,
        expirationTime: `${expirationDate.getFullYear()}/${webApi.isSmallTen(expirationDate.getMonth() + 1)}/${webApi.isSmallTen(expirationDate.getDate())}`,
        courseGroupId: item.courseGroupId,
        subjectID: item.subjectID,
        taskTotal: item.taskTotal,
        versionId: item.versionId,
        lockStatus: item.lock_status,
        courseProgress: 0,
        examinationDate: '暂无考试',
        token: userInfo.token,
        memberId: userInfo.memberId
      }

    });


  })
  .then(() =>{

    let courseIds =  learningCourseList.map(item => item.courseId);

    // 进度
    return getCourseProgres({
      token: userInfo.token,
      memberId: userInfo.memberId,
      courseId: courseIds.toString()
    })

  })

  .then(res =>{

    if(!res || res.state != 'success'){
      webApi.closeLoadingData();
      webApi.alert('在学课程列表获取失败，请稍后再试！');
      return false;
    }

    try {

        let newLastProgress = {
           RecentCourse : []
        };

        for(let i=0;i<learningCourseList.length;i++){

          for(let j=0;j<res.data.length;j++){

            if(learningCourseList[i].courseId == res.data[j].courseId){
                learningCourseList[i].createDate = res.data[j].createDate;
                learningCourseList[i].courseProgress = res.data[j].courseProgress;
                learningCourseList[i].progress = res.data[j].progress;
                newLastProgress.RecentCourse.push(learningCourseList[i]);
            }

          }

        }

        let filterLastProgress = newLastProgress.RecentCourse;
        let i = 0,
            len = filterLastProgress.length,
            j, d;
        for (; i < len; i++) {
          for (j = 0; j < len; j++) {

            if (parseInt(filterLastProgress[i].createDate) > parseInt(filterLastProgress[j].createDate)) {
                d = filterLastProgress[j];
                filterLastProgress[j] = filterLastProgress[i];
                filterLastProgress[i] = d;
            }

          }
        }

        learningCourseList = filterLastProgress;

        learningCourseList.map((item, index) =>{

          let num = parseInt(item.courseProgress/item.taskTotal*100) || 0;

          if(num === 0) num =  !item.progress ? 0 : 1;

          // learningCourseList[index].courseProgress = item.courseProgress;
          learningCourseList[index].studyProportion = num > 100 ? 100 : num;
          // this.learningCourseList[index].createTime = item.createDate;

        });

    } catch (e) {

    } finally {

    }


    return getExamDate({
      verTT: new Date().getTime(),
      memberId: userInfo.memberId,
    })

  })
  .then(res =>{

    webApi.closeLoadingData();

    if(!res || res.state != 'success'){
      webApi.alert('获取失败，请稍后再试！');
      return false;
    }

    // courseId 做比较
    res.data.map(item => learningCourseList.map(list => item.categoryId == list.subjectID ? list['examinationDate'] =  `${new Date(item.examinationDate).getFullYear()}/${webApi.isSmallTen(new Date(item.examinationDate).getMonth() + 1)}/${webApi.isSmallTen(new Date(item.examinationDate).getDate())}` : '暂无考试') );

    learningCourseList.map(item =>{
      item.examinationDate = item.examinationDate.includes('1970') ? '暂无考试' : item.examinationDate;
    });

    commit(types.SET_COURSE_LIST, learningCourseList)
  })

}
