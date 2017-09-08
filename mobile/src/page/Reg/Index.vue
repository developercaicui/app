<template lang="html">

	<div class="comm-reg-wrap">


		<transition :name="transformAName">
			<div class="first-step" v-show="!isLast">

				<header class="reg-head">
					<a href="javascript:;" class="back" @touchend="handleBackLogin">&#xe669;</a>
					<h1>注册信息</h1>
					<span class="step">1/2</span>
				</header>

				<main :class="isMobile?'reg-info reg-info-mobile':'reg-info'" :style="isMobile?'width:85%':''">
					<input type="number" v-model="mobile" placeholder="手机号">
					<input type="number" v-model="code" placeholder="验证码">
					<input type="password" v-model="pwd" placeholder="密码（请输入8-16位，不能有空格，纯数字需至少9位）" ref="pwd">
					<a href="javascript:;" v-show="isShowBtn" @touchend="gainCode" class="gain-code">{{gainCodeText}}</a>
					<a href="javascript:;" @touchend="lookPwd" class="look-pwd">&#xe62d;</a>
					<div class="is-agree">
						<a href="javascript:;" @touchend="isAgreement" class="active">&#xe654;</a>
						我已阅读并同意<a href="http://www.caicui.com/help/ff80808147db71340147f60c159a0411" target="_blank">《财萃网服务协议》</a>
					</div>
					<a href="javascript:;" class="sub-ref-info" @touchend="subRegInfo">下一步</a>
				</main>

			</div>
	</transition>

		<transition :name="transformBName">
			<div class="last-step" v-show="isLast">
				<header class="reg-head">
					<a href="javascript:;" class="back" @click.stop="backRegPage">&#xe669;</a>
					<h1>完善信息</h1>
					<span class="step">2/2</span>
				</header>
				<main :class="isMobile?'reg-info reg-info-mobile':'reg-info'" :style="isMobile?'width:85%':''">
					<div class="upload-img" ref="uploadImgBtn" @touchend="uploadImg"></div>
					<label>
						<input type="text" v-model="nickName" placeholder="用户名">
						<span>可用于登录</span>
					</label>
					<a href="javascript:;" class="sub-ref-info last-sub-ref-info" @touchend="subPerfectInfo">注册</a>
				</main>
					<input type="file" name="" accept="image/png,image/gif,image/jpeg" @change="changeFile" ref="fileIpt" class="upload-img-ipt"/>
			</div>
		</transition>



		<!-- <regIpad v-show="isIpad"></regIpad> -->
		<!-- <regMobile v-show="isMobile"></regMobile> -->
	</div>

</template>

<script>

import { getToken, phoneIsExist, sendCode, mobileReg, uploadFile, changeUserName} from '../../api/port';

