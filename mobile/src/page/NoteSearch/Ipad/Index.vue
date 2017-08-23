<template lang="html">


	<div class="node-search-wrap-ipad">

		<header>
			<div class="enter-ipt">
				<input type="text" placeholder="搜索">
			</div>
			<div class="state-edit">
				<a href="javascript:;">搜索</a>
				<a href="javascript:;">取消</a>
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

	.node-search-wrap-ipad{

		font-size: 0;

		> header{
			position: relative;
			@include wh(100%, 1.05rem);
			border-bottom: 1px solid #B9B9B9;
			background-color: #fff;
		}

		.enter-ipt{
			@extend .ab;
			@include wh(17.4rem, .5rem);
			left: .3rem; top: .25rem;
			&:before{
				@include fc(.46rem, #B9B9B9);
				@extend .ab;
				content: '\e651';
				font-family: 'iconfont';
				right: -.5rem; top: .03rem;
			}
			input{
				@include wh(100%, 100%);
				padding: 0 .3rem;
				border-radius: .3rem;
				border: 1px solid #ccc;
			}
		}

		.state-edit{
			 @extend .ab;
			 right: .35rem; top: 50%; transform: translateY(-50%);
			 font-size: .27rem;
			 a{
				 &:nth-of-type(1){
				 	color: $green;
					margin-right: .3rem;
				 }
				 &:nth-of-type(2){
				 	color: #ccc;
				 }
			 }
	  }



		.list{

			@include fc(.24rem, #333);
			padding: .35rem .5rem; line-height: 1;
			border-bottom: 1px solid #E2E2E2;

			&:last-of-type{
				border-bottom-width: 0;
			}

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


	}


</style>
