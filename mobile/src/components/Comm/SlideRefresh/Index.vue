<template lang="html">

	<div class="slide-refresh-wrap">
	</div>

</template>

<script>


export default {

	components: {
  },

  data() {
    return {
			isIpad: false,
      isMobile: false,
    }
  },

	created() {

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
