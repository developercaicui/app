<template lang="html">

	<main class="mobile-wrap index-wrap-mobile">

		<Headers></Headers>

		<section class="the-course-wrap" ref="canvasArc">

			<div class="title">
				<h1>在学课程</h1>
				<a href="#">&#xe669;</a>
			</div>

			<a href="javascript:;" class="list" v-for="(item, index) in learningCourseList" v-if="index<3">
				<div class="info">
					<h1>{{item.courseName}}</h1>
					<time>有效期至：{{item.examinationDate}}</time>
				</div>
				<div class="process">
					<div class="round">
						<canvas :data-progress="item.studyProportion" class="canvas-list"></canvas>
						<div class="num">{{item.studyProportion}}</div>
					</div>
					<aside>{{`${item.courseProgress}/${item.taskTotal}`}}</aside>
				</div>
			</a>

		</section>

		<section class="the-course-wrap the-activity-wrap">

			<div class="title">
				<h1>财萃活动</h1>
				<a href="#">&#xe669;</a>
			</div> -->

			<ul v-for="item in activityList">
				<li :data-href="item.href" class="activity-list" :data-id="item.id">
					<img :src="item.src"/>
				</li>
			</ul>


		</section>

	</main>

</template>

<script>

import Headers from '../../../components/Header/Mobile';

export default {

	props: {
    'activity-list': [Array],
		'learning-course-list': [Array]
  },

	components: {
    Headers,
  },


	updated() {

		let canvasList = this.$refs.canvasArc.querySelectorAll('.canvas-list');
		let arr = ['#4a90e2','#3E4F61','#408684'];

		canvasList.forEach((obj, index) =>{

				let ctx = obj.getContext('2d');
				let r = obj.parentNode.getBoundingClientRect().width / 2;

				obj.width = obj.height = r * 2;

				drawArc(ctx, r, obj.dataset.progress, arr[index]);
		});


		function drawArc(ctx, r, num, backColor){

			// 底图
			ctx.beginPath();
			ctx.fillStyle = 'rgba(255,255,255,.5)';
			ctx.arc(r, r, r, 0, 2*Math.PI);
			ctx.fill();


			// 动画层
		  let sAngel = 0 * Math.PI;
		  let eAngel = 0 * Math.PI;
		  let aAngle = Math.PI*1.5;

			ctx.beginPath();
		  ctx.fillStyle = '#fff';
		  ctx.moveTo(r, r);
		  ctx.arc(r, r, r, sAngel, Math.PI*2*(num*0.01));
		  ctx.fill();

			// 覆盖层
			ctx.beginPath();
			ctx.fillStyle = backColor;
			ctx.arc(r, r, r-r/15, 0, 2*Math.PI);
			ctx.fill();


		}

	},

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

 $commColor: #00a185;

 .index-wrap-mobile{

	 font-size: 0;

	  .the-course-wrap{

	  	.title{
	  		position: relative;
				@include fc(.3rem, $commColor);
				border-left: .05rem solid $commColor;
				margin: .3rem;
				padding-left: .16rem; height: .3rem; line-height: 1;
				a{
					font-family: 'iconfont';
				  @extend .ab; right: 0; top: 0;
					transform: rotate(180deg);
				}
	  	}

	  }

		.list{

			@extend .show;
			height: 1.86rem;
			padding: .36rem .28rem;
			@extend .borderBox;

			&:nth-of-type(1){
				background-color: #4a90e2;
			}
			&:nth-of-type(2){
				background-color: #3E4F61;
			}
			&:nth-of-type(3){
				background-color: #408684;
			}
			.info{

				color: #fff;
				width: 4.4rem;
				float: left;

				h1{
					font-size: .28rem;
					margin-bottom: .1rem
				}

				time{
					font-size: .24rem;
					padding: .01rem .2rem;
					background-color: #999;
				}

			}

		}

		.activity-list{
			img{
				width: 100%;
			}
		}

		.process{
			@include wh(.8rem, 100%);
			float: right;
			margin-right: .7rem;
			text-align: center;
			position: relative;

			.round{
			 @include wh(.8rem, .8rem);
			}
			.num{
			 @include fc(.26rem, #fff);
			 @extend .ab;
			 left: 0; top: 0; right: 0; bottom: 0;
			 text-align: center; line-height: 3;
			 transform: translate3d(.08rem,.02rem,0);
			 &:after{
				 content: '%';
				 font-size: .24rem;
				 display: inline-block;
				 transform: scale(.6) translate3d(-.08rem,-.1rem,0);
			 }
			}
			aside{
			 @include fc(.20rem, #fff);
			 transform: translate3d(0,.1rem,0);
			}
		}

		.canvas-list{
 	 	 transform: rotate(-90deg);
 	 }

 }



</style>
