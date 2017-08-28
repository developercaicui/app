<template lang="html">

	<div>
		<Ipad v-if="isIpad" :exchange-data="exchangeData" @get-list="getList"></Ipad>
		<Mobile v-if="isMobile"></Mobile>
	</div>

</template>

<script>

import Ipad from './Ipad';
import Mobile from './Mobile';
import { getExchangeList } from '../../api/port';

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


	created() {

		this.getList({
			pageNo: 1
		})

	},


	mounted() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;

	},


  methods: {

		getList(data) {


			this.webApi.loadingData();

			// 获取我的交流列表
			getExchangeList({
				verTT: new Date().getTime(),
				token: this.webApi.getCookie('token'),
				type: 3,
				subjectId: "",
				keyWords:  "",
				self: 1,
				ordertype: 1,
				pageNo: data.pageNo,
				pageSize: 10,
			})

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

					item.updateTime = `${date.getFullYear()}-${this.webApi.isSmallTen(date.getMonth())}-${this.webApi.isSmallTen(date.getDate())}  ${this.webApi.isSmallTen(date.getHours())}:${this.webApi.isSmallTen(date.getMinutes())}`;

				});


			})

		},


  }

}

</script>

<style lang="scss" scoped>

</style>
