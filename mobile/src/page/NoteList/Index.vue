<template lang="html">

	<div>
		<Ipad v-if="isIpad" @fetch-list="fetchList" :sectionList="list"></Ipad>
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
			sectionList: [],
			userInfo: {},
    }
  },

	computed: {

		isIpad() {
			return this.$store.getters.getDeviceInfo.isIpad;
		},

		isMobile() {
			return this.$store.getters.getDeviceInfo.isMobile;
		},

		list() {
			return this.$store.getters.getNoteList || [];
		},
	},

	created() {

		this.userInfo = JSON.parse(this.webApi.getCookie('userInfo') || {})

		if(this.list.length == 0) this.fetchList();
<<<<<<< HEAD

=======
		if(this.webApi.getCookie('updateNoteList') === 'true') this.fetchList();
>>>>>>> dev

	},


  methods: {

		// 获取列表
		fetchList() {

			this.webApi.setCookie('updateNoteList', 'false');

			this.webApi.loadingData();

			this.$store.commit('updateNoteListParams', {
					token: this.userInfo.token,
					self: 1,
			});

			this.$store.dispatch('fetchNoteList');
		},

  }

}

</script>

<style lang="scss" scoped>

</style>
