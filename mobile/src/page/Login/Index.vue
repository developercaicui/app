<template lang="html">

	<main class="login-wrap-all">
		<input type="text" v-model="user" placeholder="请输入账号"/>
		<input type="password" v-model="pwd" placeholder="请输入密码"/>
		<a href="javascript:;" @touchend="submitLogin">登录</a>
	</main>

</template>

<script>

import { getToken, login } from '../../api/port';

export default {

	components: {
	},

  data() {
    return {
			user: 'rainy02',
			pwd: '111111111',
			token: '',
    }
  },

  methods: {


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


			this.webApi.alert('正在登录，请耐心等待...');

			getToken(tokenParams)

			.then(res =>{

				if(!res && !res.state == 'success'){
					this.webApi.alert('token获取失败,请查看控制台。');
					console.error(res, '获取token错误信息');
					return false;
				}

				this.token = res.data.token;

				return this.token;

			})

			.then(token => {

				loginParams.token = token;

				return login(loginParams);
			})

			.then(res => {

				if(!res){
					this.webApi.alert('登录失败,请查看控制台。');
					console.error(res, '登录失败');
					return false;
				}

				if(res.state == 'error'){
					this.webApi.alert(res.msg);
					return false;
				}

				this.webApi.alert('登录成功，即将自动跳转');

				setTimeout(() =>{
					this.$router.push({
						path: `/?avatar=${res.data.avatar}&memberId=${res.data.memberId}&nickName=${res.data.nickName}&token=${res.data.token}`
					});
				},1000)

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
	 z-index: 19;

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
