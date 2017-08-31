
import { getUserInfo } from './port';


export default {

  /**
    * 图片预加载
    * @type {Array} 图片数组
    */
  preloadImages(arr) {

  },

/**
  * 是否登录
  * @return {Boolean}  true为已登录 false为登录
  */
  isLogin() {

    let params = {
      token: this.getCookie('userInfo') ? JSON.parse(this.getCookie('userInfo')).token : null
    };

    if(params.token){

      return getUserInfo(params)

      .then(res => {
        if(!res || res.state != 'success') return false;
        else return true
      })

    }else return true;


  },
  /**
    * 设备类型区分
    * @return {String} 设备类型
    */
  getDeviceType() {

    let device = window.navigator.userAgent.toLocaleLowerCase();

    if(device.includes('ipad'))
      return 'ipad';
    else if(device.includes('mobile'))
      return 'mobile';

  },

  /**
    * rem换算
    */
  remCount() {

    const OHTML = document.documentElement;
    const screenWidth = OHTML.clientWidth;
    const deviceType = this.getDeviceType();

    let designWidth = deviceType === 'mobile' ? 750 : 2048;

    let initialRem = designWidth / 100;  // 换算基准值   (设计稿尺寸)/100(固定值)

    OHTML.dataset.device = deviceType;
    OHTML.dataset.dpr = window.devicePixelRatio;
    OHTML.style.fontSize = `${screenWidth / initialRem}px`;

  },

  /**
   * 存取Cookie
   * @type {String} key值
   * @type {String} value值
   */
  setCookie(key, value, days = 30) {

    if(window.localStorage){
      window.localStorage.setItem(key, value);
      return;
    }

    let d = new Date();
    let expires = null;

    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "expires=" + d.toUTCString();
    document.cookie = `${key}=${value};${days}`;

  },

  /**
   * 读取Cookie
   * @type {String} key值
   * @return {String} cookie值
   */
  getCookie(key) {


    if(window.localStorage) return window.localStorage.getItem(key);

    let arr, reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`);

    if(arr = document.cookie.match(reg)) return unescape(arr[2]) || null;

  },

  /**
   * 删除Cookie
   * @type {String} key值
   */
  delCookie(key) {

    if(window.localStorage){
      window.localStorage.clear();
      return;
    }

    let exp = new Date();
    let cval = this.getCookie(key);

    exp.setTime(exp.getTime() - 1);
    if( cval != null) document.cookie= `${key}=${cval};expires=${exp.toGMTString()}`;

  },

  /**
   * 是否小于10，小于填存0
   * @type {Number}  数字
   * @return {String} 字符串
   */
   isSmallTen: (num) => num < 10 ? `0${num}` : num,

   /**
    * 递归父节点
    * @type {String}  node 现在的节点
    * @type {String}  target 目标父节点
    * @return {String} 父节点
    */
   recursiveParentNode(node, target) {
      return node.nodeName.toLowerCase() == target ? node : this.recursiveParentNode(node.parentNode, target) ;
   },
   /**
    * 递归父节点
    * @type {String}  message 提示消息
    * @type {Number}  time   隐藏时间
    */
   alert(message = '网络异常，请稍后再试', time = 2000) {

     let oDiv = document.createElement('div');

     oDiv.className = 'g-small-alert';
     oDiv.innerText = message;

     document.body.appendChild(oDiv);

     if(typeof time != 'number') time = Number(time);

     setTimeout(()=>{
       document.body.removeChild(oDiv);
     }, time);

   },

   /**
    * 数据加载load动画
    * @type {String}  message 提示消息
    * @type {Object}  json   包含了一些课扩展值，，例如css
    */
   loadingData(message = '加载中', json = {}) {

     let oDiv = document.createElement('div');

     oDiv.className = 'g-data-loading-wrap';
     oDiv.id = 'dataLoading';

     if(json.css) oDiv.style.cssText = json.css;

     oDiv.innerHTML = `
     <div class="g-data-loading">
       <div class="showbox">
         <div class="loader">
           <svg class="circular" viewBox="25 25 50 50">
             <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
           </svg>
         </div>
       </div>
       <h1>${message}...</h1>
     </div>
      `;
     document.body.appendChild(oDiv);

   },

   /**
    * 关闭数据加载load动画
    */
   closeLoadingData() {
     document.body.removeChild(document.querySelector('#dataLoading'));
   },
  // cdn 地址
  cdnImgUrl: 'http://cdnimg.caicui.com/',
  //判断是否为空
  isEmpty(data) {
    if (this.isEmpty1(data) || this.isEmpty2(data)) {
      return true;
    }
    return false;
  },

  isEmpty1(data) {
    if (data == undefined || data == null || data == 'null' || data == "" || data == 'NULL' || data == false || data == 'False' || data == 'false' || data == 'NaN' || data == NaN) {
      return true;
    }
    return false;
  },

  isEmpty2(v) {
    switch (typeof v) {
      case 'undefined' :
        return true;
      case 'string' :
        if (this.trim(v).length == 0)
          return true;
        break;
      case 'boolean' :
        if (!v)
          return true;
        break;
      case 'number' :
        if (0 === v)
          return true;
        break;
      case 'object' :
        if (null === v)
          return true;
        if (undefined !== v.length && v.length == 0)
          return true;
        for (var k in v) {
          return false;
        }
        return true;
        break;
    }
    return false;
  },
  trim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, "");
  },
  /**
   * 处理课程列表（在学，未激活，过期课程）
   */
  outCourseList(ret) {
      let stooges = ret.data.courselist;
      let categoryIdArr = [];
      for(let i=0;i<stooges.length;i++){
         if(categoryIdArr && categoryIdArr.length){
               let isPush = true;
               for(let j=0;j<categoryIdArr.length;j++){
                     if(stooges[i].subjectID == categoryIdArr[j].subjectID){
                           isPush = false;
                     }
               }
               if(isPush){
                     categoryIdArr.push({
                           categoryId :　stooges[i].categoryId,
                           subjectID :　stooges[i].subjectID,
                           categoryIndex :　stooges[i].categoryIndex,
                           subjectIndex : stooges[i].subjectIndex,
                           categoryName : stooges[i].categoryName,
                           subjectName : stooges[i].subjectName,
                           courseLists : []
                     })
               }
         }else{
               categoryIdArr.push({
                     categoryId :　stooges[i].categoryId,
                     subjectID :　stooges[i].subjectID,
                     categoryIndex :　stooges[i].categoryIndex,
                     subjectIndex : stooges[i].subjectIndex,
                     categoryName : stooges[i].categoryName,
                     subjectName : stooges[i].subjectName,
                     courseLists : []
               })
         }

      }
      let courseLists = [];
      for(let i=0;i<categoryIdArr.length;i++){
         for(let j=0;j<stooges.length;j++){
               if(categoryIdArr[i].subjectID == stooges[j].subjectID){
                     categoryIdArr[i].courseLists.push(stooges[j]);
               }
         }
      }
      function down(x, y) {
            return (x.subjectIndex > y.subjectIndex) ? 1 : -1
      }

      let learningD = {};
      categoryIdArr.forEach(function(val, i) {
          let categoryName = val.categoryName;
          let categoryId = val.categoryId;
          if (!learningD[categoryId]) {
              learningD[categoryId] = {
                 categoryName : categoryName,
                 subjectIndex : categoryIdArr[i].subjectIndex,
                 children: [categoryIdArr[i]]
              }
          }else{
            learningD[categoryId].children.push(
                  categoryIdArr[i]
            )
            learningD[categoryId].children.sort(down)
          }

      });

      return learningD
  },
  formatDate(now, t) {//时间转换
      let date = new Date(parseInt(now * 1000));
      let Y,M,D,h,m,s;
      if (t == 'Y') {
          Y = date.getFullYear();
          return Y;
      }
      if (t == 'M') {
          M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
          return M;
      }
      if (t == 'D') {
          D = date.getDate();
          return this.extra(D);
      }
      if (t == 'h') {
          h = date.getHours();
          return this.extra(h);
      }
      if (t == 'm') {
          m = date.getMinutes();
          return this.extra(m);
      }
      if (t == 's') {
          s = date.getSeconds();
          return this.extra(s);
      }
    },
     //补位函数。
    extra(x) {
        //如果传入数字小于10，数字前补一位0。
        if (parseInt(x) < 10) {
          return "0" + parseInt(x);
        } else {
          return x;
        }
    },
    formatType(type, value) {//任务类型
    //  if (isEmpty(value) || value == 0) {
        if (value == "-1") {
            return '';
        } else {
    //      switch (type) {
    //          case 'video':
                if(type == 'video'){
                    var theTime = parseInt(value);
                    // 秒
                    var theTime1 = 0;
                    // 分
                    var theTime2 = 0;
                    // 小时
                    if (theTime >= 60) {
                        theTime1 = parseInt(theTime / 60);
                        theTime = parseInt(theTime % 60);
                        if (theTime1 >= 60) {
                            theTime2 = parseInt(theTime1 / 60);
                            theTime1 = parseInt(theTime1 % 60);
                        }
                    }
                    var i, s, h;
                    if (theTime2 >= 10) {
                        h = theTime2;
                    } else {
                        h = '0' + theTime2;
                    }
                    if (theTime1 >= 10) {
                        i = theTime1;
                    } else {
                        i = '0' + theTime1;
                    }
                    if (theTime >= 10) {
                        s = theTime;
                    } else {
                        s = '0' + theTime;
                    }
                    if (h > 0) {
                        return parseInt(parseInt(i) + parseInt(h * 60)) + ':' + s;
                    } else {
                        return i + ':' + s;
                    }
                    //return h + ':' + i + ':' + s;
                }else if(type == 'exam' || type == 'knowledgePointExercise'){
                    return ' 第' + value + '题';
                }
    //              break;
    //          case 'exam':
    //              return ' 第' + value + '题';
    //              break;
    //          default:
    //              return ' 第' + value + '页';
    //              break;
    //      }
        }
    },
    /**
    * 没有数据
    */
    notDate() {

        document.body.classList.contains("null") ? document.body.classList.remove("null") :document.body.classList.add("null")

    }

};
