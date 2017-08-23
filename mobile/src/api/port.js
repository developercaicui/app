
import axios from 'axios';
import qs from 'qs';

const requestUrl = process.env.NODE_ENV === 'development' ? '' : 'http://api.caicui.com'; // 请求地址


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
