

// 方法都挂载都全局方法上
var g = {
  targetLogin: targetLogin,
  targetLearningCourses: targetLearningCourses,
  backLogin: backLogin,
  device: window.navigator.userAgent.toLocaleLowerCase().indexOf('android') != -1 ? 'android' : 'ios'
}

// 登录成功获取用户信息
function getLoginInfo(data = {}) {
  
  data = JSON.parse(data);

  setCookie('userInfo', JSON.stringify(data));
  setCookie('token', data.token || 'null');

}

// 存Cookie
function setCookie(key, value, days = 30) {

  if(window.localStorage){
    window.localStorage.setItem(key, value);
    return;
  }

  let d = new Date();
  let expires = null;

  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  expires = "expires=" + d.toUTCString();
  document.cookie = `${key}=${value};${days}`;

}

// 跳转到登录页
function targetLogin() {
  caicui.tokenInvalid('nologin');
}

// 退回登录页面
function backLogin() {
 clickBtn.registerBack('reg');
}

/**
 * 跳转到学习课程页
 * @type {Object} JSON 课程
 */
function targetLearningCourses(data) {
  g.device == 'ios' ? caicui.getCourseData(data) : window.course.getCourseData(data);
}

// 用户课程信息(用于交流)
function getDiscussInfo(data = {}) {

  data = JSON.parse(data);

  setCookie('getDiscussInfo', JSON.stringify(data));

}

// 用户课程信息(用于笔记)
function getCourseNoteInfo(data = {}) {

  data = JSON.parse(data);

  setCookie('getCourseNoteInfo', JSON.stringify(data));

}

// 试卷页面需要用到的id(用于试卷)
function getExamNeedIds(data = {}) {
  alert(data)
  data = JSON.parse(data);

  setCookie('examNeedIds', JSON.stringify(data));

}