<template lang="html">

	<div class="exchange-wrap-ipad-details">

		<header class="one-top">
			<router-link to="/list">&#xe67f;</router-link>
			<h1>讨论详情</h1>
			<div class="state-edit">
				<a href="javascript:;">&#xe609;</a>
				<a href="javascript:;" @touchend="removeDetails">&#xe618;</a>
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
			  <p v-html="item.contentHtml"></p>
			</section>


		</main>


		<footer class="leave-msg">
			<div class="nav">
				<a href="javascript:;" class="upload-pic-btn">&#xe6ab;</a>
				<input type="text" name="" value="" placeholder="评论...">
				<a href="javascript:;" class="add-msg">发布</a>
			</div>
			<div class="upload-details">
				<h1>最多可添加五张图片</h1>
				<a href="javascript:;" class="upload-btn"><span>+</span></a>
				<ul class="show-list-pic">
					<li>
						<img src="http://img.caicui.com/upload/201606/b207530895864676b9ed73cb622a16d2.png" />
						<a href="javascript:;"></a>
					</li>
					<li>
						<img src="http://img.caicui.com/upload/201606/b207530895864676b9ed73cb622a16d2.png" />
						<a href="javascript:;"></a>
					</li>
				</ul>
			</div>
		</footer>

	</div>

</template>

<script>

import { removeExchangeDetails } from '../../../api/port';

export default {

  data() {
    return {
			data: [],
			headImg: '', // 头像
			title: '', // 标题
			contentHtml: '', // 内容
			updateTime: '', // 时间
			replyCount: '', // 留言数量
			nikeName: '', // 名字

    }
  },

	mounted() {



		this.data = JSON.parse(this.$route.params.data);


		let date = new Date(this.data.updateTime*1000);

		this.data.updateTime = `${date.getFullYear()}-${this.webApi.isSmallTen(date.getMonth())}-${this.webApi.isSmallTen(date.getDate())}  ${this.webApi.isSmallTen(date.getHours())}:${this.webApi.isSmallTen(date.getMinutes())}`;

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

  }

}

</script>

<style lang="scss" scoped>

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

		.list{
			@include fc(.24rem, #333);
			padding: .35rem .5rem .35rem 1.6rem; line-height: 1;
			border-bottom: 1px solid #E2E2E2;
			background-color: #f5f5f5;
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


	}


</style>
