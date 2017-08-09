<template lang="html">

	<div>
		<indexIpad v-show="isIpad"></indexIpad>
		<indexMobile v-show="isMobile"></indexMobile>
	</div>

</template>

<script>

import indexIpad from './Ipad';
import indexMobile from './Mobile';

export default {

	components: {
		indexMobile,
		indexIpad,
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
