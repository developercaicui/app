


export default {

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

    let initialRem = 750 / 100;  // 换算基准值   750(设计稿尺寸)/100(固定值)
    let deviceWidth = OHTML.getBoundingClientRect().width || OHTML.clientWidth;

    OHTML.style.fontSize = `${deviceWidth / initialRem}px`;

  },

};
