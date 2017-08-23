<template lang="html">


	<div class="node-detailslist-wrap-ipad">

		<header class="one-top">
			<a href="javascript:;">章节列表</a>
			<h1>知识点战略</h1>
			<div class="state-edit">
				<a href="javascript:;">新建&nbsp;<span>+</span></a>
			</div>
		</header>

		<main>

			<section class="list">
				<div>candy</div>
				<h1>一萨达是激动撒娇第三</h1>
				<p>挨打了可视对讲啊看书建档立卡是简单看垃圾啊上连接</p>
				<time>2017-04-21 18:16</time>
			</section>

		</main>


	</div>

</template>

<script>

export default {

  data() {
    return {
    }
  },

  methods: {

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
