

// 方法都挂载都全局方法上
var g = {
  device: window.navigator.userAgent.toLocaleLowerCase().indexOf('android') != -1 ? 'android' : 'ios',
  targetLogin: targetLogin,
  targetLearningCourses: targetLearningCourses,
  backLogin: backLogin,
  closeNewNote: closeNewNote,
  openActivityPage: openActivityPage,
  closeSetting: closeSetting,
  hiddenJiuCuoView: hiddenJiuCuoView,
  outLogin: outLogin,
  passWeiBoUrl: passWeiBoUrl,
  torenew: torenew,
  getClassCourseData: getClassCourseData,
  clickToPlayVido: clickToPlayVido,
  closeLoading: closeLoading,
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
  g.device == 'ios' ? caicui.tokenInvalid('nologin') : window.course.clonesActivity();
}

// 关闭新建页
function closeNewNote() {
  g.device == 'ios' ? caicui.hiddenAddNoteViewOrRequestView('jj') : window.course.back();
}

// 退回登录页面
function backLogin() {
  g.device == 'ios' ? clickBtn.registerBack('reg') : window.course.back();
}

// 关闭Loading
function closeLoading() {
  try{
    g.device == 'ios' ? caicui.hiddenLoadingImageView() : window.course.clonesProgress();
  }catch(e){
    console.error(e);
  }
}

// 跳出窗口打开活动页
function openActivityPage(url){
  g.device == 'ios' ? caicui.openActivity(url) : window.course.toActivity(url);
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

// 获取设备型号
function getDeviceType(data = {}) {

  setCookie('getDeviceType', data);

}

//关闭设置页
function closeSetting(data = {}) {

  g.device == 'ios' ? caicui.clickSetBack(data) : window.course.closeSetting();

}

//在学课程跳转课程详情页
function getClassCourseData(data = {}) {
  
  g.device == 'ios' ? caicui.getOnlineCourseData(data) : window.course.getClassCourseData(data);

}

//点击交流跳转视频页
function clickToPlayVido(data = {}) {

  g.device == 'ios' ? caicui.clickToPlayVido(data) : window.course.toMediaActivity(data);

}
//关闭视频纠错页
function hiddenJiuCuoView(data = {}) {

  g.device == 'ios' ? caicui.hiddenJiuCuoView() : window.course.hiddenJiuCuoView();

}

//打开浏览器
function passWeiBoUrl(url) {

  g.device == 'ios' ? caicui.passWeiBoUrl(url) : window.course.toActivity(url);

}

//用于申请重听的路径跳转
function torenew(url) {

  g.device == 'ios' ? caicui.applyStudyOnlineCourseAgain(url) : window.course.toActivity(url);

}

//退出登录
function outLogin(data = {}) {

  g.device == 'ios' ? caicui.clickLoginLaunch() : window.course.logOff();

}

// 试卷页面需要用到的id(用于试卷)
function getExamNeedIds(data = {}) {

  data = JSON.parse(data);

  setCookie('examNeedIds', JSON.stringify(data));

}
