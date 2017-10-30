
// 引用ipad内，部分封装的api
import IpadApi from 'IpadApi/api';

const api  = {

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
      return process.env.DEVICE_TYPE || this.getCookie('deviceType') || 'null';
    },

  /**
    * rem换算
    */
    remCount() {

      const OHTML = document.documentElement;
      const screenWidth = OHTML.clientWidth || OHTML.getBoundingClientRect().width;

      let designWidth = 750;
      let initialRem = designWidth / 100;

      OHTML.dataset.device = this.getDeviceType();
      OHTML.dataset.dpr = window.devicePixelRatio;
      OHTML.style.fontSize = `${screenWidth / initialRem}px`;

    },

};


export default Object.assign(IpadApi, api);
