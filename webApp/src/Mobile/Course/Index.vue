<template lang="html">

	<div>
		<courseIpad v-if="isIpad"></courseIpad>
		<courseMobile v-if="isMobile"></courseMobile>
	</div>

</template>

<script>

import courseIpad from './Ipad';
import courseMobile from './Mobile';

export default {

	components: {
		courseMobile,
		courseIpad,
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

  },
  mounted () {

  }
}

</script>

<style lang="scss" scoped>

</style>
