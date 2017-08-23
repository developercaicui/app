<template lang="html">

	<div class="note-wrap-ipad-edit">


		<header class="one-top">
			<a href="javascript:;">&#xe67f;</a>
			<h1>讨论详情</h1>
			<div class="state-edit">
				<a href="javascript:;">&#xe654;</a>
			</div>
		</header>

		<div class="edit">
			<div class="ban">
				<input type="text" name="" value="acca重点" class="ban">
				<span>2017-07-19</span>
			</div>
			<textarea name="name">阿萨达十大恐龙当家阿山莨菪碱奥斯卡达拉斯简单看拉手建档立卡时间登录科雷</textarea>
		</div>




		<footer class="leave-msg">
			<div class="nav">
				<a href="javascript:;" class="upload-pic-btn">&#xe6ab;</a>
				<div class="select-btn select-btn-active"><span>公开</span><i></i></div>
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

	.note-wrap-ipad-edit{

		font-size: 0;

		.edit{

			@include fc(.24rem, #ccc);

			textarea{
				width: 96%;
				@include wh(96%, 8.27rem);
				@extend .borderBox;
				color: #333;
				padding: .15rem .2rem;
				margin-left: 2%;
				border: 1px solid #eee;
			}

			.ban{
				@include wh(100%, 1rem);
				@extend .borderBox;
				position: relative;
				padding: 0 1%;
				border-bottom: 1px solid #eee;
				margin-bottom: .5rem;

				input{
					@include wh(8rem, .6rem);
					border: none;
					outline: 0; color: #ccc;
					margin-top: .2rem;
				}

				span{
					@extend .ab;
					@extend .flexCenter;
					top: 0; right: 1rem;
					height: 1rem;
					&:after{
						@extend .ab;
						content: '\e669';
						font-family: 'iconfont';
						font-size: .4rem;
						transform: rotate(-180deg) translate3d(-.3rem,.05rem,0);
					}
				}

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
				top: .23rem; right: 1.9rem;
				font-family: 'iconfont';
			}
		}

		.select-btn{
			@extend .ab;
			@include wh(1.05rem, .4rem);
			right: .4rem; top: .3rem;
			background-color: #e0e0e0;
			border-radius: .2rem;
			padding: 0 .1rem;
			span{
				@include fc(.24rem, #fff);
				height: inherit;
				display: flex;
				align-items: center;
				justify-content: start-end;
				transform: scale(.8);
				transition: .5s;
			}
			i{
				@extend .show;
				@extend .ab;
				@include wh(.32rem, .32rem);
				background-color: #fff;
				transition: .5s;
				top: .04rem; right: 0;
				border-radius: 100%;
				transform: translate3d(-.05rem,0,0);
			}
			&.select-btn-active{
				background-color: $green;
				span{
					justify-content: flex-end;
				}
				i{
					transform: translate3d(-.68rem,0,0);
				}
			}
		}


		.state-edit{
			@extend .ab;
			right: .35rem; top: 50%; transform: translateY(-50%);
			font-family: 'iconfont';
			a{
				color: $green;
				font-size: .38rem;
				margin-right: .3rem;
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
