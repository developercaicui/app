<template lang="html">

  <div>
    <NavIpad v-show="isIpad"></NavIpad>
    <NavMobile v-show="isMobile"></NavMobile>
    <router-view></router-view>
  </div>

</template>

<script>

import NavIpad from '../../components/Nav/Mobile/';
import NavMobile from '../../components/Nav/Ipad';

export default {

  components: {
    NavIpad,
    NavMobile
  },

  data() {
    return {
      isIpad: false,
      isMobile: false
    }
  },

  created() {

    let hashName = 'login';
    let oHtml = document.documentElement;

    // 初始是否登录处理
    if(this.webApi.isLogin()) hashName = 'index';

    this.$router.push({
       path: hashName
    });



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

    // 屏幕旋转监听（全局）
    window.addEventListener("orientationchange", ev => this.webApi.remCount(), false);
    window.addEventListener("resize", ev => this.webApi.remCount(), false);

  },



}

</script>

<style scoped lang="scss">
</style>
