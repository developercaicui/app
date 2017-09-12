
import webApi from './api';
import axios from 'axios';
import qs from 'qs';

const requestUrl = process.env.NODE_ENV === 'development' ? '' : 'http://api.caicui.com'; // 请求地址
const LOC = window.location;
const headers = {
  urlencoded: {
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    }
  },

};

let isPendingRequest = false;

// 响应拦截
axios.interceptors.response.use(response => {

  let { msg: msg, state: state } = response.data;

  if (msg == 'nologin' && state == 'error') {

    isPendingRequest = true;

    webApi.alert('登录失效，即将跳到登录页');


    setTimeout( ()=>{
      if(webApi.getCookie('isTargetLogin') === 'false') {
        g.targetLogin();
        webApi.setCookie('isTargetLogin', 'true')
      }
    },2000)


  }else{
    return response;
  }

}, error =>  {
  if(!isPendingRequest) Promise.reject(error)
});

// 获取token
export const getToken = params => { return axios.post(`${requestUrl}/api/zbids/app/gettoken/v1.0/`, qs.stringify(params)).then(res => res.data).catch(err => err) };
// 登录
export const login = params => { return axios.post(`${requestUrl}/api/zbids/member/login/v1.0`, qs.stringify(params)).then(res => res.data).catch(err => err) };
// 查询手机号是否存在
export const phoneIsExist = params => { return axios.get(`${requestUrl}/api/zbids/member/checkexist/v1.0?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };
// 发送验证码
export const sendCode = params => { return axios.post(`${requestUrl}/api/base/sms/sendsms/v1.0/`, qs.stringify(params)).then(res => res.data).catch(err => err) };
// 手机注册
export const mobileReg = params => { return axios.post(`${requestUrl}/api/zbids/member/mobilereg`, qs.stringify(params)).then(res => res.data).catch(err => err) };
// 手机找回密码
export const changePwdByPhone = params => { return axios.post(`${requestUrl}/api/zbids/member/changePwdByPhone`, qs.stringify(params)).then(res => res.data).catch(err => err) };

// 修改用户名
export const changeUserName = params => { return axios.post(`${requestUrl}/api/zbids/member/editinfo`, qs.stringify(params), headers).then(res => res.data).catch(err => err) };
// 上传图片
export const uploadFile = params => { return axios.post(`${requestUrl}/api/zbids/member/edituserheadr`, params).then(res => res.data).catch(err => err) };


// 获取学员信息
export const getUserInfo = params => { return axios.post(`${requestUrl}/api/zbids/member/getmemberinfo`, qs.stringify(params)).then(res => res.data).catch(err => err) };
// 获取活动列表
export const getActivityList = params => { return axios.get(`${requestUrl}/api/article/slide/list?verTT=${new Date().getTime()}&tag=0&valid=true&count=5`,{}).then(res => res.data).catch(err => err) }



// 获取登录时间
export const getLoginLog = params => { return axios.get(`${requestUrl}/api/zbids/member/getLoginLog?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };
// 获取最近考试时间以及科目
export const getExamDate = params => { return axios.get(`${requestUrl}/api/business/coursestudy/getExamDate?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };
// 最近所学课程
export const getLearningCourse = params => { return axios.get(`${requestUrl}/api/business/learning/learningcourse/v1.0?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };
// 获取学员一个或者多个课程的学习进度和最后1次学习的章节任务
export const getCourseProgres = params => { return axios.get(`http://action.caicui.com/api/userAction/course/getCourseProgress/v1.0/?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };

// 获取消息列表
export const getMsgList = params => { return axios.get(`${requestUrl}/api/study/message/list/v1.0?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };
// 消息列表更新状态，点击过后为已读
export const updateLogStatus = params => { return axios.get(`${requestUrl}/api/study/message/updateStatus/v1.0?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };
//获取未激活课程
export const getNoactiveCourse = params => { return axios.get(`${requestUrl}/api/business/learning/noActivecourse/v1.0?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };
//获取已过期课程
export const getOverdueCourse = params => { return axios.get(`${requestUrl}/api/business/learning/expirationcourse/v1.0?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };
//获取未激活课程介绍信息
export const getExtendInfo = params => { return axios.get(`${requestUrl}/api/v2.1/course/courseExtendInfo?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };

//查询课程考试时间
export const timeList = params => { return axios.get(`${requestUrl}/api/v2/exam/timeList?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };
//激活课程
export const courseActive = params => { return axios.get(`${requestUrl}/api/business/order/courseActive/v1.0?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };
//退出登录
export const loginout = params => { return axios.get(`${requestUrl}/api/zbids/member/loginout/v1.0?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };
//发送反馈意见
export const complaintOpinion = params => { return axios.post(`${requestUrl}/api/business/complaintOpinion/create/v1.0`, qs.stringify(params)).then(res => res.data).catch(err => err) };



// 获取我的笔记列表
export const getNoteList = params => { return axios.post(`${requestUrl}/api/studytools/myallcoursechapternodecount/v2.1`, qs.stringify(params)).then(res => res.data).catch(err => err) };
// 获取课程笔记列表
export const getCourseNoteList = params => { return axios.post(`${requestUrl}/api/studytools/coursechapternodecount/v2.1`, qs.stringify(params)).then(res => res.data).catch(err => err) };
// 进入笔记详情列表
export const getNoteDetailsList = params => { return axios.get(`${requestUrl}/api/studytools/nodelist/v2.1?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };
// 笔记详情
export const getNoteDetails = params => { return axios.get(`${requestUrl}/api/studytools/nodedetail/v2.1?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };
// 删除笔记
export const removeNoteDetails = params => { return axios.get(`${requestUrl}/api/studytools/delmycontent/v2.1?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };
// 搜索笔记
export const searchhNote = params => { return axios.get(`${requestUrl}/api/studytools/findcontent/v2.1?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };

// 我的交流
export const getExchangeList = params => { return axios.get(`${requestUrl}/api/studytools/bbslist/v1.0?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };
// 我的交流详情
export const getExchangeDetails = params => { return axios.get(`${requestUrl}/api/studytools/bbsdetail/v1.0?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };
// 删除我的交流详情
export const removeExchangeDetails = params => { return axios.get(`${requestUrl}/api/studytools/bbs_del/v1.0?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };


// 新建笔记选择要创建的课程
export const getNewNoteList = params => { return axios.get(`${requestUrl}/api/business/learning/learningcourse/v1.0?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };
// 新建笔记选择要创建的课程的章节
export const getNewNoteSectionList = params => { return axios.get(`${requestUrl}/api/teachsource/course/courseDetail?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };

// 新建笔记上传照片
export const fileUpload = params => { return axios.post(`${requestUrl}/api/v2.1/commons/fileUpload`, params).then(res => res.data).catch(err => err) };
// 新建笔记
export const saveNote = params => { return axios.post(`${requestUrl}/api/studytools/nodesave/v2.1`, qs.stringify(params), headers.urlencoded).then(res => res.data).catch(err => err) };
// 编辑笔记详情
export const getNodeDetail = params => { return axios.get(`${requestUrl}/api/studytools/nodedetail/v2.1?${qs.stringify(params)}`, {}).then(res => res.data).catch(err => err) };

// 交流回复
export const exchangeReply = params => { return axios.post(`${requestUrl}/api/studytools/bbsreply/v1.0`, qs.stringify(params), headers.urlencoded).then(res => res.data).catch(err => err) };
// 新建交流
export const newExchange= params => { return axios.post(`${requestUrl}/api/studytools/bbssave/v1.0`, qs.stringify(params), headers.urlencoded).then(res => res.data).catch(err => err) };
