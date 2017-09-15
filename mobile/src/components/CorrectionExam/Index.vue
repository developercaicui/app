<template lang="html">

	<div>
		<settingIpad v-show="isIpad" :correctionData="correctionData" @isShow="isShow"></settingIpad>
		<settingMobile v-show="isMobile"></settingMobile>
	</div>

</template>

<script>

import settingIpad from './Ipad';
import settingMobile from './Mobile';

export default {
	props: {
      correctionData: {
          type: Object,
          default: {}
      }
  	},
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
		isShow (bool){
			console.log(bool)
			this.$emit('isShow',bool);
		}
	}

}

</script>

<style lang="scss" scoped>
</style>
