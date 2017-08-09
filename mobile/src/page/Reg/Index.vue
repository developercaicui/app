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
