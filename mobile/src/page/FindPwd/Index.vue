<template lang="html">

	<div class="find-pwd-ipad">

		<header class="reg-head hide">
			<router-link to="login" class="back">&#xe669;</router-link>
			<h1>找回密码</h1>
		</header>

		<main :class="isMobile?'reg-info reg-info-mobile':'reg-info'" :style="isMobile?'width:85%':''">
			<input type="number" v-model="mobile" placeholder="手机号">
			<input type="number" v-model="code" placeholder="验证码">
			<input type="password" v-model="pwd" placeholder="新密码（请输入8-16位，不能有空格，纯数字需至少9位）" ref="pwd">
			<input type="password"  v-model="againPwd" placeholder="再输入一次" ref="againPwd">
			<a href="javascript:;" v-show="gainOn" @touchend="gainCode" class="gainCode">{{gainCodeText}}</a>
			<a href="javascript:;"  @touchend="lookPwd" data-index="0" class="look-pwd">&#xe62d;</a>
			<a href="javascript:;"  @touchend="lookPwd" data-index="1" class="look-pwd again-look-pwd">&#xe62d;</a>
			<a href="javascript:;" class="sub-ref-info" @click="subForm" ref="subFormBtn">{{subFormText}}</a>
		</main>

	</div>

</template>

<script>

import {
	phoneIsExist,
	sendCode,
	getToken,
	changePwdByPhone
} from '../../api/port';

export default {



  data() {
    return {
			gainCodeText: '获取验证码',
			mobile: '',
			code: '',
			pwd: '',
			againPwd: '',
			token: '',
			subFormText: '完成', // 提交文字
			gainOn: true, //获取验证码按钮是否显示
    }
  },

	created() {


	},


  methods: {

		// 提交状态修改
		subStateModification() {

			if(this.subFormText == '完成'){
				this.$refs.subFormBtn.classList.add('sub-ref-info-active');
				this.subFormText = '提交中';
			}else{
				this.$refs.subFormBtn.classList.remove('sub-ref-info-active');
				this.subFormText = '完成';
			}


		},

		// 找回密码,提交
		subForm() {

			if(!/^\d{11}$/.test(this.mobile)){
				this.webApi.alert('手机号格式有误');
				return false;
			}

			if(!/^\d{9,16}$|^(?!\d+$)\S{8,16}$/.test(this.pwd)){
				this.webApi.alert('密码格式有误');
				return false;
			}

			if(this.pwd !== this.againPwd){
				this.webApi.alert('俩次密码输入不一致');
				return false;
			}

			if(this.subFormText == '提交中') return false;

			this.subStateModification();

			// 找回密码
			changePwdByPhone({
				token: this.token,
	      mobile:  this.mobile,
	      code: this.code,
	      password: this.pwd
			})

			.then(res =>{

				if(!res || res.state != 'success') {
					this.webApi.alert('密码修改失败');
					this.subStateModification();
					return false;
				}

				this.webApi.alert('密码修改成功, 3秒后即将跳转到登录页');

				setTimeout(()=> {
					g.backLogin();
				},3000);



			})

			.catch(err =>{
				this.webApi.alert('网络异常，请稍后再试');
				return false;
			})

		},



		// 获取验证码
		gainCode() {

			if(!/^\d{11}$/.test(this.mobile)){
				this.webApi.alert('手机号格式有误');
				return false;
			}

			this.gainOn = false;

			// 查询手机号是否存在
			phoneIsExist({
				checkname: this.mobile,
				checktype:1
			})

			.then(res =>{

				if(!res || res.state != 'success'){
					this.webApi.alert('网络异常，请稍后再试');
					this.gainOn = true;
					return false;
				}


				if(res.data == 'false'){
					this.webApi.alert('手机号未注册，请先去注册');
					this.gainOn = true;
					return false;
				}

				 // 获取token
				 return getToken({
					 appType: 'aPad',
	 				 appId: 'aPadCourse',
	 				 appKey: 'f7e4ebaa872f38db7b548b870c13e79e'
				 });

			})

			.then(res =>{

				if(!res || res.state != 'success'){
					this.webApi.alert('网络异常，请稍后再试');
					this.gainOn = true;
					return false;
				}

				this.token = res.data.token;

				// 发送验证码
				return sendCode({
					templateSn: '09',
          phone: this.mobile,
          captcha: '', // 图片验证码
          type: "send",
          isResend: '1',
          token: this.token
				})

			})

			.then(res =>{

				if(!res || res.state != 'success'){
					this.webApi.alert('发送失败，请稍后再试');
					this.gainOn = true;
					return false;
				}

				this.countDown();

			})

			.catch(err =>{
				this.webApi.alert('网络异常，请稍后再试');
				this.gainOn = true;
				return false;
			})

		},

		// 查看密码
		lookPwd(ev) {

			let index = ev.target.dataset.index;

			if(index == '0') this.$refs.pwd.getAttribute('type') == 'password' ? this.$refs.pwd.setAttribute('type', 'text') : this.$refs.pwd.setAttribute('type', 'password');

			if(index == '1') this.$refs.againPwd.getAttribute('type') == 'password' ? this.$refs.againPwd.setAttribute('type', 'text') : this.$refs.againPwd.setAttribute('type', 'password');

		},


		// 倒计时
		countDown() {

			let num = 59;
			let timer = void 0;

			setTimeout(() =>{
				this.gainOn = true;
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

	.find-pwd-ipad{

		font-size: 0; line-height: 1;


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

	 .sub-ref-info-active{
	 	background-color: #999;
	 }

	 .gainCode{
	 		@extend .ab;
	 		@include fc(.24rem, $commPink);
			right: .5rem; top: .34rem;
	 }
	 .look-pwd{
	 	@extend .ab;
		@include fc(.6rem, #d2d0d0);
		right: .5rem; top: 2.65rem;
		font-family: 'iconfont';
	 }
	 .again-look-pwd{
	 	top: 3.9rem;
	 }


	}

</style>
