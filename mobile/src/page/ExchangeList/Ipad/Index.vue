<template lang="html">


	<div class="exchange-wrap-ipad">

		<main class="one-list">

			<header class="one-top">
				<a href="javascript:;">
					最新回复
				</a>
				<ul class="type-list" v-show="typeShow">
					<li>最新回复</li>
					<li>发帖时间</li>
					<li>精华讨论</li>
					<li>回复数量</li>
				</ul>
				<h1>我的讨论</h1>
			</header>

			<section class="list" v-for="item in exchangeData.list" :data-id="item.id" @touchend="openDetails">
				<div>{{ item.nikeName }}<span class="msg-num">{{ item.replyCount }}</span></div>
				<h1>{{ item.title }}</h1>
				<p v-html="item.contentHtml"></p>
				<time>{{ item.updateTime }}</time>
			</section>

		</main>


	</div>

</template>

<script>

import { getExchangeDetails } from '../../../api/port';

export default {


	props: {
	 'exchange-data': [Object]
 },

	mounted() {


	},

  data() {
    return {
			typeShow: false, //  留言排序类型
    }
  },

  methods: {

		// 打开详情
		openDetails(ev) {

			let oSection = this.webApi.recursiveParentNode(ev.target, 'section');

			this.webApi.loadingData();

			getExchangeDetails({
				verTT: new Date().getTime(),
				token: this.webApi.getCookie('token'),
				id: oSection.dataset.id,
				pageNo: 1,
				pageSize: 20,
			})

			.then(res =>{

				this.webApi.closeLoadingData();

				if(!res || res.state != 'success'){
					this.webApi.alert('打开详情失败，请稍后再试');
					return false;
				}

				this.$router.push({
					path: `details/${encodeURIComponent(JSON.stringify(res.data))}`,
				});

			})



		},

  }

}

</script>

<style lang="scss" scoped>

	@import "../../../assets/style/mixin";

	$green: #12B697;

	.exchange-wrap-ipad{

		font-size: 0;

		.list{
			@include fc(.24rem, #333);
			padding: .35rem .5rem; line-height: 1;
			border-bottom: 1px solid #E2E2E2;
			h1{
				font-size: .28rem;
				margin: .25rem 0;
			}
			time{
				@extend .show;
				color: #ACACAC;
				text-align: right;
				padding-bottom: .4rem;
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




	.one-top{
		position: relative;
		@include wh(100%, 1.05rem);
		border-bottom: 1px solid #B9B9B9;
		background-color: #f5f5f5;
		a{
			@extend .ab;
			@include fc(.24rem, $green);
			left: .38rem; padding-left: .45rem;
			top: 50%; transform: translateY(-50%);
			&:after{
				content: '\e669';
				font-family: 'iconfont';
				@extend .ab;
				@include fc(.35rem, $green);
				@extend .show;
				left: 0; top: .05rem;
				transform: rotate(-90deg);
			}
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


	}


</style>
