<template lang="html">

	<div>
		<findPwdIpad v-show="isIpad"></findPwdIpad>
		<findPwdMobile v-show="isMobile"></findPwdMobile>
	</div>

</template>

<script>

import findPwdIpad from './Ipad';
import findPwdMobile from './Mobile';

export default {

	components: {
		findPwdMobile,
		findPwdIpad,
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
