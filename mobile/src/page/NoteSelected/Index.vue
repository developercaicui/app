<template lang="html">

	<div>
		<Ipad v-if="isIpad" :selectedData="selectedData"></Ipad>
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
    }
  },

	created() {

		this.webApi.loadingData();
		this.userInfo = JSON.parse(this.webApi.getCookie('userInfo') || {});

		this.$store.commit('updateNoteSelectedListP', {
			token: this.userInfo.token
		});

		this.$store.dispatch('fetchNewNoteList');

	},

	computed: {

		isIpad() {
			return this.$store.getters.getDeviceInfo.isIpad;
		},

		isMobile() {
			return this.$store.getters.getDeviceInfo.isMobile;
		},

		selectedData() {
		  return this.$store.getters.getNoteSelectedList;
		}

	},

  methods: {

  }

}

</script>

<style lang="scss" scoped>

</style>
