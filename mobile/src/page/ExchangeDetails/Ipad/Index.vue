<template lang="html">

	<div class="exchange-wrap-ipad-details">

		<header class="one-top">
			<router-link to="/exchange/list">&#xe67f;</router-link>
			<h1>讨论详情</h1>
			<div class="state-edit">
				<a href="javascript:;"></a>
				<a href="javascript:;" @touchend="removeDetails" v-show="isRemoveMsg">&#xe618;</a>
			</div>
		</header>

		<main class="one-list">

			<section class="list">
			  <img :src="headImg" class="user-head">
			  <div>{{ nikeName }}<span class="msg-num">{{ replyCount }}</span></div>
			  <h1>{{ title }}</h1>
			  <p v-html="contentHtml"></p>
			  <time>{{ updateTime }}</time>
			</section>

			<section class="list reply-list" v-for="item in data.replys">
			  <img :src="item.headImg" class="user-head">
			  <div>{{ item.nikeName }}<time class="time">{{ item.updateTime }}</time></div>
			  <p v-html="item.contentHtml" class="content-html"></p>
			</section>

		</main>


		<footer class="leave-msg">
			<div class="nav">
				<a href="javascript:;" class="upload-pic-btn" @touchend="handleIsUpload">&#xe6ab;</a>
				<input type="text" name="" v-model="textDetails" placeholder="评论...">
				<a href="javascript:;" class="add-msg" @touchend="handleSubPublish">发布</a>
			</div>
			<div class="upload-details" v-show="isFileOpen">
				<h1>最多可添加五张图片</h1>
				<a href="javascript:;" class="upload-btn" @touchend="handleUploadBtn"><span>+</span></a>
				<ul class="show-list-pic">
					<li v-for="(item, index) in allUploadPic" >
						<img :src="item.src" />
						<a href="javascript:;" :data-index="index" @touchend="handleRemovePic">&#xe642;</a>
					</li>
				</ul>
			</div>
		</footer>

		<input type="file" @change="handleUploadPic" name="" value="" ref="iptFile" class="ipt-file">

	</div>

</template>

<script>

import { removeExchangeDetails } from '../../../api/port';