export default {

	components: {

  },

  data() {
    return {
			mobile: '',
			code: '',
			pwd: '',
			isAgree: 1, // 默认同意协议
			nickName: '',
			gainCodeText: '获取验证码',
			isLast: false,
			isShowBtn: true, // 是否显示按钮
			transformAName: 'slide-left-hide', // 动画过度方式
			transformBName: 'slide-left',
			token: '',
			regSuccessToken: '',
    }
  },

 created() {

	//  this.transformAName = 'slide-left-hide';
	//  this.transformBName =  'slide-left';
	 //
	//  this.isLast = true;

 },

  methods: {

		// 返回登录页
		handleBackLogin() {
			g.backLogin();
		},

		// 触发上传图片
		uploadImg() {
			this.$refs.fileIpt.click();
		},

		changeFile(ev) {

			let file = ev.target.files[0];
			let reader = new FileReader();

			reader.readAsDataURL(file);

			reader.onload = (evt) =>{
        this.$refs.uploadImgBtn.style.cssText = `
				   background:url(${evt.target.result});
					 background-size: 2.7rem 2.7rem;
				`;
      }


		},

		// 获取验证码
		gainCode() {

			if(!/^\d{11}$/.test(this.mobile)){
				this.webApi.alert('手机号格式有误');
				return false;
			}

			this.isShowBtn = false;

			// 手机号是否存在
			phoneIsExist({
				checkname: this.mobile,
        checktype: '1', // 1为手机，2为邮箱
			})

			.then(res =>{

				if(!res || res.state != 'success'){
					this.webApi.alert();
					this.isShowBtn = true;
					return false;
				}

				if(res.data == 'true'){
					this.webApi.alert('此手机号码已注册');
					this.isShowBtn = true;
					return false;
				}


				this.getTok();


			})



		},

		// 是否同意财萃协议
		isAgreement(ev) {

			if(ev.target.classList.contains('active')){
				ev.target.classList.remove('active')
				this.isAgree = 0;
		  }else{
				ev.target.classList.add('active')
				this.isAgree = 1;
			}

		},

		getTok() {


			getToken({
				appType: 'aPad',
				appId: 'aPadCourse',
				appKey: 'f7e4ebaa872f38db7b548b870c13e79e'
			})

			.then(res =>{

				if(!res || res.state != 'success'){
					this.webApi.alert('网络异常，请稍后在试');
					this.isShowBtn = true;
					return false;
				}


				this.token = res.data.token;

				// 发送验证码
				return sendCode({
					templateSn: '08',
					phone: this.mobile,
					captcha: '', // 图片验证码
					isResend: '1',
					token: this.token
				});

			})

			.then(res =>{

				if(!res || res.state != 'success'){
					this.webApi.alert('网络异常，请稍后在试试');
					this.isShowBtn = true;
					return false;
				}

				this.countDown();

			})

		},

		// 注册
		subPerfectInfo() {


			let formData = new FormData();
			let file = this.$refs.fileIpt.files[0];


			if(!file){
				this.webApi.alert('请先上传一张头像');
				return false;
			}

			if(!this.nickName){
				this.webApi.alert('用户名不能为空');
				return false;
			}


			phoneIsExist({
				checkname: this.nickName,
        checktype: '3', // 1为手机，2为邮箱, 3为用户名
			})

			.then(res =>{

				if(!res || res.state != 'success'){
					this.webApi.alert();
					return false;
				}

				if(res.data == 'true'){
					this.webApi.alert('用户名已存在，请修改用户名！');
					return false;
				}

				// 注册
				mobileReg({
					password: this.pwd,
					phone: this.mobile,
					code: this.code,
					agreement: this.isAgree,
					token: this.token
				})

			})

			.then(res =>{

				if(!res){
					this.webApi.alert();
				  return false;
				}

				if(res.state == 'error'){
					this.webApi.alert(res.msg);
				  return false;
				}


				this.regSuccessToken = this.data.token;

				// 上传头像(token调试)
				formData.append('file',file, file.name);
				formData.append('token', this.regSuccessToken);

				return uploadFile(formData)

			})

			.then(res =>{

				if(!res || res.state != 'success'){
					this.webApi.alert('头像上传失败，请登录后到设置里重新上传');
					return false;
				}

				return changeUserName({
					nickName: this.nickName,
					token: this.regSuccessToken,
				})

			})

			.then(res =>{

				if(!res || res.state != 'success'){
					this.webApi.alert('用户名修改失败，请登录后到设置里重新修改');
					return false;
				}

				this.webApi.alert('密码修改成功, 3秒后即将跳转到登录页');

				setTimeout(()=> {
					this.$router.push({
						path: 'login'
					});
				},3000);


			})

			.catch(err =>{
				this.webApi.alert();
				return false;
			});


		},

		// 下一步
		subRegInfo() {

			if(!/^\d{11}$/.test(this.mobile)){
				this.webApi.alert('手机号格式有误');
				return false;
			}

			if(!/^\d{9,16}$|^(?!\d+$)\S{8,16}$/.test(this.pwd)){
				this.webApi.alert('密码格式有误');
				return false;
			}

			if(this.isAgree == 0){
				this.webApi.alert('请先同意财萃网服务协议');
			  return false;
			}

		  this.transformAName = 'slide-left-hide';
	 	  this.transformBName =  'slide-left';

	 	  this.isLast = true;

		},
		// 明文显示密码
		lookPwd() {
			this.$refs.pwd.getAttribute('type') == 'password' ? this.$refs.pwd.setAttribute('type', 'text') : this.$refs.pwd.setAttribute('type', 'password');
		},

		// 返回注册页面
		backRegPage() {

			this.transformAName = '';
			this.transformBName =  '';

			this.isLast = false;
		},

		// 倒计时
		countDown() {

			let num = 59;
			let timer = void 0;

			setTimeout(() =>{
				this.isShowBtn = true;
			},1000);

			timer = setInterval(() =>{

				this.gainCodeText = `${num--}s`;

				if(num <= 0){
					clearInterval(timer);
					this.gainCodeText = '获取验证码';
				}

			},1000);


		},

  }

}

