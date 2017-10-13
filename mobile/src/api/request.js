import axios from 'axios';
import qs from 'qs';
import config from './requestConfig';
import API from './api';
import COMMON from './common';

axios.defaults.timeout = 0;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// axios.interceptors.request.use((config) => {
//   if (config.method === 'POST') {
//     config.data = qs.stringify(config.data);
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });
axios.interceptors.response.use((res) => {
  if (res && res.data.state == 'success') {
    return Promise.reject(res.data);
  } else {
    return Promise.reject('res');
  }

}, (error) => {
  return Promise.reject(error);
});


export default {
  examCache(params) {
    return getArgs('exercisePointCountCache', params);
  },
  examStatus(params) {
    return getArgs('exerciseKnowledgeMemberStatus', params);
  },
  getExerciseBaseInfo(params) {
    return getArgs('getExerciseBaseInfo', params);
  },
  exerciseList(params) {
    return getArgs('userKnowledgePointExerciseList', params);
  },
  exerciseDetail(params) {
    return getArgs('getNidExerciseDetail', params);
  },
  setMemberExerciseLog(params) {
    return getArgs('setMemberExerciseLog', params)
  },
  setMemberExamenFinish(params) {
    return getArgs('setMemberExamenFinish', params)
  },
  setMemberErrorExercise(params) {
    return getArgs('setMemberErrorExercise', params)
  },
  delMemberExercise(params) {
    return getArgs('delMemberExercise', params)
  },
  getExamenInfo(params) {
    return getArgs('getExamenInfo', params)
  },
  getKnowledgePointInfo(params) {
    return getArgs('getKnowledgePointInfo', params)
  },
  actionTaskProgress(params) {
    return getArgs('actionTaskProgress', params)
  }
}

function getArgs(port, params) {
  var args = {};
  var thatServer = server[port];
  var hostName = '';
  var thatServerUrl = thatServer.url;
  // if(process.env.NODE_ENV == 'development'){ // production development
  // if(thatServer.staticDataDemo){
  //  args.url = thatServer.staticDataDemo  + "?verTT=" + new Date().getTime();
  //  args.type = 'GET';
  // }else{
  //  hostName  = COMMON.host.demoName;
  //  if(thatServer.hostNameDemo){
  //    hostName = thatServer.hostNameDemo;
  //  }
  //  if(thatServer.urlDemo){
  //    thatServerUrl = thatServer.urlDemo;
  //  }
  //  args.url = hostName + thatServerUrl  + "?verTT=" + new Date().getTime();
  //  args.type = thatServer.type ? thatServer.type : 'GET';
  // }

  // }else{
  hostName = COMMON.host.name;
  if (thatServer.hostName) {
    hostName = thatServer.hostName;
  }
  args.url = hostName + thatServerUrl + "?verTT=" + new Date().getTime();
  args.type = thatServer.type ? thatServer.type : 'GET';
  // }

  // return args;

  if (args.type === 'POST') {
    return axios.post(args.url, params, config).then(res => res.data).catch(err => err)
  } else if (args.type === 'GET') {
    return axios.get(args.url, {
      params: params
    }, config).then(res => res.data).catch(err => err)
  }
}


