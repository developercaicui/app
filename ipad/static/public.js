


export default {

  // 请求地址， 本地开发不用写，node里已做转发
  requestUrl: '',

  /**
    * 图片预加载
    * @type {Array} 图片数组
    */
  preloadImages(arr) {

  },

  /**
    * rem换算
    */
  remCount() {

    const OHTML = document.documentElement;

    let initialRem = 2048 / 100;  // 换算基准值   2048(设计稿尺寸)/100(固定值)
    let deviceWidth = OHTML.getBoundingClientRect().width || OHTML.clientWidth;

    OHTML.dataset.dpr = window.devicePixelRatio;
    OHTML.style.fontSize = `${deviceWidth / initialRem}px`;

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

  // 交互方法
  // 1. 返回键
  // 2. 录音
  // 3. 网络状态

};
