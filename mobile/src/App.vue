<template lang="html">

  <transition name="fade" mode="out-in">
   <div :is="currentView"></div>
 </transition>

</template>

<script>

import Home from './page/Home/';
import Loading from './page/Loading/';

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

      setTimeout(() => {
        this.currentView = 'Home';
      },1000);

    });

  },

  methods: {

  }

}

</script>
<style lang="scss" scoped>

</style>
