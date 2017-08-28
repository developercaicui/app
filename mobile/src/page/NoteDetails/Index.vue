<template lang="html">

	<div>
		<Ipad v-if="isIpad" @remove-details="removeDetails" :details-data="detailsData"></Ipad>
		<Mobile v-if="isMobile"></Mobile>
	</div>

</template>

<script>

import Ipad from './Ipad';
import Mobile from './Mobile';
import { getNoteDetails, removeNoteDetails } from '../../api/port';

export default {

	components: {
		Ipad,
		Mobile,
  },

  data() {
    return {
			isIpad: false,
      isMobile: false,
			detailsData: [],
    }
  },

	created() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;


		this.webApi.loadingData();


		getNoteDetails({
		  id: this.$route.query.id,
		  token: this.webApi.getCookie('token')
		})

		.then(res =>{

			if(!res || res.state != 'success'){
				this.webApi.alert('网络异常，请稍后再试');
				return false;
			}


			let date = new Date(res.data.updateTime*1000);

			res.data.updateTime = `${date.getFullYear()}-${this.webApi.isSmallTen(date.getMonth())}-${this.webApi.isSmallTen(date.getDate())}  ${this.webApi.isSmallTen(date.getHours())}:${this.webApi.isSmallTen(date.getMinutes())}  ${res.data.nikeName}`;

			this.detailsData = res.data;


			this.webApi.closeLoadingData();


		})


	},


  methods: {

		// 删除文章详情
		removeDetails(data) {


			this.webApi.loadingData('删除中', { css: 'top: 30%;' });

			removeNoteDetails({
				id: data.id,
			  token: this.webApi.getCookie('token'),
				type: "note",
			})

			.then(res =>{

				this.webApi.closeLoadingData();

				if(!res || res.state != 'success'){
					this.webApi.alert('删除失败');
					return false;
				}

				if(res.state == 'success'){


					this.webApi.alert('删除成功, 即将自动跳转到列表页', 1500);

					setTimeout(() =>{
						this.$router.go(-2);
					}, 1000);

				}

			})

		},
  }

}

</script>

<style lang="scss" scoped>

</style>
