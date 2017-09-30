<template lang="html">

	<div class="edit-me-head-wrap last-step">
		<header class="reg-head">
			<a href="javascript:;" class="back" @click="handleBack">&#xe669;</a>
			<h1>基本信息</h1>
		</header>
		<main :class="isMobile?'reg-info reg-info-mobile':'reg-info'" :style="isMobile?'width:85%':''">
			<div class="upload-img" ref="uploadImgBtn" @touchend.prevent="uploadFile"></div>
			<label>
				<input type="text" v-model="nickName" placeholder="用户名">
				<span>可用于登录</span>
			</label>
			<a href="javascript:;" class="sub-ref-info last-sub-ref-info" @touchend.prevent="updateUserInfo">保存</a>
		</main>
			<input type="file" name="" accept="image/png,image/gif,image/jpeg" @change="changeFile" ref="fileIpt" class="upload-img-ipt"/>
	</div>


</template>

<script>

import { changeUserName, uploadFile } from '../../api/port';

export default {

  data() {
    return {
			isMobile: false,
			nickName: '',
			isChangeNickName: false,
			isChangeHead: false,
			userInfo: {},
			updateState: true,
			newUserInfo: {},
    }
  },

	created() {

		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;
		this.userInfo = JSON.parse(this.webApi.getCookie('userInfo') || {});

		this.nickName = this.userInfo.nickName;

		this.webApi.remCount();

		window.addEventListener("storage", function (e) {
        window.location.reload();
    });

	},

	mounted() {

		this.$refs.uploadImgBtn.style.cssText = `
			 background:url(${this.webApi.cdnImgUrl}${this.userInfo.avatar}) center center no-repeat;
		`;



	},

	watch: {
		nickName(val) {
			if(this.nickName !== this.userInfo.nickName) this.isChangeNickName = true;
		}
	},

	methods:{

		// 返回上级
		handleBack() {
			this.$router.go(-1);
		},

		// 触发上传按钮
		uploadFile() {
			this.$refs.fileIpt.click();
		},

		// 文件选择
		changeFile(ev) {

			let file = ev.target.files[0];
			let reader = new FileReader();

			this.isChangeHead = true;

			reader.readAsDataURL(file);

			reader.onload = (evt) =>{
        this.$refs.uploadImgBtn.style.cssText = `
				   background:url(${evt.target.result}) center center no-repeat;
				`;
      }

		},

		// 更新用户信息
		updateUserInfo() {

			let formData = new FormData();
			let file = this.$refs.fileIpt.files[0];

			this.webApi.loadingData('更新中');

			if(!this.isChangeHead && !this.isChangeNickName) {
				this.webApi.closeLoadingData();
				this.$router.go(-1);
				return false;
			}

			formData.append('token', this.userInfo.token);
			formData.append('file',file);


			// 上传头像
			uploadFile(formData)

			.then(res =>{

				if(!res || res.state != 'success' && this.isChangeHead){
					this.webApi.alert('头像上传失败，请稍后重新尝试');
					this.updateState = false;
					return false;
				}

				if(this.isChangeHead && res.state == 'success') this.newUserInfo.avatar = res.data.path;

				// 更新名字
				return  changeUserName({
					nickName: this.nickName,
					token: this.userInfo.token,
				})

			})

			.then(res =>{

				this.webApi.closeLoadingData();

				if(!res || res.state != 'success' && this.isChangeNickName){
					this.webApi.alert('用户名修改失败，请稍后重新尝试');
					this.updateState = false;
					return false;
				}

				if(this.isChangeNickName && res.state == 'success') this.newUserInfo.nickName = this.nickName;


				this.webApi.setCookie('userInfo', JSON.stringify(Object.assign(this.userInfo, this.newUserInfo)));
				this.webApi.setCookie('editUserInfo', JSON.stringify(Object.assign(this.userInfo, this.newUserInfo)));

				this.webApi.alert('更新成功', 2000);


				setTimeout(()=>{

					if(this.$route.query.origin && this.$route.query.origin == 'index') {
						this.$router.push(`/index?avatar=${this.userInfo.avatar}&memberId=${this.userInfo.memberId}&nickName=${this.userInfo.nickName}&token=${this.userInfo.token}&deviceType=${this.webApi.getDeviceType()}`)
					}else{
						this.$router.go(-1);
					}

				},1500)

			})


		},




  }

}

</script>

<style lang="scss" scoped>

 @import '../../assets/style/mixin';

 .edit-me-head-wrap{

	 @extend .ab;
	 @include wh(100%, 100%);
	 background-color: #fff;
	 z-index: 99;
	 left: 0; top: 0;
	 font-size: 0; line-height: 0;

	 .reg-head{

		@include wh(100%, 1.45rem);
 		position: relative;
 		padding: $commTop .4rem 0;
		background-color: $commPink;

 		.back{
 			position: absolute;
			left: 0;
 			z-index: 9;
 			font-family: 'iconfont';
			@extend .flexCenter;
			@include wh(1.5rem, 1.05rem);
 			@include fc($commBackFont, #fff);
 		}

 		h1{
 			@extend .ab;
 			@include fc($headH1Font, #fff);
			@extend .flexCenter;
			padding-left: .4rem;
 			left: 0; top: $commTop; right: 0;
 			height: 1.05rem;
 		}

	 }

	 .reg-info{

		 position: relative;
		 width: 50%;
	 	 margin: .9rem auto;
		 background-color: #fff;

		 input{
			@include fc(.24rem, #A7A7A7);
			border: 1px solid #efefef;
			margin-bottom: .35rem;
			padding: .3rem;
			@extend .borderBox;
			&::placeholder{
				color: #A7A7A7;
			}
		 }

	 }

	 input, .sub-ref-info{
		 border-radius: 5px;
		 @include wh(100%, .9rem);
	 }

	 .sub-ref-info{
	 	  @extend .flexCenter;
	 	  @include fc(.24rem, #fff);
	 	  background-color: $commPink;
			letter-spacing: 3px;
	 }

	 .last-sub-ref-info{
	   margin-top: .3rem;
	 }

	 .upload-img-ipt{
		 @include wh(0, 0);
		 position: absolute;
		 left: -999rem; top: -999rem;
		 opacity: 0;
	 }

	 label{
	 	 position: relative;
		 > span{
		 	 @extend .show;
			 @include fc(.24rem, #999);
			 @extend .ab; right: 0; top: -.15rem;
			 padding: 0 .3rem;
		 }
   }

	 .upload-img{
		 @include wh(2.8rem, 2.8rem);
		 margin: 0 auto .8rem;
		 background: url('../../assets/img/upload_head_img.png') center center;
		 background-size: 2.7rem 2.7rem;
		 border-radius: 100%; padding: .5rem;
		 border: 1px solid #ccc;
	 }

 }

</style>
