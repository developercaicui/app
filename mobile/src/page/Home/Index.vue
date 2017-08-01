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

  methods: {
  }

}

</script>

<style scoped lang="scss">

</style>
