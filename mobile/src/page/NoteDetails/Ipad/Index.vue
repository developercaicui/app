<template lang="html">

	<div class="node-wrap-ipad-details">

		<header >
			<a href="javascript:;">&#xe67f;</a>
			<h1>讨论详情</h1>
			<div class="state-edit">
				<a href="javascript:;">&#xe609;</a>
				<a href="javascript:;">&#xe618;</a>
			</div>
		</header>

		<main>


			<section class="list">
				<h1><span>课程介绍</span><time>2017-04-21 18:16   candy</time></h1>
				<p>挨打了可视对讲啊看书建档立卡是简单看垃圾啊上连接</p>
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

	$green: #46C1AA;

	.node-wrap-ipad-details{

		font-size: 0;


		.list{

			@include fc(.24rem, #333);
			padding: .35rem .5rem; line-height: 1;
			border-bottom: 1px solid #E2E2E2;


			h1{
				color: #acacac;
				margin-bottom: .25rem;
			}
			time{
				display: inline-block;
				float: right;
				color: #ACACAC;
				text-align: right;
			}
			p{
				margin-bottom: .1rem;
			}

			&:last-of-type{
				border-bottom-width: 0;
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


		> header{
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

		}



	}


</style>
