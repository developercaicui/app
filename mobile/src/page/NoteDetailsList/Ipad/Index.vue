<template lang="html">


	<div class="node-detailslist-wrap-ipad">

		<header class="one-top">
			<a href="javascript:;" @touchend="backList">章节列表</a>
			<h1>知识点战略</h1>
			<div class="state-edit">
				<a href="javascript:;">新建&nbsp;<span>+</span></a>
			</div>
		</header>

		<main>

			<section class="list" v-for="item in detailsList" :data-id="item.id" @touchend="openDetails">
				<div>{{ item.nikeName }}</div>
				<h1>{{ item.chaptername }}</h1>
				<p>{{ item.contentSummary }}</p>
				<time>{{ item.updateTime }}</time>
			</section>

		</main>


	</div>

</template>

<script>

export default {

	props: {
		'details-list': [Array],
	},

  data() {
    return {
    }
  },

  methods: {

		openDetails(ev) {

			let oSection = this.webApi.recursiveParentNode(ev.target, 'section');

			this.$router.push({
				path: `details?id=${oSection.dataset.id}`,
			});


		},

		// 上一页
		backList() {
			this.$router.go(-1);
		}

  }

}

</script>

<style lang="scss" scoped>

	@import "../../../assets/style/mixin";

	$green: #12B697;

	.node-detailslist-wrap-ipad{

		font-size: 0;

		.one-top{
			position: relative;
			@include wh(100%, 1.05rem);
			border-bottom: 1px solid #B9B9B9;
			background-color: #fff;
			> a{
				@extend .ab;
				left: .3rem; padding-left: .45rem;
				top: 50%; transform: translateY(-50%);
				@include fc(.24rem, $green);
				&:before{
					content: '\e669';
					@include fc(.3rem, #a5a5a5);
					@extend .ab;
					font-family: 'iconfont';
					transform: translate3d(-.32rem,.02rem,0);
				}
			}

			h1{
				@extend .flexCenter;
				@include fc(.3rem, #1D1D1D);
				height: inherit;
			}

		}



		.list{

			@include fc(.24rem, #333);
			padding: .35rem .5rem; line-height: 1;
			border-bottom: 1px solid #E2E2E2;

			> div{
				color: #333;
			}
			p{
				@include fc(.24rem, #acacac);
			}
			h1{
				font-size: .24rem;
				margin: .25rem 0;
			}
			time{
				@extend .show;
				color: #ACACAC;
				text-align: right;
				padding-bottom: .4rem;
			}

		}


		.state-edit{
			 @extend .ab;
			 right: .35rem; top: 50%; transform: translateY(-50%);
			 font-family: 'iconfont';
			 a{
				 color: $green;
				 font-size: .24rem;
			 }
	  }

	}


</style>