const server = {
  'token': {
    // 'url' : '/api/v2.1/getToken',
    'url': '/api/zbids/app/gettoken/v1.0/',
    'data': COMMON.product.pcWeb
  },
  'login': {
    // 'url' : '/api/v2.1/login',
    'url': '/api/zbids/member/login/v1.0',
    'type': 'POST'
  },
  'logout': {
    // 'url' : '/api/v2.1/logout'
    'url': '/api/zbids/member/loginout/v1.0'
  },
  'member': {
    // 'url' : '/api/v2/member/get'
    'url': '/api/zbids/member/getmemberinfo'
  },
  'loginloglist': {
    // 'url' : '/api/v3/user/loginloglist'
    'url': '/api/zbids/member/getLoginLog'
  },
  'getExamDate': {
    // 'url' : '/api/v2.1/study/getExamDate'
    'url': '/api/business/coursestudy/getExamDate'
  },
  'message-list': {

    // 'url' : '/api/v2/message/list'
    // 'url' : '/api/study/message/getMessage/v1.0'
    'url': '/api/study/message/list/v1.0'
  },
  'updateStatus': {
    'url': '/api/study/message/updateStatus/v1.0'
  },
  'mycount': {
    'url': '/api/studytools/mycount/v2.1'
  },
  'slide-list': {
    // 'url' : '/api/v2.1/slide/list'
    'url': '/api/article/slide/list'
  },
  'exam-list': {
    // 'url' : '/api/v2/exam/list'
    'url': '/api/userAction/examen/get_exercise_knowledge_member_status'
  },
  'learningcourse': { // 在学
    //'url' : '/api/v2.1/learning/learningcourse'
    // 'urlDemo' : '/api/business/learning/learningcourse/v1.0/data',
    'url': '/api/business/learning/learningcourse/v1.0'
  },
  'noActivecourse': { // 未激活
    // 'url' : '/api/v2.1/learning/noActivecourse'
    // 'urlDemo' : '/api/business/learning/noActivecourse/v1.0/data',
    'url': '/api/business/learning/noActivecourse/v1.0'
  },
  'expirationcourse': { // 过期
    // 'url' : '/api/v2.1/learning/expirationcourse'
    // 'urlDemo' : '/api/business/learning/expirationcourse/v1.0/data',
    'url': '/api/business/learning/expirationcourse/v1.0'
  },
  'courseBaseInfo': {
    'urlDemo': '/api/v2.1/course/courseBaseInfo/data',
    'url': '/api/v2.1/course/courseBaseInfo/data',
    'type': 'POST'
  },
  'courseDetail': {
    'urlDemo': '/api/teachsource/course/courseDetail/data',
    'url': '/api/teachsource/course/courseDetail/data'
  },
  'coursesBaseInfo': {
    'urlDemo': '/api/teachsource/course/courseBaseInfo/data',
    'url': '/api/teachsource/course/courseBaseInfo/data'
  },
  'handout': {
    'urlDemo': '/api/teachsource/course/courseBaseInfo/data',
    'url': '/api/teachsource/course/courseBaseInfo/data'
  },
  'version': {
    'urlDemo': '/api/teachsource/course/coursesversionlist/data',
    'url': '/api/teachsource/course/coursesversionlist/data'
  },
  'getNidExerciseDetail': {
    'hostNameDemo': 'http://192.168.10.112:8083',
    'urlDemo': '/api/teachsource/examen/getNidExerciseDetail/data',
    'url': '/api/teachsource/examen/getNidExerciseDetail/data'
  },
  'getExerciseIds': {
    'urlDemo': '/api/teachsource/examen/getExerciseIds/data',
    'url': '/api/teachsource/examen/getExerciseIds/data'
  },
  'getExerciseBaseInfo': {
    'urlDemo': '/api/teachsource/examen/getExerciseBaseInfo/data',
    'url': '/api/teachsource/examen/getExerciseBaseInfo/data'
  },

  'getTasksProgress': {
    'url': '/api/v2/study/getTasksProgress'
  },
  'taskProgress': {
    'url': '/api/v2.1/chapter/taskProgress',
    'type': 'POST'
  },
  'coursestatus': {
    // 'url' : '/api/v2.1/study/coursestatus'
    'url': '/api/business/learning/courseactivestatus'
  },

  'bbslist': {
    'url': '/api/studytools/bbslist/v1.0'
  },
  'bbsdetail': {
    'url': '/api/studytools/bbsdetail/v1.0'
  },
  'bbslist_myJoin': {
    'url': '/api/studytools/bbslist_myJoin/v1.0'
  },
  'bbs_praise': {
    'url': '/api/studytools/bbs_praise/v1.0'
  },
  'bbsreply': {
    'url': '/api/studytools/bbsreply/v1.0',
    'type': 'POST'
  },
  'bbssave': {
    'url': '/api/studytools/bbssave/v1.0',
    'type': 'POST'
  },
  'bbs_del': {
    'url': '/api/studytools/bbs_del/v1.0'
  },
  'course-node': {
    'url': '/api/v2/course/node'
  },
  'nodelist': {
    'url': '/api/studytools/nodelist/v2.1'
  },
  'nodedetail': {
    'url': '/api/studytools/nodedetail/v2.1'
  },
  'node-list': {
    'url': '/api/v2/note/list'
  },
  'nodesave': {
    'url': '/api/studytools/nodesave/v2.1',
    'type': 'POST'
  },
  'coursechapternodecount': {
    'url': '/api/studytools/coursechapternodecount/v2.1',
    'type': 'POST'
  },
  'myallcoursechapternodecount': {
    'url': '/api/studytools/myallcoursechapternodecount/v2.1',
    'type': 'POST'
  },
  'delmycontent': {
    'url': '/api/studytools/delmycontent/v2.1'
  },
  'ad_discuss': {
    'url': '/api/studytools/ad_discuss/v2.1'
  },
  'timeList': {
    'url': '/api/teachsource/exam/timeList'
  },
  'active': {
    // 'url' : '/api/v2/course/active'
    'url': '/api/business/order/courseActive/v1.0'
  },
  'bbs_forumlistShow': {
    'url': '/api/studytools/bbs_forumlistShow/v1.0'
  },
  'addLMG': {
    // 'url' : '/api/v2/lessonMessage/addLMG',
    'url': '/api/business/complaintOpinion/create/v1.0',
    'type': 'POST'
  },

  'exercisePointCountCache': {
    'hostNameDemo': 'http://192.168.10.134:8080',
    'url': '/api/extendapi/examen/get_exercise_point_count_cache',
    'type': 'POST'
  },
  'exerciseKnowledgeMemberStatus': {
    'hostNameDemo': 'http://192.168.10.134:8080',
    'url': '/api/userAction/examen/get_exercise_knowledge_member_status',
    'type': 'POST'
  },
  'userKnowledgePointExerciseList': {
    'hostNameDemo': 'http://192.168.10.134:8080',
    'url': '/api/userAction/examen/get_user_knowledge_point_exercise_list'
  },
  'setMemberExerciseLog': {
    'hostNameDemo': 'http://192.168.10.112:8083',
    'url': '/api/userAction/examen/setMemberExerciseState',
    'type': 'POST'
  },

  'actionGetCourseProgress': {
    'action': 'true',
    'hostName': 'http://action.zbgedu.com',
    'url': '/api/userAction/course/getCourseProgress/v1.0/'
  },
  'actionGetTasksProgress': {
    'action': 'true',
    'hostName': 'http://action.zbgedu.com',
    'url': '/api/userAction/course/getTasksProgress/v1.0/'
  },
  'actionTaskProgress': {
    'action': 'true',
    'hostName': 'http://action.zbgedu.com',
    'url': '/api/userAction/course/taskProgress/v1.0/'
  },
  'wileyCourseActive': {
    'url': '/api/business/order/wileyCourseActive/v1.0'
  },
  'wileyCourseStudy': {
    'url': '/api/business/order/wileyCourseStudy/v1.0'
  },
  'getAppointmentState': {
    'hostName': window.origin,
    'url': '/publicCourse/getAppointmentState.do',
    'type': 'POST'
  },
  'appointClick': {
    'hostName': window.origin,
    'url': '/publicCourse/appointClick.do',
    'type': 'POST'
  },

  'getmembernotprocnoticelist': {
    'url': '/api/business/coursegroup/getmembernotprocnoticelist'
  },
  'membercheck': {
    'url': '/api/business/coursegroup/membercheck'
  },
  'get_user_knowledge_point_exercise_list': {
    'hostNameDemo': 'http://192.168.10.134:8080',
    'url': '/api/userAction/examen/get_user_knowledge_point_exercise_list'
  },
  'get_exercise_knowledge_member_status': {
    // 'staticDataDemo' : './scripts/staticData/get_exercise_knowledge_member_status.json',
    'hostNameDemo': 'http://192.168.10.134:8080',
    'url': '/api/userAction/examen/get_exercise_knowledge_member_status',
    'type': 'POST'
  },
  'getMemberErrorExercise': {
    'hostNameDemo': 'http://192.168.10.134:8080',
    'url': '/api/userAction/examen/getMemberErrorExercise'
  },
  'delMemberExercise': {
    'url': '/api/userAction/examen/delMemberExercise'
  },
  'setMemberErrorExercise': {
    'hostNameDemo': 'http://192.168.10.112:8083',
    'url': '/api/userAction/examen/setMemberErrorExercise',
    'type': 'POST'
  },
  'setMemberExamenFinish': {
    'hostNameDemo': 'http://192.168.10.112:8083',
    'url': '/api/userAction/examen/setMemberExamenFinish',
    'type': 'POST'
  },
  'appointment': {
    'url': '/api/userAction/opencourse/appointment',
    // 'urlDemo': '/api/teachsource/opencourse/appointment/data'
  },
  'getappointmentlist': {
    'url': '/api/userAction/opencourse/getappointmentlist',
    // 'urlDemo': '/api/teachsource/opencourse/getappointmentlist/data'
  },
  'includeopencoursegroup': {
    'url': '/api/business/coursegroup/includeopencoursegroup'
  },
  'memberbuycategorylist': {
    'url': '/api/business/course/memberbuycategorylist'
  },
  'memberbuylist': {
    'url': '/api/business/coursegroup/memberbuylist'
  },
  'getTotalTime': {
    'url': '/api/userAction/openCourse/getTotalTime'
  },
  'settotaltime': {
    'url': '/api/userAction/openCourse/settotaltime'
  },
  'setgift': {
    'url': '/api/userAction/openCourse/setgift'
  },
  'payment': {
    'url': '/api/business/order/payment',
    'type': 'POST'
  },
  'ccLogin': {
    'hostName': 'https://view.csslcloud.net',
    'hostNameDemo': 'https://view.csslcloud.net',
    'url': '/api/view/login',
    'type': 'POST'
  },
  'getcoursecategory': {
    'staticData': './script/staticData/getcoursecategory.json',
    'staticDataDemo': './scripts/staticData/getcoursecategory.json'
  },
  'courseCategoryExamenCount': {
    'url': '/api/teachsource/examen/courseCategoryExamenCount',
    // 'type' : 'POST'
  },
  'courseCategoryExamenList': {
    'url': '/api/teachsource/examen/courseCategoryExamenList'
  },
  'childKnowledgeNodePointList': {
    'url': '/api/teachsource/knowledge/childKnowledgeNodePointList'
  },
  'getListById': {
    'url': '/api/teachsource/resources/getListById'
  },
  'getDetailById': {
    'url': '/api/teachsource/resources/getDetailById'
  },
  'getExamenInfo': {
    'url': '/api/teachsource/examen/getExamenInfo'
  },
  'getKnowledgePointInfo': {
    'url': '/api/teachsource/knowledge/getKnowledgePointInfo'
  }
};
