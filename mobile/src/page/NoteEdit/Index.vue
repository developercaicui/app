<template lang="html">

	<div>
		<Ipad v-if="isIpad" @submit-data="submitData" @upload-pic="uploadPic"></Ipad>
		<Mobile v-if="isMobile"></Mobile>
	</div>

</template>

<script>

import Ipad from './Ipad';
import Mobile from './Mobile';
import { fileUpload, saveNote } from '../../api/port';

export default {

	components: {
		Mobile,
		Ipad,
  },

  data() {
    return {
			isIpad: false,
      isMobile: false,
    }
  },

	created() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;

	},


  methods: {


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


		submitData(data) {

			let tip = data.type == 'new' ? '新建' : '编辑';

			this.webApi.loadingData(`${tip}中`);

			// 保存数据
			saveNote(data.data)

			.then(res =>{

				this.webApi.closeLoadingData();

					if(!res || res.state != 'success'){
						this.webApi.alert(`${tip}笔记失败，请稍后再试！`);
						return false;
					}

					this.webApi.alert(`${tip}笔记成功, `, 1500);

						setTimeout(() =>{
							if(data.elseType == 'video' || data.elseType == 'problem') {

								g.closeNewNote();

							}else{

								if(document.referrer.includes('coursenote/list')) {
									this.$router.push(`/coursenote/list`);
								}else{
									this.webApi.setCookie('updateNoteList', 'true');
									this.$router.push(`/note/list`);
								}


							}
						 }, 1000)
			})

		},

  }

}

</script>

<style lang="scss" scoped>

</style>
