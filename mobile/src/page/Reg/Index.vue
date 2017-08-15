<template lang="html">

	<div>
		<regIpad v-show="isIpad"></regIpad>
		<regMobile v-show="isMobile"></regMobile>
	</div>

</template>

<script>

import regIpad from './Ipad';
import regMobile from './Mobile';

export default {

	components: {
		regMobile,
		regIpad,
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
