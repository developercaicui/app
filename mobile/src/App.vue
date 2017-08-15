<template lang="html">

  <transition name="fade" mode="out-in">
    <div>
      <NavIpad v-show="isIpad"></NavIpad>
      <NavMobile v-show="isMobile"></NavMobile>
      <router-view></router-view>
    </div>
 </transition>

</template>

<script>

import Loading from './components/Comm/Loading';
import NavIpad from './components/Nav/Mobile/';
import NavMobile from './components/Nav/Ipad';

export default {

  components: {
    Loading,
    NavMobile,
    NavIpad
  },


  data() {
    return {
      isIpad: false,
      isMobile: false
    }
  },

  created() {

    let oHtml = document.documentElement;

    oHtml.dataset.device = this.webApi.getDeviceType();


    // 菜单处理
    switch(oHtml.dataset.device) {
        case 'ipad':
          this.isIpad = false;
          this.isMobile = true;
          oHtml.dataset.isipad = false;
          oHtml.dataset.ismobile = true;
          break;
        case 'mobile':
          this.isIpad = true;
          this.isMobile = false;
          oHtml.dataset.isipad = true;
          oHtml.dataset.ismobile = false;
          break;
    }

    // rem计算
    this.webApi.remCount();

    // 屏幕旋转监听（全局）
    window.addEventListener("orientationchange", ev => this.webApi.remCount(), false);
    window.addEventListener("resize", ev => this.webApi.remCount(), false);

    // 更新值
    this.$store.commit('updateDeviceInfo', {
      type: oHtml.dataset.device,
      isIpad: this.isIpad,
      isMobile: this.isMobile
    });

    // 3秒后跳到首页
    setTimeout(() =>{
      this.$router.push({
        path: 'index'
      });
    },3000);

  },

  methods: {

  }

}

</script>
<style lang="scss">

 @import "./assets/style/reset";

</style>
