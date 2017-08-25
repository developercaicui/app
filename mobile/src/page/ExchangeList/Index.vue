<template lang="html">

	<div>
		<findPwdIpad v-if="isIpad"></findPwdIpad>
		<findPwdMobile v-if="isMobile"></findPwdMobile>
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

	mounted() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;




	},


  methods: {

  }

}

</script>

<style lang="scss" scoped>

</style>
