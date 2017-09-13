<template lang="html">

	<div>
		<Ipad v-if="isIpad" :section-list="list"></Ipad>
		<Mobile v-if="isMobile"></Mobile>
	</div>

</template>

<script>

import Ipad from './Ipad';
import Mobile from './Mobile';

export default {

	components: {
		Mobile,
		Ipad,
  },

  data() {
    return {
			isIpad: false,
      isMobile: false,
			sectionList: [],
			userInfo: {},
    }
  },

	computed: {
		list() {
			return this.$store.getters.getList;
		},
	},

	created() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;

		this.userInfo = JSON.parse(this.webApi.getCookie('userInfo') || {})

		this.fetchList();

	},


  methods: {

		// 获取列表
		fetchList() {

			this.webApi.loadingData();

			this.$store.commit('updateParams', {
					token: this.userInfo.token,
					self: 1,
			});

			this.$store.dispatch('fetchList');
		},

  }

}

</script>

<style lang="scss" scoped>

</style>
