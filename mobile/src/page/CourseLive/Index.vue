<template lang="html">
	<router-view></router-view>
</template>

<script>

export default {

	components: {
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

  }

}

</script>

<style lang="scss" scoped>

</style>
