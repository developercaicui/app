<template lang="html">

	<div>
		<Ipad v-if="isIpad" :section-list="sectionList"></Ipad>
		<Mobile v-if="isMobile"></Mobile>
	</div>

</template>

<script>

import Ipad from './Ipad';
import Mobile from './Mobile';
import { getNoteList } from '../../api/port';

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
    }
  },

	created() {
	  this.webApi.loadingData()
	},

	mounted() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;

		getNoteList({
			token: this.webApi.getCookie('token'),
			self: 1
		})

		.then(res =>{

			this.webApi.closeLoadingData();

			if(!res || res.state != 'success'){
				this.webApi.alert('获取列表失败，请稍后再试');
				return false;
			}

			this.sectionList = res.data;

		})


	},


  methods: {

  }

}

</script>

<style lang="scss" scoped>

</style>
