<template lang="html">

	<div>
		<Ipad v-if="isIpad" :exchange-data="exchangeData" @open-details="openDetails" @get-list="getList"></Ipad>
		<Mobile v-if="isMobile"></Mobile>
	</div>

</template>

<script>

import Ipad from './Ipad';
import Mobile from './Mobile';
import { getExchangeList, getExchangeDetails } from '../../api/port';

export default {

	components: {
		Mobile,
		Ipad,
  },

  data() {
    return {
			isIpad: false,
      isMobile: false,
			exchangeData: {},
    }
  },


	mounted() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;

		this.getList({
			verTT: new Date().getTime(),
			token: this.webApi.getCookie('token'),
		  self: '1',
		  pageNo: 1,
		  pageSize: 15,
		  type:	3,
		  ordertype: 1,  // 1:是发帖时间    2:是最新回复    3是回复数量     4:是精华讨论
		});

	},


  methods: {


		// 打开详情
		openDetails(id) {


			this.webApi.loadingData();

			getExchangeDetails({
				verTT: new Date().getTime(),
				token: this.webApi.getCookie('token'),
				id: id,
				pageNo: 1,
				pageSize: 20,
			})

			.then(res =>{

				this.webApi.closeLoadingData();

				if(!res || res.state != 'success'){
					this.webApi.alert('打开详情失败，请稍后再试');
					return false;
				}

				this.$router.push({
					path: `/exchange/details/${encodeURIComponent(JSON.stringify(res.data))}`,
				});

			})


		},

		// 获取我的交流列表
		getList(data) {


			this.webApi.loadingData();

			getExchangeList(data)

			.then(res =>{

				this.webApi.closeLoadingData();

				if(!res || res.state != 'success'){
					this.webApi.alert('获取列表失败，请稍后再试');
					return false;
				}

				this.exchangeData = {
					list: res.data,
					totalCount: res.totalCount
				};
				
				this.exchangeData.list.map(item =>{

					let date = new Date(item.updateTime*1000);

					item.contentHtml = item.contentHtml.replace(/(.+)src="(.+)"(.+)/g,`$1 src="${this.webApi.cdnImgUrl}$2"$3`);
					item.updateTime = `${date.getFullYear()}-${this.webApi.isSmallTen(date.getMonth())}-${this.webApi.isSmallTen(date.getDate())}  ${this.webApi.isSmallTen(date.getHours())}:${this.webApi.isSmallTen(date.getMinutes())}`;

				});


			})

		},


  }

}

</script>

<style lang="scss" scoped>

</style>
