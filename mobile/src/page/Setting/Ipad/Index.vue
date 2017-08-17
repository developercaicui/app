<template lang="html">

	<main class="content-padding-left index-wrap-ipad">

		<Headers></Headers>


		<div class="index-content">

			<div class="the-course" ref="canvasArc">

				<div class="title">
					<h1>在学课程</h1>
				</div>

				<a href="javascript:;" class="list">
					<div class="info">
						<h1>复习串讲－ACCA F2 AccoACCA ntant inBusiness</h1>
						<time>有效期至：2017/05/03</time>
						<time>课程到期：2017/08/12</time>
					</div>
					<div class="process">
						<div class="round">
							<canvas data-progress="25" class="canvas-list"></canvas>
						</div>
						<aside>4/68</aside>
					</div>
				</a>

			</div>

			<div class="the-course the-activity">

				<div class="title">
					<h1>财萃活动</h1>
				</div>

				<div class="activity-list" v-for="item in activityList">
					<figure :data-href="item.href" :data-id="item.id">
					  <img :src="item.src" />
						<figcaption>{{item.title}}</figcaption>
					</figure>
				</div>

			</div>



		</div>

	</main>

</template>

<script>

import Headers from '../../../components/Header/Ipad';


export default {

	props: {
    'activity-list': [Array]
  },


	updated() {

		let canvasList = this.$refs.canvasArc.querySelectorAll('.canvas-list');

		canvasList.forEach(obj =>{

				let ctx = obj.getContext('2d');
				let r = obj.parentNode.getBoundingClientRect().width / 2;

				obj.width = obj.height = r * 2;

				drawArc(ctx, r, obj.dataset.progress);
		});


		function drawArc(ctx, r, num){

			// 底图
			ctx.beginPath();
			ctx.fillStyle = '#fff';
			ctx.arc(r, r, r, 0, 2*Math.PI);
			ctx.fill();


			// 动画层
		  let sAngel = 0 * Math.PI;
		  let EAngel = 0 * Math.PI;
		  let aAngle = Math.PI*1.5;

		  ctx.beginPath();
		  ctx.fillStyle = '#f60';
		  ctx.moveTo(r, r);
		  ctx.arc(r, r, r, sAngel, aAngle);
		  ctx.fill();


			// 覆盖层
			ctx.beginPath();
			ctx.fillStyle = '#4a90e2';
			ctx.arc(r, r, r-r/15, 0, 2*Math.PI);
			ctx.fill();

			// if(num < 10){
			//
			// }else if( num > 99){
			//
			// }

			ctx.beginPath();
			ctx.font = '.23rem';
			ctx.fillStyle = '#fff';
			ctx.fillText('%', r+r/4, r+r/15);

			ctx.font = '.36rem PingFang SC, Helvetica Neue, Helvetica, STHeiTi, sans-serif';
			ctx.fillText(num, r-r/2, r+r/15*3);

		}

	},

	components: {
    Headers,
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

.index-wrap-ipad{

	font-size: 0;


	.index-content{
		padding: 0 1.1rem;
	}

	.title{
		 position: relative;
		 @include fc(.32rem, #666);
		 padding: .6rem 0;
	 }

	 .list{

		 display: inline-block;
		 @include wh(6.76rem, 2.1rem);
		 @extend .borderBox;
		 background-color: #4a90e2;
		 padding: .26rem .28rem;

		 .info{

			 color: #fff;
			 width: 4.4rem;
			 line-height: 1.2;
			 float: left;

			 h1{
				 font-size: .28rem;
				 margin-bottom: .15rem;
			 }

			 time{

				 @extend .show;
				 font-size: .24rem;

				 &:nth-of-type(1){
				 	 width: 3.7rem; padding-top: .15rem;
				 	 border-top: 1px solid #fff; margin-bottom: .05rem;
				 }

			 }

		 }

	 }

	 .process{
		 @include wh(1.2rem, 100%);
		 float: left;
		 margin-left: .1rem;
		 text-align: center;

		 .round{
		 	@include wh(1.2rem, 1.2rem);
		 }
		 aside{
		 	@include fc(.20rem, #fff);
			transform: translate3d(0,.1rem,0);
		 }
	 }

	 .the-activity{
	 	 margin-top: .6rem;
		 border-top: 1px solid #eee;
		 padding-left: 0; padding-right: 0;
	 }

	 .activity-list{

		 @include wh(5rem, 2.18rem);
		 display: inline-block;
		 margin-bottom: .5rem; margin-right: .5rem;

		 &:nth-of-type(3n){
			 margin-left: 0rem;
		 }

		 figcaption{
		 	@include fc(.26rem, #666);
			padding-top: .2rem;
		 }

		 img{
		 	@include wh(100%, 100%);
		 }

	 }

}



</style>
