<template lang="html">

	<div>
		<Ipad v-if="isIpad" :selectedData="selectedData"></Ipad>
		<Mobile v-if="isMobile"></Mobile>
	</div>

</template>

<script>

import Ipad from './Ipad';
import Mobile from './Mobile';
import { getNewNoteList } from '../../api/port';

export default {

	components: {
		Mobile,
		Ipad,
  },

  data() {
    return {
			isIpad: false,
      isMobile: false,
			selectedData: {},
    }
  },

	created() {
	  this.webApi.loadingData()
	},

	mounted() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;

		getNewNoteList({
			token: this.webApi.getCookie('token'),
			pageSize: 20,
			pageNo: 1,
		})

		.then(res =>{

			this.webApi.closeLoadingData();

			if(!res || res.state != 'success'){
				this.webApi.alert('获取列表失败，请稍后再试');
				return false;
			}

			this.selectedData = res.data;

		})


	},


  methods: {

  }

}

</script>

<style lang="scss" scoped>

</style>
