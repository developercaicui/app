<template lang="html">

	<div>
		<Ipad v-if="isIpad" @submit-data="submitData" @upload-pic="uploadPic"></Ipad>
		<Mobile v-if="isMobile"></Mobile>
	</div>

</template>

<script>

import Ipad from './Ipad';
import Mobile from './Mobile';
import { newExchange, fileUpload } from '../../api/port';

export default {

	components: {
		Mobile,
		Ipad,
  },

  data() {
    return {
			isIpad: false,
      isMobile: false
    }
  },

	created() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;


	},


  methods: {

		// 上传照片
		uploadPic(data, callback) {

			this.webApi.loadingData('新建中');

			fileUpload(data)

			.then(res =>{

				this.webApi.closeLoadingData();

				if(!res || res.state != 'success'){
					this.webApi.alert('图片上传失败');
					return false;
				}

				callback(res.data);

			});

		},


		// 新建交流
		submitData(data) {

			this.webApi.loadingData('新建中');

			newExchange(data.data)

			.then(res =>{

				this.webApi.closeLoadingData();

					if(!res || res.state != 'success'){
						this.webApi.alert(`${tip}失败，请稍后再试！`);
						return false;
					}

					this.webApi.alert(`${tip}成功, 即将跳转到列表页`, 1500);

					setTimeout(()=>{
						this.$router.push({
							path: `/exchange/list`
						});
					},1000);

			});

		},

  }

}

</script>

<style lang="scss" scoped>

</style>
