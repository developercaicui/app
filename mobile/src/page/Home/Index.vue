<template lang="html">

  <div>
    <Navs></Navs>
    <router-view></router-view>
  </div>


</template>

<script>

import Navs from '../../components/Nav';

export default {

  components: {
    Navs
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
 // 无需CSS
</style>
