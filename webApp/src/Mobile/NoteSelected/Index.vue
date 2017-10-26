<template lang="html">

	<div>
		<Ipad v-if="isIpad" @fetch-list="fetchList" :selectedData="selectedData"></Ipad>
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


		this.userInfo = JSON.parse(this.webApi.getCookie('userInfo') || {});

		if(!this.selectedData.courselist) this.fetchList()

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

		fetchList() {

			this.webApi.loadingData();

			this.$store.commit('updateNoteSelectedListP', {
				token: this.userInfo.token
			});

			this.$store.dispatch('fetchNewNoteList');

		}

  }

}

</script>

<style lang="scss" scoped>

</style>
