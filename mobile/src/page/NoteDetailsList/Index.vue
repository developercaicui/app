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
			detailsList: []
    }
  },

	created() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;


		this.webApi.loadingData();


		getNoteDetailsList({
		  pageNo: 1,
		  pageSize: 20,
		  charpterid: this.$route.query.id,
		  ordertype: 1,
		  self: 1,
		  token: this.webApi.getCookie('token')
		})

		.then(res =>{

			if(!res || res.state != 'success'){
				this.webApi.alert('网络异常，请稍后再试');
				return false;
			}


			this.detailsList = res.data;

			this.detailsList.map(item =>{

				let date = new Date(item.updateTime*1000);

				item.updateTime = `${date.getFullYear()}-${this.webApi.isSmallTen(date.getMonth())}-${this.webApi.isSmallTen(date.getDate())}  ${this.webApi.isSmallTen(date.getHours())}:${this.webApi.isSmallTen(date.getMinutes())}`;

			});

			this.webApi.closeLoadingData();


		})

	},


  methods: {

  }

}

</script>

<style lang="scss" scoped>

</style>
