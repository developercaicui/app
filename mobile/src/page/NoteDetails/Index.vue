<template lang="html">

	<div>
		<Ipad v-if="isIpad" :data="data" @remove-details="removeDetails" :details-data="detailsData"></Ipad>
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
			data: {}
    }
  },

	created() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;

		// 传递过来的值
		this.data = JSON.parse(this.$route.params.data);


		this.webApi.loadingData();


		getNoteDetails({
		  id: this.data.sectionData.id,
		  token: this.webApi.getCookie('token')
		})

		.then(res =>{

			this.webApi.closeLoadingData();


			if(!res || res.state != 'success'){
				this.webApi.alert('网络异常，请稍后再试');
				return false;
			}


			let date = new Date(res.data.updateTime*1000);

			res.data.updateTime = `${date.getFullYear()}-${this.webApi.isSmallTen(date.getMonth())}-${this.webApi.isSmallTen(date.getDate())}  ${this.webApi.isSmallTen(date.getHours())}:${this.webApi.isSmallTen(date.getMinutes())}  ${res.data.nikeName}`;

			res.data.imgPath =  res.data.imgPath ? res.data.imgPath.split(',') : [];
			res.data.imgPath = res.data.imgPath.filter(isNormal);
			res.data.picAllPath = res.data.imgPath;
			res.data.imgPath = res.data.imgPath.map(item => `background: url(${this.webApi.cdnImgUrl}${item}) center center no-repeat;`)
			res.data.imgPath = res.data.imgPath.filter(item => item.includes('upload'));
			res.data.picList = res.data.imgPath.map(item => item.replace(/^.+\((.+)\).+$/g, '$1'));

			this.data.detailsData = this.detailsData = res.data;

		})

		function isNormal(item) {
			if(item) return item;
		}


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
