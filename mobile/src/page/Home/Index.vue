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


      let hashName = 'login';

      if(this.webApi.isLogin()) hashName = 'index';

      this.$router.push({
         path: hashName
      });


    });

  },

  methods: {

  }

}

</script>

<style scoped lang="scss">
 // 无需CSS
</style>
