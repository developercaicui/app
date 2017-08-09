
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

};
