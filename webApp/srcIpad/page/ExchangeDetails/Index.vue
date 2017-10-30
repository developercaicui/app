<template lang="html">

	<div>
		<Ipad ref="ipad" v-if="isIpad" :userInfo="userInfo" @upload-pic="uploadPic" @reply="reply" @remove-details="removeDetails"></Ipad>
		<Mobile v-if="isMobile"></Mobile>
	</div>

</template>

<script>

import Ipad from './Ipad';
import Mobile from './Mobile';
import {
	removeExchangeDetails,
	exchangeReply,
	fileUpload,
} from '../../api/port'

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
			detailsData: {},
    }
  },

	created() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;

		this.userInfo = JSON.parse(this.webApi.getCookie('userInfo') || {});


	},

  mounted() {

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

				callback(res.data[0]);

			});

		},

		// 回复
		reply(data) {

			this.webApi.loadingData('回复中');

			exchangeReply(data)

			.then(res =>{

				this.webApi.closeLoadingData();

				if(!res || res.state != 'success'){
					this.webApi.alert('回复失败，请稍后重试');
					return false;
				}

				this.$refs.ipad.getDetails(this.$refs.ipad.dataParams.id);

				// 清空评论数据
				this.$refs.ipad.textDetails = '';
				this.$refs.ipad.allPicPath = '';
				this.$refs.ipad.allUploadPic = [];

				this.webApi.alert('评论成功');

			})

		},

		// 删除讨论详请
		removeDetails(data) {


			this.webApi.loadingData();

			removeExchangeDetails({
				verTT: new Date().getTime(),
				token: this.webApi.getCookie('token'),
				id: data.id,
				type: 0
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
						this.$router.go(-1);
					}, 1000);

				}


			})

		},

  }

}

</script>

<style lang="scss" scoped>

</style>
