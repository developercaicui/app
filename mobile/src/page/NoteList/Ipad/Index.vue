<template lang="html">

	<div class="node-ipad-list">

		<header class="head">
			<h1>章节列表</h1>
			<div class="state-edit">
				<a href="javascript:;">&#xe651;</a>
				<a href="javascript:;">新建&nbsp;<span>+</span></a>
			</div>
		</header>
		<main class="list-wrap">

			<section class="list">
				<div href="javascript:;">
					<span></span>
					<h1>啊实打实的金卡撒大声地萨达所萨达所大声道撒</h1>
				</div>

				<section class="list">
					<div href="javascript:;">
						<span></span>
						<h1>啊实打实的金卡撒大声地萨达所萨达所大声道撒</h1>
					</div>

					<section class="list">
						<div href="javascript:;">
							<span></span>
							<h1>啊实打实的金卡撒大声地萨达所萨达所大声道撒</h1>
							<i>3</i>
						</div>
					</section>

				</section>

			</section>

			<section class="list">
				<div href="javascript:;">
					<span></span>
					<h1>啊实打实的金卡撒大声地萨达所萨达所大声道撒</h1>
				</div>
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

	$green: #1ac3a7;

	.node-ipad-list{

		font-size: 0; line-height: 1;

		.list{

			padding: 0 .75rem;
			border-bottom: 1px solid #f5f5f5;

			> section.list{
			  padding-left: .6rem;
				padding-right: 0;
				> section.list{
					padding-left: 0;
					> div span{
						@extend .hide;
					}
					> div h1{
						font-size: .24rem;
					}
				}
			}

			> div{

				@include wh(100%, 1.2rem);
				position: relative; font-size: .26rem;

				span{
					@extend .ab;
 					left: -.9rem; padding-left: .45rem;
					&:after{
						content: '\e669';
						@extend .show;
						font-family: 'iconfont';
						@include fc(.32rem, #969696);
						transition: .3s;
						transform: rotate(-90deg);
					}
 					top: 50%; transform: translateY(-50%);
				 }

				 h1{
					color: #7d7d7d;
					display: flex;
					align-items: center;
					text-indent: .2rem;
				  font-weight: 0;
 					height: inherit;
 				}

				i{
					@extend .ab;
					right: 0; top: 50%; transform: translateY(-50%);
					@include fc(.24rem, #969696);
					font-style: normal;
					&:before{
						content: '\e609';
						font-family: 'iconfont';
					}
				}

			}

		}

		.list-wrap{
			background-color: #fff;
		}

		header.head{

			position: relative;
			@include wh(100%, 1.05rem);
			border-bottom: 1px solid #B9B9B9;
			background-color: #fff;

			h1{
				@extend .flexCenter;
			  @include fc(.3rem, #1D1D1D);
				height: inherit;
			}

		 }

		 .state-edit{
 			@extend .ab;
 			right: .35rem; top: 50%; transform: translateY(-50%);
 			font-family: 'iconfont';
 			a{
 				color: $green;
 				&:nth-of-type(1){
 					font-size: .3rem;
 					margin-right: .2rem;
					transform: translate3d(0,.2rem,0);
 				}
 				&:nth-of-type(2){
 					font-size: .24rem;
 				}
 			}
 		}

 }


</style>
