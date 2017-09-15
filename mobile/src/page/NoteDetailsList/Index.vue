<template lang="html">

	<div>
		<Ipad :details-list="detailsList" v-if="isIpad"></Ipad>
		<Mobile v-if="isMobile"></Mobile>
	</div>

</template>

<script>

import Ipad from './Ipad';
import Mobile from './Mobile';
import { getNoteDetailsList } from '../../api/port';

export default {

	components: {
		Mobile,
		Ipad,
  },

  data() {
    return {
			isIpad: false,
      isMobile: false,
			userInfo: {},
			routerData: {}
    }
  },

	created() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;

		this.userInfo = JSON.parse(this.webApi.getCookie('userInfo') || {});
		this.routerData = JSON.parse(this.$route.params.data || {});

		this.fetchDetailsList();

	},

	computed: {

		detailsList() {

			let list = this.$store.getters.getDetailsList;

			list.map(item =>{
				let date = new Date(item.updateTime*1000);
				item.updateTime = `${date.getFullYear()}-${this.webApi.isSmallTen(date.getMonth())}-${this.webApi.isSmallTen(date.getDate())}  ${this.webApi.isSmallTen(date.getHours())}:${this.webApi.isSmallTen(date.getMinutes())}`;
			});

			return list;
		},

	},

  methods: {

		// 详情列表
		fetchDetailsList() {

			this.webApi.loadingData();

			this.$store.commit('updateDetailsParams', {
				  pageNo: 1,
				  pageSize: 20,
				  charpterid: this.routerData.courseData.id,
				  ordertype: 1,
				  self: this.routerData.self,
				  token: this.userInfo.token
			});

			this.$store.dispatch('fetchNoteDetailsList');

		},

  }

}

</script>

<style lang="scss" scoped>

</style>
