<template lang="html">

	<div class="pic-list-wrap">
		<header>
			<a href="javascript:;" class="back" @touchend="handleCloseBigShow">&#xe669;</a>
			<span ref="listInfo"></span>
			<a href="javascript:;">&#xe60f;</a>
	  </header>

		<main>
			<ul class="pic-list">
				<li @touchstart="tStart"  @touchmove="tMove"  @touchend="tEnd"  v-for="(item, index) in picList" :style="disposeCss(index)" :data-index="index"><img :src="item"></li>
			</ul>
		</main>
	</div>

</template>

<script>


export default {

	props: {
		'pic-list': [Array]
	},
	components: {
  },

  data() {
    return {
			nowIndex: -0, // 默认第几张图片
			screenWidth: 0, // 屏幕宽度
			startX: 0, // 按下的X
			numX: 0, // 上一次停留位置
			touchLength: 1, // 几根手指
			oLi: null, // 当前的LI
			oUl: null, // Ul

    }
  },


	 updated() {

		// 相册基本初始
		let oHtml = document.documentElement;

		this.screenWidth =  oHtml.clientWidth || oHtml.getBoundClientRect().width
		this.$refs.listInfo.innerHTML = `1/${this.picList.length}`;
	},

  methods: {

		// css 处理
		disposeCss(index = 0) {
			return `z-index:${index + 1}; width:${this.screenWidth}px;transform:translate3d(${index * this.screenWidth}px,0,0)`;
		},

		// 关闭大图显示
		handleCloseBigShow() {
			this.$emit('closeBigPic', false)
		},

		// 按下
		tStart(ev) {

			const targetTouchs = ev.targetTouches;
			const changeTouch = ev.changedTouches[0];

			let oLi =  this.webApi.recursiveParentNode(ev.target, 'li');
			let oUl = oLi.parentNode;


			this.touchLength = targetTouchs.length;

			if (this.touchLength === 1) oneTouch.call(this);
			// if (this.touchLength === 2) twoTouch.call(this);


			function oneTouch() {
				this.webApi.addCss(oUl, { 'transition': '0s' });
				this.startX = changeTouch.clientX;
			}

			// function twoTouch() {
			// 	console.log(targetTouchs);
			// 	console.log(targetTouchs[0].clientX, targetTouchs[0].clientY)
			// 	console.log(targetTouchs[1].clientX, targetTouchs[1].clientY)
			// }

		},

		// 滑动
		tMove(ev) {

			const targetTouchs = ev.targetTouches;
			const changeTouch = ev.changedTouches[0];

			let oLi =  this.webApi.recursiveParentNode(ev.target, 'li');
			let oUl = oLi.parentNode;

			if(this.touchLength === 1) oneTouch.call(this, changeTouch);
			// if(this.touchLength === 2) twoTouch.call(this);

			function oneTouch(touch) {
				this.webApi.addCss(oUl, {
					'transform': `translate3d(${touch.clientX - this.startX + this.numX}px,0,0)`
				});
			}

			// function twoTouch() {
			// 	console.log(targetTouchs[0].clientX, targetTouchs[0].clientY, 'move')
			// 	console.log(targetTouchs[1].clientX, targetTouchs[1].clientY, 'move')
			// }

		},

		// 抬起
		tEnd(ev) {

			const targetTouchs = ev.targetTouches;
			const changeTouch = ev.changedTouches[0];

			let oLi =  this.webApi.recursiveParentNode(ev.target, 'li');
			let oUl = oLi.parentNode;


			if(this.touchLength === 1) oneTouch.call(this, changeTouch);
			// if(this.touchLength === 2) twoTouch.call(this);



			function oneTouch(touch) {

				this.webApi.addCss(oUl, { 'transition': '.3s ease' });

				if (Math.abs(this.startX - touch.clientX) > this.screenWidth / 3) {

					this.startX - touch.clientX > 0 ? this.nowIndex-- : this.nowIndex++;

					if (-this.nowIndex <= 0) this.nowIndex = 0;
					if (-this.nowIndex >= this.picList.length - 1) this.nowIndex = -(this.picList.length - 1);

					this.numX = this.nowIndex * this.screenWidth;

					this.$refs.listInfo.innerHTML = `${-this.nowIndex + 1}/${this.picList.length}`;
				}

				this.webApi.addCss(oUl, {
					'transform': `translate3d(${this.numX}px,0,0)`
				});

			}

			// function twoTouch() {
			// 	console.log(targetTouchs);
			// 	console.log(targetTouchs[0].clientX, targetTouchs[0].clientY)
			// 	console.log(targetTouchs[1].clientX, targetTouchs[1].clientY)
			// }


		},



  }

}

</script>

<style lang="scss" scoped>

@import '../../../assets/style/mixin';

.pic-list-wrap{

	font-size: 0;
	position: fixed;
	left: 0; right: 0; bottom: 0; top: 0;
	background-color: #000;
	> header {
		@include wh(100%, 1rem);
		@include fc(.36rem, #fff);
		@extend .flexCenter;
		margin-top: .2rem;
		letter-spacing: .05rem;
		text-indent: -.3rem;
		a{
			@extend .ab;
			@include fc(.36rem, #fff);
			font-family: 'iconfont';
			&:nth-of-type(1){
				left: 1rem; font-size: .4rem;
			}
			&:nth-of-type(2){
				right: .5rem;
			}
		}
	}

	main{
		position: relative;
		@include wh(100%, 100%)
		overflow: hidden;
	}
	.pic-list{
		@include wh(auto, 100%)
		position: absolute;
		left: 0;
		li{
			@include wh(100%, 100%);
			@extend .flexCenter;
			position: absolute;
			left: 0;
		}
		img{
			margin-top: -2rem;
			max-width: 100%; width: auto;
		}
	}
}

</style>
