
import IpadApi from 'IpadApi/api';

const api  = {

  /**
    * rem换算
    */
    remCount() {

      const OHTML = document.documentElement;
      const screenWidth =OHTML.getBoundingClientRect().width || OHTML.clientWidth;
      const screenHeight = OHTML.getBoundingClientRect().height || OHTML.clientHeiht;

      let designWidth = 750;
      let initialRem = designWidth / 100;

      OHTML.dataset.device = this.getDeviceType();
      OHTML.dataset.dpr = window.devicePixelRatio;
      OHTML.style.fontSize = `${screenWidth / initialRem}px`;

      if(screenWidth > screenHeight) OHTML.style.fontSize = `${parseInt(getComputedStyle(OHTML, null)['fontSize'])/2}px`;

    },

    /**
      * 获取当前设备类型（ipad || mobile）
      * @return {String} 设备类型
      */
    getDeviceType: () => process.env.DEVICE_TYPE || this.getCookie('deviceType') || 'null',

    /**
      * 获取对象类型， 例如[object Array]
      * @return { String } 设备类型
      */
    getObjectType: (type = undefined) => Object.prototype.toString.apply(type),

    /**
      * Response对象过滤
      * @type   { Object } 对象
      * @return { Object } 对象
      */
    resManage(res) {

      const newRes = {
        code: 1,
        data: [],
        state: 'error',
        msg: '数据异常，请稍后再试！',
      };

      if(!this.getObjectType(res).includes('object Object')) return newRes;

    },

    /**
     * 关闭数据加载load动画
     */
    closeLoadingData() {
      document.querySelector('#dataLoading') && document.body.removeChild(document.querySelector('#dataLoading'));
    },

};


export default Object.assign(IpadApi, api);
