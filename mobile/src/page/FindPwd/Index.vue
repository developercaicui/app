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

		this.isIpad = this.$store.getters.getDeviceInfo.isipad == 'false' ? true : false ;
		this.isMobile = this.$store.getters.getDeviceInfo.ismobile == 'false' ? true : false ;

	},


  methods: {

  }

}

</script>

<style lang="scss" scoped>

</style>
