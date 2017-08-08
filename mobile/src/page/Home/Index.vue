<template lang="html">

  <div>
    <Navs></Navs>
    <Headers></Headers>
    <router-view></router-view>
  </div>


</template>

<script>

import Headers from '../../components/Header';
import Navs from '../../components/Nav';

export default {

  components: {
    Navs,
    Headers
  },

  data() {
    return {
    }
  },

  mounted() {

    this.$nextTick(() => {

      // 做完判断处理后跳转
      this.$router.push({
         path: 'login'
      })

    });

  },

  methods: {
  }

}

</script>

<style scoped lang="scss">
 // 无需CSS
</style>
