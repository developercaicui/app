<template lang="html">

	<main class="g-login">
		<input type="text" v-model="user" placeholder="请输入账号"/>
		<input type="password" v-model="pwd" placeholder="请输入密码"/>
		<a href="javascript:;" @click="submitLogin">登录</a>
		<Tip :error-msg='errorMsg' v-show="isShowTip"></Tip>
	</main>

</template>

<script>

import Tip from '../../components/Comm/Tip';

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

		// 获取token
		getToken() {

			let reqSetting = {
				port: {
					login: `${this.nativeApi.requestUrl}/api/zbids/member/login/v1.0`, // 登录
					getToken: `${this.nativeApi.requestUrl}/api/zbids/app/gettoken/v1.0/`, // 获取token
				},
				parameter: {
					getToken: {
						appType: 'aPad',
			      appId: 'aPadCourse',
			      appKey: 'f7e4ebaa872f38db7b548b870c13e79e',
					},
					login: {
						account: this.user,
						password: this.pwd,
						token: this.token,
						code: ''
					}
				}
			};

			this.$http.post(reqSetting.port.getToken, reqSetting.parameter.getToken, {emulateJSON: true})

			// 获取token
			.then(res => {

				if(res.status != 200 || res.body.state != 'success'){
					this.showTip('token获取失败,请查看控制台。');
					console.info(res, '获取token错误信息');
					return;
				}

				this.showTip('token获取成功！');
				this.token = res.body.data.token;

				return this.token;

			}, err => {
				this.showTip('token获取失败,请查看控制台。');
				console.info(err, '获取token错误信息');
			})

			// 登录
			.then((token)=> {

				reqSetting.parameter.login.token = token;

				this.$http.post(reqSetting.port.login, reqSetting.parameter.login, {emulateJSON: true}).then(res => {

					if(res.status != 200 || res.body.state != 'success'){
						this.showTip('登录失败,请查看控制台。');
						console.info(res, '登录失败');
						return;
					}

					this.showTip('登录成功，请自己修改hash切换页面！');

					this.nativeApi.setCookie('userInfo', JSON.stringify(res.body));

					// 可跳转
					// this.$router.push({
		      //    path: 'index'
		      // })

				}, err => {
					this.showTip('登录失败,请查看控制台。');
					console.info(err, '登录失败');
				});


			});

		},

		// 提示信息
		showTip(msg = '网络异常,请稍后再试。') {

			this.errorMsg = msg;
			this.isShowTip = true;

			setTimeout(() =>{
				this.isShowTip = false;
			}, 3000);

		},

		// 提交表单
		submitLogin() {

			this.getToken();

		},


  }

}

</script>

<style lang="scss" scoped>


 @import "../../assets/style/mixin";

.g-login{

	position: absolute;
	left: 0; top: 0; right: 0; bottom: 0;
	background-color: #f6f6f6;
	z-index: 99;

	input{
		@extend .show;
		@include wh(4rem, .5rem);
		@include fc(.26rem, #000);
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
