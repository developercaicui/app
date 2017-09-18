<template lang="html">

	<div>
		<Ipad v-if="isIpad" :exchangeData="exchangeData" @open-details="openDetails"></Ipad>
		<Mobile v-if="isMobile"></Mobile>
	</div>

</template>

<script>

import Ipad from './Ipad';
import Mobile from './Mobile';
import { getExchangeLis } from '../../api/port';

export default {

	components: {
		Mobile,
		Ipad,
  },

  data() {
    return {
			isIpad: false,
      isMobile: false,
			userInfo: {}
    }
  },


	mounted() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;

		this.userInfo = JSON.parse(this.webApi.getCookie('userInfo'));

		this.webApi.loadingData();


		this.$store.commit('updateExchangeListP', {
			token: this.userInfo.token
		});

		this.$store.dispatch('fetchExchangeList');

	},

	computed: {

		exchangeData() {
			return this.$store.getters.getExchangeList;
		}

	},



  methods: {


		// 打开详情
		openDetails(id) {

			this.$router.push({
				path: `/exchange/details/${encodeURIComponent(JSON.stringify({id: id}))}`,
			});

		},


  }

}

</script>

<style lang="scss" scoped>

</style>
