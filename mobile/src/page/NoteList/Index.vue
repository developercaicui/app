<template lang="html">

	<div>
		<findPwdIpad v-if="isIpad"></findPwdIpad>
		<findPwdMobile v-if="isMobile"></findPwdMobile>
	</div>

</template>

<script>

import findPwdIpad from './Ipad';
import findPwdMobile from './Mobile';
import { getNoteList } from '../../api/port';
import $ from "jquery";

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

		console.log($)
		// getNoteList({
		// 	token: this.webApi.getCookie('token'),
		// 	self: 1
		// })
		//
		// .then(res =>{
		//
		// 	// res.filter(item => item.)
		// 	console.log(res);
		//
		// })


	},


  methods: {

  }

}

</script>

<style lang="scss" scoped>

</style>
