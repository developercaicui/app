<template lang="html">

	<div>
		<settingIpad v-show="isIpad"></settingIpad>
		<settingMobile v-show="isMobile"></settingMobile>
	</div>

</template>

<script>

import $ from './jquery.min.js';
import settingIpad from './Ipad';
import settingMobile from './Mobile';

export default {

	components: {
		settingMobile,
		settingIpad,
  	},

	data() {
	    return {
			isIpad: false,
	  		isMobile: false,
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
