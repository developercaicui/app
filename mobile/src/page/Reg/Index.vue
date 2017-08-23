<template lang="html">

	<div class="comm-reg-wrap">


		<transition :name="transformAName">
			<div class="first-step" v-show="!isLast">

				<header class="reg-head">
					<router-link to="login" class="back">&#xe669;</router-link>
					<h1>注册信息</h1>
					<span class="step">1/2</span>
				</header>

				<main :class="isMobile?'reg-info reg-info-mobile':'reg-info'" :style="isMobile?'width:85%':''">
					<input type="number" value="" placeholder="手机号">
					<input type="number" value="" placeholder="验证码">
					<input :type="pwdType" value="" placeholder="密码">
					<a href="javascript:;" @touchend="gainCode" class="gainCode">{{gainCodeText}}</a>
					<a href="javascript:;" @touchend="lookPwd" class="look-pwd">&#xe62d;</a>
					<div class="is-agree">
						<a href="javascript:;" class="active">&#xe654;</a>
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
					<div class="upload-img"></div>
					<label>
						<input type="number" value="" placeholder="用户名">
						<span>可用于登录</span>
					</label>
					<a href="javascript:;" class="sub-ref-info last-sub-ref-info" @touchend="subPerfectInfo">注册</a>
				</main>

			</div>
		</transition>



		<!-- <regIpad v-show="isIpad"></regIpad> -->
		<!-- <regMobile v-show="isMobile"></regMobile> -->
	</div>

</template>

<script>

import { getToken, phoneIsExist, sendCode, mobileReg } from '../../api/port';

export default {

	components: {

  },

  data() {
    return {
			isIpad: false,
      isMobile: false,
			pwdType: 'password',
			pwd: '',
			gainCodeText: '获取验证码',
			isLast: false,
			transformAName: 'slide-left-hide', // 动画过度方式
			transformBName: 'slide-left',
    }
  },

	created() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;

	},


  methods: {

		// 倒计时
		countDown() {

			let num = 59;
			let timer = void 0;

			timer = setInterval(() =>{

				this.gainCodeText = `${num--}s`;

				if(num <= 0){
					clearInterval(timer);
					this.gainCodeText = '获取验证码';
				}

			},1000);


		},

		// 获取验证码
		gainCode() {

			this.countDown();

			return;
			// 手机号是否存在
			phoneIsExist({
				checkname: '',
        checktype: '1', // 1为手机，2为邮箱
			})

			.then(res =>{

				if(!res || res.state != 'success'){

				}


				// return sendCode({

				// })

				// 获取Token
				return getToken({
					appType: 'aPad',
					appId: 'aPadCourse',
					appKey: 'f7e4ebaa872f38db7b548b870c13e79e'
				});

			})

			.then(res =>{


				// 发送验证码
				return sendCode({
					templateSn: '08',
					phone: '',
					captcha: '', // 图片验证码
					isResend: '1',
					token: ''
				})

			})

		},

		// 提交完善信息
		subPerfectInfo() {



		},

		// 提交注册信息
		subRegInfo() {


			this.transformAName = 'slide-left-hide';
			this.transformBName =  'slide-left';

			this.isLast = true;

			return;

			mobileReg({
				password: '',
				phone: '',
				code: '',
				agreement: '',
				token: ''
			})

			.then(res =>{

			})

		},
		// 明文显示密码
		lookPwd() {

			// this.pwdType = this.pwdType=='password' ? 'text' : 'password' ;
		},

		// 返回注册页面
		backRegPage() {

			this.transformAName = '';
			this.transformBName =  '';

			this.isLast = false;
		}

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
		background-color: #21292b;

 		.back{
 			position: absolute;
 			z-index: 9;
 			height: 100%;
 			display: flex;
 			align-items: center;
 			font-family: 'iconfont';
 			@include fc(.46rem, #ccc);
 		}

 		h1{
 			@extend .ab;
 			@include fc(.32rem, #fff);
			display: flex;
			align-items: center;
			padding-left: .4rem;
 			left: 1.35rem; top: 0; right: 0;
 			height: 1.05rem;
			border-left: 1px solid #4e4b4b;
 		}

		.step{
			@extend .ab;
			@include fc(.24rem, #fff);
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
				 display: inline-block; line-height: 1;
				 border-radius: 2px;
				 text-align: center;
			 }
			 &.active{
			 	font-size: .24rem;
				background-color: $commGreen;
			 }
			 &:nth-of-type(2){
			 	color: $commGreen;
			 }
		 }
	 }

	 .gainCode{
	 		@extend .ab;
	 		@include fc(.24rem, $commGreen);
			right: .5rem; top: .48rem;
	 }
	 .look-pwd{
	 	@extend .ab;
		@include fc(.6rem, #d2d0d0);
		right: .5rem; top: 2.95rem;
		font-family: 'iconfont';
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

 }

</style>
