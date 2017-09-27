<template lang="html">

	<div class="index-wrap-ipad">

		<Headers></Headers>

		<SlideRefresh @top-status-change="topStatusChange">

			<main class="index-content">

				<div class="the-course" ref="canvasArc">

					<div class="title">
						<h1>在学课程</h1>
					</div>

					<a @click.stop="handleSendCouseInfo" :data-data="JSON.stringify(item)" href="javascript:;" class="list" v-for="(item, index) in learningCourseList" v-show="index<=3">
						<div class="info">
							<h1>{{ item.courseName }}</h1>
							<time>有效期至：{{ item.examinationDate.includes('1970') ? '暂无考试' :item.examinationDate }}</time>
							<time>课程到期：{{ item.expirationTime }}</time>
						</div>
						<div class="process">
							<div class="round">
								<canvas :data-progress="item.studyProportion" class="canvas-list"></canvas>
								<div class="num">{{ item.studyProportion || 0 }}</div>
							</div>
							<aside>{{ `${item.courseProgress}/${item.taskTotal}` }}</aside>
						</div>
					</a>


				</div>

				<div class="the-course the-activity">

					<div class="title">
						<h1>财萃活动</h1>
					</div>

					<div class="activity-list" v-for="(item, index) in activityList" v-show="index < 3">
						<figure :data-href="item.url" :data-id="item.id" @click.stop="handleOpenActivity">
						  <img :src="`${webApi.cdnImgUrl}${item.imagePath}`" />
							<figcaption>{{ item.title }}</figcaption>
						</figure>
					</div>

				</div>



			</main>

		</SlideRefresh>


	</div>

</template>

<script>

import Headers from '../../../components/Header/';
import SlideRefresh from '../../../components/Comm/SlideRefresh';

export default {

	props: {
    activityList: {
			type: Array,
			default: []
		},
		learningCourseList: {
			type: Array,
			default: []
		}
  },

	components: {
    Headers,
		SlideRefresh
  },


  data() {
    return {
			topAllLoadEnd: false,
    }
  },

	updated() {

		let canvasList = this.$refs.canvasArc.querySelectorAll('.canvas-list');
		let arr = ['#4a90e2','#3E4F61','#408684', '#FF366D'];

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


	watch: {

	},

  methods: {

		// 课程的实时状态
		topStatusChange(status) {

			if(status == 'loading') {
				this.webApi.loadingData();
				this.$emit('fetch-data');
			}

		},

		// 发送课程信息给原生
		handleSendCouseInfo(ev) {

			let oA = this.webApi.recursiveParentNode(ev.target, 'a');
			let data = JSON.parse(oA.dataset.data);

			if(data.lockStatus && data.lockStatus != 0 ){
				this.webApi.alert('当前的课程已锁定,续费后即可解锁！');
				return false;
			}

			g.targetLearningCourses(oA.dataset.data);

		},


		// 打开活动页
		handleOpenActivity(ev) {

			let oFigure = this.webApi.recursiveParentNode(ev.target, 'figure');

			!oFigure.dataset.href ? this.webApi.alert('活动已过期', 1500) : g.openActivityPage(oFigure.dataset.href) ;

		},

  }

}

</script>

<style lang="scss" scoped>

@import "../../../assets/style/mixin";

.index-wrap-ipad{

	font-size: 0;

	.index-content{
		padding: 0 1.1rem;
		min-height: fill-available;
	  min-height: -webkit-fill-available;
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
		 padding: .26rem .28rem;
		 margin-right: .4rem; margin-bottom: .7rem;

		 &:nth-of-type(1){
			 background-color: #4a90e2;
		 }
		 &:nth-of-type(2){
			 background-color: #3E4F61;
		 }
		 &:nth-of-type(3){
			 background-color: #408684;
		 }
		 &:nth-of-type(4){
			 background-color: #FF366D;
		 }

		 .info{

			 color: #fff;
			 width: 4.4rem;
			 line-height: 1.2;
			 float: left;

			 h1{
				 font-size: .28rem;
				 margin-bottom: .15rem;
				 @extend .text-ellipsis;
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
		 position: relative;

		 .round{
		 	@include wh(1.2rem, 1.2rem);
		 }
		 .num{
		 	@include fc(.3rem, #fff);
			@extend .ab;
			left: 0; top: 0; right: 0; bottom: 0;
			text-align: center; line-height: 4;
			transform: translate3d(.1rem,.02rem,0);
			&:after{
				content: '%';
				font-size: .24rem;
				display: inline-block;
				transform: scale(.8) translate3d(0rem,-.1rem,0);
			}
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
		 padding-bottom: 1.1rem;
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

	 .canvas-list{
	 	 transform: rotate(-90deg);
	 }

}



</style>