</script>

<style lang="scss" scoped>

  @import "../../assets/style/mixin";


 $commGreen: #01a185;

 .comm-reg-wrap{

	 font-size: 0; line-height: 0;

	 > div{

			@include wh(100%, 100%);
			background-color: #fff;

			&.first-step{
				position: relative;
				z-index: 1;
			}
			&.last-step{
				@extend .ab;
				z-index: 99;
			  left: 0; top: 0;
			}

	 }

	 .reg-head{

		@include wh(100%, 1.05rem);
 		position: relative;
 		padding: 0 .4rem;
		background-color: #ebebee;

 		.back{
 			position: absolute;
 			z-index: 9;
 			height: 100%;
 			display: flex;
 			align-items: center;
 			font-family: 'iconfont';
 			@include fc(.5rem, $commGreen);
 		}

 		h1{
 			@extend .ab;
 			@include fc(.32rem, #000);
			@extend .flexCenter;
			padding-left: .4rem;
 			left: 0; top: 0; right: 0;
 			height: 1.05rem;
 		}

		.step{
			@extend .ab;
			@include fc(.24rem, #000);
			@extend .flexCenter;
			right: .5rem;
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
	 	  background-color: $commGreen;
			letter-spacing: 3px;
	 }

	 .last-sub-ref-info{
	   margin-top: .3rem;
	 }

	 .is-agree{
	 	 margin: .15rem 0 .5rem;
		 font-size: .24rem;
		 a{
			 &:nth-of-type(1){
			 	 font-family: 'iconfont';
				 color: #fff; font-size: 0;
				 @include wh(.3rem, .3rem);
				 display: inline-block; line-height: 1.3;
				 border-radius: 2px;
				 text-align: center;
				 font-size: .24rem;
 				 background-color: #fff;
				 border: 1px solid #ccc;
			 }
			 &.active{
			 	font-size: .24rem;
				background-color: $commGreen;
				border: 1px solid $commGreen;
			 }
			 &:nth-of-type(2){
			 	color: $commGreen;
			 }
		 }
	 }

	 .gain-code{
	 		@extend .ab;
			@include wh(1.3rem, .5rem);
	 		@include fc(.24rem, $commGreen);
			right: .5rem; top: .48rem;
			z-index: 19; text-align: right;
			display: inline-block;
	 }
	 .look-pwd{
	 	@extend .ab;
		@include fc(.6rem, #d2d0d0);
		right: .5rem; top: 2.95rem;
		font-family: 'iconfont';
		z-index: 19;
	 }

	 .reg-info-mobile{

		 input{
	 		height: .7rem;
	 	 }

		 .gainCode{
		 	 top: .38rem;
		 }

		 .look-pwd{
			 top: 2.45rem; font-size: .4rem;
		 }

		 .is-agree a:nth-of-type(1){
		 	line-height: 1.3;
		 }

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

	 .upload-img-ipt{
		 @include wh(0, 0);
		 position: absolute;
		 opacity: 0;
	 }

 }

</style>
