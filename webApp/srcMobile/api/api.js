
import IpadApi from 'IpadApi/api';
import a from './common'

const api  = {

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
