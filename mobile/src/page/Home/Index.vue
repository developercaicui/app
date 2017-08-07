<template lang="html">

  <div>

    <Headers></Headers>

    <main>
      <router-view></router-view>
    </main>

    <Footers></Footers>

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

      // 临时跳转
      this.$router.push({
         path: 'reg'
      })

    });

  },

  methods: {
  }

}

</script>

<style scoped lang="scss">

</style>
