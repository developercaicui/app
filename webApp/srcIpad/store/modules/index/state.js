
import webApi from '../../../api/api';

export default {
	msgList: [], // 消息列表
  userDetails: {}, // 用户信息
  examData: {}, // 用户考试数据
	activityList: [], // 活动列表
  loginLogData: { // 登录时间
    time:  webApi.stringData(new Date().getTime())
  },
  msgListP: {
    verTT: new Date().getTime(),
    pageNo: 1,
    pageSize: 99,
    isRead: 0,
    token: ''
  },
  examDateParams: {
    verTT: new Date().getTime(),
    memberId: ''
  },
  LoginLogParams: {
    verTT: new Date().getTime(),
    memberid: '',
    pageSize: 1,
    pageNo: 1
  }
}
