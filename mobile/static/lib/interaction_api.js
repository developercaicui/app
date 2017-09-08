

// 方法都挂载都全局方法上
var g = {
  targetLogin: targetLogin,
  targetLearningCourses: targetLearningCourses,
  backLogin: backLogin,
}


// 登录成功获取用户信息
function getUserInfo(data || {}) {

  // console.log('---')
  console.log(arguments[0])

  data = JSON.parse(data);

  console.log(data)


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
  caicui.getCourseData(data)
}
