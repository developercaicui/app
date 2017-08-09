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

		let oHtml = document.documentElement;

		this.isIpad = oHtml.dataset.isipad == 'false' ? true : false ;
		this.isMobile = oHtml.dataset.ismobile == 'false' ? true : false ;

	},


  methods: {

  }

}

</script>

<style lang="scss" scoped>

</style>