export default {

	props: {
		'user-info': [Object]
	},

  data() {
    return {
			data: [],
			headImg: '', // 头像
			title: '', // 标题
			contentHtml: '', // 内容
			updateTime: '', // 时间
			replyCount: '', // 留言数量
			nikeName: '', // 名字
			isFileOpen: false, // 是否打开上传图片
			allUploadPic: [], // 所有上传的图片
			allPicPath: '', // 上传图片的内容
			isUploadSuccess: 0,
			textDetails: '', // 内容
			appendReplyHtml: '',
			isRemoveMsg: false, // 是否可以删除当前留言。默认可以
    }
  },

	mounted() {

		this.data = JSON.parse(this.$route.params.data);

		let date = new Date(this.data.updateTime*1000);

		this.data.updateTime = `${date.getFullYear()}-${this.webApi.isSmallTen(date.getMonth())}-${this.webApi.isSmallTen(date.getDate())}  ${this.webApi.isSmallTen(date.getHours())}:${this.webApi.isSmallTen(date.getMinutes())}`;

		this.isRemoveMsg = this.userInfo.memberId === this.data.memberId ? true : false;
		this.headImg = `${this.webApi.cdnImgUrl}${this.data.headImg}`;
		this.title = this.data.title;
		this.contentHtml = this.data.contentHtml;
		this.updateTime = this.data.updateTime;
		this.replyCount = this.data.replyCount;
		this.nikeName = this.data.nikeName;

		this.data.replys.map(item =>{

			let date = new Date(item.updateTime*1000);

			item.headImg = `${this.webApi.cdnImgUrl}${item.headImg}`;
			item.updateTime = `${date.getFullYear()}-${this.webApi.isSmallTen(date.getMonth())}-${this.webApi.isSmallTen(date.getDate())}  ${this.webApi.isSmallTen(date.getHours())}:${this.webApi.isSmallTen(date.getMinutes())}`;

		});


	},

  methods: {

		// 删除详情
		removeDetails() {

			this.$emit('remove-details', {
				id: this.data.id
			})

		},

		// 发布，先提交照图片
		handleSubPublish() {

			if(!this.textDetails){
				this.webApi.alert('评论内容不能为空');
				return false;
			}

			if(this.allUploadPic.length < 1){
				this.subForm();
				return false;
			}

			this.isUploadSuccess = 0;

			this.allUploadPic.map((item, index) =>{

				let formData = new FormData();

				formData.append(`file`, item.file);
				formData.append('token', this.webApi.getCookie('token'));

				this.$emit('upload-pic', formData, res =>{

					this.allPicPath =  `${this.allPicPath}<img src="${this.webApi.cdnImgUrl}${res.path}"/>`;
					this.isUploadSuccess++;

					// 成功以后提交表单内容
					if(this.allUploadPic.length == this.isUploadSuccess) this.subForm();

				});

			});

		},

		// 数据全部提交
		subForm() {


			this.$emit('reply', {
				id: this.data.id,
				content: `<p>${this.textDetails}</p><br>${this.allPicPath}`,
				replaytype: 0,
				pageSize: 20,
				token: this.webApi.getCookie('token'),
				pageNo: 1
			}, data =>{

				this.data.replys.push(data);
				this.textDetails = '';
				this.isFileOpen = false;

			});



		},

		// 上传图片
		handleUploadPic(ev) {

			let file = this.$refs.iptFile.files[0];
			let reader = new FileReader();

			reader.readAsDataURL(file);

			reader.onload = (evt) =>{

				this.allUploadPic.push({
					src: evt.target.result,
					file: file
				});

      }

		},


		// 触发上传
		handleUploadBtn() {
			this.$refs.iptFile.click();
		},

		// 是否打卡上传图片
		handleIsUpload() {
			this.isFileOpen = this.isFileOpen ? false : true;
		},

		// 删除这个照片
		handleRemovePic(ev) {

			let removeIndex = ev.target.dataset.index;

			this.allUploadPic = this.allUploadPic.filter((item, index) => index != removeIndex && item);

		},

  }

}

</script>

