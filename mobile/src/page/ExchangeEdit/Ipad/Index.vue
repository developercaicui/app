<template lang="html">

	<div class="exchange-wrap-ipad-edit">


		<header class="one-top">
			<a href="javascript:;">&#xe67f;</a>
			<h1>讨论详情</h1>
			<div class="state-edit">
				<a href="javascript:;">&#xe654;</a>
			</div>
		</header>

		<div class="edit">
			<input type="text" name="" value="acca重点">
			<textarea name="name">阿萨达十大恐龙当家阿山莨菪碱奥斯卡达拉斯简单看拉手建档立卡时间登录科雷</textarea>
		</div>




		<footer class="leave-msg">
			<div class="nav">
				<a href="javascript:;" class="upload-pic-btn">&#xe6ab;</a>
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

	.exchange-wrap-ipad-edit{

		font-size: 0;

		.edit{

			width: 96%; margin: 2% auto;

			input, textarea{
				border: 1px solid #eee;
				@extend .borderBox;
				@include fc(.24rem, #333);
				padding: .15rem .2rem;
			}

			input{
				@include wh(100%, .6rem);
				margin-bottom: .2rem;
			}

			textarea{
				@include wh(100%, 8.27rem);
			}
		}


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
			}
			.upload-pic-btn{
				@extend .ab;
				@include fc(.5rem, $green);
				top: .23rem; right: .3rem;
				font-family: 'iconfont';
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

	}


}


</style>
