<template lang="html">

	<div>
		<msgIpad v-if="isIpad"></msgIpad>
		<msgMobile v-if="isMobile"></msgMobile>
	</div>

</template>

<script>

import msgIpad from './Ipad';
import msgMobile from './Mobile';

export default {

	components: {
		msgMobile,
		msgIpad,
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
