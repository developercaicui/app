<template lang="html">

  <div>
    <Headers></Headers>
    <router-view></router-view>
  </div>


</template>

<script>

import Headers from '../../components/Header';
import Footers from '../../components/Footer';

export default {

  components: {
    Footers,
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
         path: 'index'
      })

    });

  },

  methods: {
  }

}

</script>

<style scoped lang="scss">

</style>
