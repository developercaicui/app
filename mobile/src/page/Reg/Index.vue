<template lang="html">

	<main>{{tip}}</main>

</template>

<script>

export default {

  data() {
    return {
			tip: 'regs'
    }
  },

  methods: {

  }

}

</script>

<style lang="scss" scoped>

	@media screen and (max-width: 768px) {
		@import "../../assets/style/mobile/reg";
	}

	@media screen and (min-width: 769px) {
		 @import "../../assets/style/ipad/reg";
	}

</style>
