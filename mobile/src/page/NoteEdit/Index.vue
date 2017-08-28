<template lang="html">

	<div>
		<Ipad v-show="isIpad"></Ipad>
		<Mobile v-show="isMobile"></Mobile>
	</div>

</template>

<script>

import Ipad from './Ipad';
import Mobile from './Mobile';

export default {

	components: {
		Mobile,
		Ipad,
  },

  data() {
    return {
			isIpad: false,
      isMobile: false
    }
  },

	created() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;


	},


  methods: {

  }

}

</script>

<style lang="scss" scoped>

</style>