<style lang="scss">

	@import "../../../assets/style/mixin";

	$green: #46C1AA;

	.exchange-wrap-ipad-details{

		font-size: 0;

		// 底部留言
		.leave-msg{

			@extend .show;
			position: fixed;
			left: 0; bottom: 0; right: 0;
			border-top: 1px solid #eee;
			background-color: #F5F5F5;
			z-index: 9;

			.show-list-pic{
				@extend .ab;
				left: 3.61rem; top: 1.8rem;
				display: flex;
				li{
					@include wh(2.8rem, 2.2rem);
					flex: 1; margin-right: .3rem;
					img{
						@include wh(100%, 100%);
					}
					a{
						@extend .ab;
						@include wh(.4rem, .4rem);
						@include fc(.24rem, #fff);
						@extend .borderBox;
						text-align: center; line-height: 1.5;
						background-color: $green;
						top: -.1rem;
						transform: translate3d(-.26rem,0,0);
						border-radius: 100%;
						font-family: 'iconfont';
						border: 1px solid #fff;
					}
				}
			}

			.upload-details{
				height: 3.3rem;
				background-color: #f5f5f5;
				padding: .25rem;
				h1{
					@include fc(.26rem, #A5A5A5);
				}
			}
			.upload-btn{
				@extend .flexCenter;
				@include wh(2.8rem, 2.1rem);
				border: 2px dashed #ddd;
				border-radius: 2px;
				transform: translate3d(0,.2rem,0);
				span{
					@include wh(.8rem, .8rem);
					@include fc(.4rem, #fff);
					@extend .flexCenter;
					background-color: #ddd;
					border-radius: 100%;
				}
			}

			.nav{
				height: 1.02rem;
				input{
					@extend .ab;
					@include wh(17.6rem, .5rem);
					@include fc(.24rem, #999);
					@extend .borderBox;
					top: .25rem; left: 1.2rem;
					border: 1px solid #F1F1F1;
					border-radius: 3px;
					padding: 0 .2rem;
					&::placeholder{
						color: #999;
					}
				}
			}
			.add-msg{
				@include wh(1.1rem, .5rem);
				@include fc(.26rem, #fff);
				@extend .flexCenter;
				@extend .ab;
				right: .3rem; top: .25rem;
				border-radius: 3px;
				background-color: #46C1AA;
			}
			.upload-pic-btn{
				@extend .ab;
				@include fc(.5rem, $green);
				top: .23rem; left: .3rem;
				font-family: 'iconfont';
			}
		}

		.user-head{
			@extend .ab;
			@include wh(.8rem, .8rem);
			left: .5rem;
			border-radius: 100%;
		}

		> main {
			@include wh(100%, 100%);
			padding-bottom: 4.32rem;
			background-color: #fff;
		}
		.list{
			@include fc(.24rem, #333);
			padding: .35rem .5rem .35rem 1.6rem; line-height: 1;
			border-bottom: 1px solid #E2E2E2;
			background-color: #f7f7f7;
			&:nth-of-type(1){
				background-color: #fff;
			}
			h1{
				font-size: .28rem;
				margin: .25rem 0;
			}
			time{
				@extend .show;
				color: #ACACAC;
				text-align: right;
				padding-bottom: .4rem;
				&.time{
					float: right;
				}
			}
			.msg-num{
				position: absolute;
				right: .5rem; width: .75rem;
				text-align: right; color: #ACACAC;
				&:before{
					content: '\e632';
					font-family: 'iconfont';
					@extend .ab;
					@include fc(.3rem, #ACACAC);
					left: 0;
				}
			}
		}


		.state-edit{
			@extend .ab;
			right: .35rem; top: 50%; transform: translateY(-50%);
			font-family: 'iconfont';
			a{
				color: $green;
				&:nth-of-type(1){
					font-size: .38rem;
					margin-right: .3rem;
				}
				&:nth-of-type(2){
					font-size: .42rem;
				}
			}
		}


	.one-top{
		position: relative;
		@include wh(100%, 1.05rem);
		border-bottom: 1px solid #B9B9B9;
		background-color: #fff;
		> a{
			@extend .ab;
			@include fc(.46rem, $green);
			font-family: 'iconfont';
			left: .38rem; padding-left: .45rem;
			top: 50%; transform: translateY(-50%);
		}

		h1{
			@extend .flexCenter;
		  @include fc(.3rem, #1D1D1D);
			height: inherit;
		}
		.type-list{
			@extend .ab;
			@include fc(.24rem, #fff);
			top: 1rem; left: .5rem;
			background-color: rgba(0,0,0,.7);
			border-radius: 5px;
			width: 2rem;
			&:after{
				content: '';
				@extend .show;
				@extend .ab;
				top: -.38rem;
				left: .85rem;
				border: .19rem solid rgba(0,0,0,0);
				border-bottom-color: rgba(0,0,0,.7);
			}
			li{
				padding: .15rem .2rem;
				text-align: center;
				border-bottom: 1px solid rgba(255,255,255,.7);
			}
		}
	}

	.reply-list{
		padding-bottom: .5rem;
		p{
			margin-top: .2rem;
		}

	}

	.ipt-file{
		@extend .ab;
		@include wh(0, 0);
		overflow: hidden;
		left: -99rem; top: -99rem;
	}

	.content-html{
		 img{
			display: inline-block;
			width: 1.5rem;
			margin-right: .2rem;
		}

	}

}


</style>
