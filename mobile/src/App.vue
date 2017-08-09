<template lang="html">

  <transition name="fade" mode="out-in">
   <div :is="currentView"></div>
 </transition>

</template>

<script>

import Home from './page/Home/';
import Loading from './components/Comm/Loading';

export default {

  components: {
    Home,
    Loading
  },


  data() {
    return {
      currentView: 'Loading',
    }
  },

  mounted() {

    this.$nextTick(() => {

      this.webApi.remCount();

      // 预加载处理
      setTimeout(() => {
        this.currentView = 'Home';
      },1500);

    });

  },

  methods: {

  }

}

</script>
<style lang="scss" scoped>

</style>
