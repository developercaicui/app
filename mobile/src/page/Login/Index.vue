<template lang="html">

	<main class="login-wrap-all">
		<input type="text" v-model="user" placeholder="请输入账号"/>
		<input type="password" v-model="pwd" placeholder="请输入密码"/>
		<a href="javascript:;" @touchend="submitLogin">登录</a>
		<Tip :error-msg='errorMsg' v-show="isShowTip"></Tip>
	</main>

</template>

<script>

import Tip from '../../components/Comm/Tip';
import { getToken, login } from '../../api/port';

export default {

	components: {
		Tip
	},

  data() {
    return {
			user: 'candy',
			pwd: '123456',
			token: '',
			errorMsg: '网络异常，请稍后在试试!',
			isShowTip: false
    }
  },

  methods: {


		// 提示信息
		showTip(msg = '网络异常,请稍后再试。') {

			this.errorMsg = msg;
			this.isShowTip = true;

			setTimeout(() =>{
				this.isShowTip = false;
			}, 3000);

		},

		submitLogin() {

			let tokenParams = {
				appType: 'aPad',
				appId: 'aPadCourse',
				appKey: 'f7e4ebaa872f38db7b548b870c13e79e'
			};
			let loginParams = {
				account: this.user,
				password: this.pwd,
				token: '',
				code: ''
			};


			this.showTip('正在登录，请耐心等待...');

			getToken(tokenParams)

			.then(res =>{

				if(!res && !res.state == 'success'){
					this.showTip('token获取失败,请查看控制台。');
					console.error(res, '获取token错误信息');
				}

				this.token = res.data.token;

				return this.token;

			})

			.then(token => {

				loginParams.token = token;

				return login(loginParams);
			})

			.then(res => {

				if(!res && !res.state == 'success'){
					this.showTip('登录失败,请查看控制台。');
					console.error(res, '登录失败');
				}

				this.showTip('登录成功，请自行切换路由');
				this.webApi.setCookie('userInfo', JSON.stringify(res.data));

			});


		},


  }

}

</script>

<style lang="scss" scoped>

 @import "../../assets/style/mixin";

 .login-wrap-all{
	 position: absolute;
	 left: 0; top: 0; right: 0; bottom: 0;
	 background-color: #f6f6f6;
	 z-index: 99;

	 input{
		 @include wh(4rem, .5rem);
		 @include fc(.26rem, #000);
		 @include show();
		 margin: .3rem auto;
		 padding: .2rem;
		 &:nth-of-type(1){
			 margin-top: 3rem;
		 }
	 }

	 a{
		 @include wh(1.4rem, .45rem);
		 @include fc(.26rem, #fff);
		 display: flex;
		 justify-content: center;
		 align-items: center;
		 background-color: #2B7FD2;
		 margin: 0 auto;
	 }

	}

</style>
