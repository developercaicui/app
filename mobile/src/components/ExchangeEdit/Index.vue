<template lang="html">

	<div class="exchangeEdit">
		
		<Ipad v-if="isIpad" :exchange-edit-data="exchangeEditData" @isShow="isShow" @submit-data="submitData" @upload-pic="uploadPic"></Ipad>
		<Mobile v-if="isMobile"></Mobile>
	</div>

</template>

<script>

import Ipad from './Ipad';
import Mobile from './Mobile';
import { newExchange, fileUpload } from '../../api/port';

export default {
	props: {
    exchangeEditData: {
      type: Object,
      default: {}
    }
	},
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
  	isShow (bool){
			this.$emit('isShow',bool);
		},
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


		// 新建交流
		submitData(data) {

			this.webApi.loadingData('新建中');

			newExchange(data.data)

			.then(res =>{

				this.webApi.closeLoadingData();

					if(!res || res.state != 'success'){
						this.webApi.alert(`新建失败，请稍后再试！`);
						return false;
					}

					this.webApi.alert(`新建成功`, 1500);

					setTimeout(()=>{
						if(data.elseType == 'video' || data.elseType == 'problem') {

							// g.closeNewNote();
							this.$emit('isShow',false);
						}else{

							if(document.referrer.includes('courseexchange/list')) {

								this.$router.push(`/courseexchange/list`);

							}else{

								this.webApi.setCookie('updateExchangeList', 'true');
								this.$router.push(`/exchange/list`);

							}


						}
					}, 1000)





			});

		},

  }

}

</script>

<style lang="scss" scoped>
	.exchangeEdit{
		position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
	}

</style>
