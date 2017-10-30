<template lang="html">

	<div class="slide-refresh-wrap" ref="refreshWrap" @touchstart="handleStart" @touchmove="handleMove" @touchend="handleEnd">

		<slot name="top">
			<div class="slide-top" v-if="isTopShow">
				<span class="text" v-show="topStatus !== 'loading'">{{ topText }}</span>
				<mt-spinner type="snake" :color="spanColor" v-show="topStatus === 'loading'"></mt-spinner>
			</div>
		</slot>

		<div class="slide-refresh-content" ref="refreshContent">
			<slot></slot>
		</div>

		<slot name="bottom">
			<div class="slide-bottom" v-if="isBottomShow">
				<span class="text" v-show="bottomStatus !== 'loading'">{{ bottomText }}</span>
				<mt-spinner type="snake" :color="spanColor" v-show="bottomStatus === 'loading'"></mt-spinner>
			</div>
		</slot>

	</div>

</template>

<script>


export default {

	props: {
		topMaxDistance: {
			type: Number,
			default: 75
		},
		topPullText: {
			type: String,
			default: '下拉刷新'
		},
		topDropText: {
			type: String,
			default: '释放更新'
		},
		topLoadingText: {
			type: String,
			default: '加载中...'
		},
		topAllLoaded: {
			type: Boolean,
			default: false
		},
		bottomMaxDistance: {
			type: Number,
			default: 75
		},
		bottomPullText: {
			type: String,
			default: '上拉刷新'
		},
		bottomDropText: {
			type: String,
			default: '释放更新'
		},
		bottomLoadingText: {
			type: String,
			default: '加载中...'
		},
		bottomAllLoaded: {
			type: Boolean,
			default: false
		},
		distanceTop: {
			type: Number,
			default: 0
		}
	},

  data() {
    return {
			downOff: false,
			startY: 0,
			screenHeight: 0,
			screenWidth: 0,
			contentHeight: 0,
			topText: '', // 文字提示
			topStatus: '', // 状态
			bottomText: '', // 文字提示
			bottomStatus: '', // 状态
			isDirection: '',
			moveY: 0,
			startTime: new Date().getTime(),
			isBottomShow: true,
			isTopShow: true,
			spanColor: process.env.NODE_ENV.includes('developZbgedu') ? '#FF366D' : '#00a185'
    }
  },

	created() {

		if(!this.$parent.bottomStatusChange) this.isBottomShow = false;
		if(!this.$parent.topStatusChange) this.isTopShow = false;

	},

	mounted() {

		this.$refs.refreshContent.style.minHeight = `${document.documentElement.getBoundingClientRect().height - this.distanceTop - this.$refs.refreshContent.getBoundingClientRect().top}px`;

		document.querySelectorAll('.v-wrap')[0].style.height = `auto`;

	},

	watch: {

		topAllLoaded(val) {

			if(val) {

				this.webApi.addCss(this.$refs.refreshContent, {
					transition: '300ms',
					transform: `translate3d(0,0,0)`
				});

				this.topStatus = 'end';

			}

		},

		bottomStatus(val) {


			this.$emit('bottom-status-change', val);

			switch (val) {

				case 'pull':
					this.bottomText = this.bottomPullText;
					break;
				case 'drop':
					this.bottomText = this.bottomDropText;
					break;
				case 'loading':
					this.bottomText = this.bottomLoadingText;
					break;
				case 'end':
				this.bottomText = '';
			}

		},

		topStatus(val) {

			this.$emit('top-status-change', val);

			switch (val) {

				case 'pull':
					this.topText = this.topPullText;
					break;
				case 'drop':
					this.topText = this.topDropText;
					break;
				case 'loading':
					this.topText = this.topLoadingText;
					break;
				case 'end':
				this.topText = '';
			}

		},

	},

	updated() {

		let oWrap = document.querySelectorAll('.v-wrap')[0];

		this.screenWidth = oWrap.getBoundingClientRect().width;
		this.screenHeight = oWrap.getBoundingClientRect().height;
		this.contentHeight = this.$refs.refreshContent.offsetHeight;

	},


  methods: {

		onTopLoaded(isOff) {

			this.topStatus = 'end';
			this.topAllLoaded = false;

			if(!isOff) return;

			this.webApi.addCss(this.$refs.refreshContent, {
				transition: '300ms',
				transform: 'translate3d(0,0,0)'
			});



		},

		onBottomLoaded(isOff) {

			this.bottomStatus = 'end';
			this.bottomAllLoaded = false;

			if(!isOff) return;

			this.webApi.addCss(this.$refs.refreshContent, {
				transition: '300ms',
				transform: 'translate3d(0,0,0)'
			});


		},

		handleStart(ev) {

			this.webApi.addCss(this.$refs.refreshContent, {
				transition: '0ms',
				transform: 'translate3d(0,0,0)'
			})

			this.startTime = new Date().getTime();

	    this.downOff = true;

		},

		handleMove(ev) {

			let touch = ev.changedTouches[0];
			let moveY = 0;

			if(this.downOff){
	      this.downOff = false;
	      this.startY = touch.pageY;
	    }

			if(document.body.scrollTop <= 20 || document.body.scrollTop >= (this.contentHeight-this.screenHeight)) {

				moveY = (touch.pageY-this.startY) /3;

				this.moveY = moveY;

				// 下拉
				if(moveY > 0 && this.isTopShow) {

					if(moveY < 50) this.topStatus = 'pull';
					if(moveY > 60) this.topStatus = 'drop';

					this.isDirection = 'top';

					this.webApi.addCss(this.$refs.refreshContent, {
						transform: `translate3d(0, ${moveY}px, 0)`
					});

				}

				// 上拉
				if(moveY < 0 && this.isBottomShow){

					if(Math.abs(moveY) < 50) this.bottomStatus = 'pull';
					if(Math.abs(moveY) > 60) this.bottomStatus = 'drop';

					this.isDirection = 'bottom';

					this.webApi.addCss(this.$refs.refreshContent, {
						transform: `translate3d(0, ${moveY}px, 0)`
					});

				}



	    }


		},

		handleEnd(ev) {

			let endTime = new Date().getTime();

			this.screenHeight = document.querySelectorAll('.v-wrap')[0].getBoundingClientRect().height;
			this.contentHeight = this.$refs.refreshContent.offsetHeight;

			// 下滑，
			if(this.isDirection == "top") {

				// 且大于最大滑动高
				if(this.moveY > this.topMaxDistance) {

					if(!this.downOff && this.moveY >= this.topMaxDistance) this.topStatus = 'loading';

					this.webApi.addCss(this.$refs.refreshContent, {
						transition: '300ms',
						transform: `translate3d(0,${this.topMaxDistance}px,0)`
					})

				}else{

					this.webApi.addCss(this.$refs.refreshContent, {
						transition: '300ms',
						transform: `translate3d(0,0,0)`
					});

				}

			}

			// 上滑
			if(this.isDirection == "bottom") {

				// 且大于最大滑动高
				if(Math.abs(this.moveY) > this.bottomMaxDistance) {

					if(!this.downOff && Math.abs(this.moveY) >= this.bottomMaxDistance) this.bottomStatus = 'loading';

					this.webApi.addCss(this.$refs.refreshContent, {
						transition: '300ms',
						transform: `translate3d(0,-${this.bottomMaxDistance}px,0)`
					})

				}else{

					this.webApi.addCss(this.$refs.refreshContent, {
						transition: '300ms',
						transform: `translate3d(0,0,0)`
					});

				}

			}

			// 点击时间过短不算滑动
			if(endTime - this.startTime < 300) {
				this.webApi.addCss(this.$refs.refreshContent, {
					transition: '0',
					transform: `translate3d(0,0,0)`
				});
			}


			if(!this.isTopShow) this.onTopLoaded(false);
			if(!this.isBottomShow) this.onBottomLoaded(false);

			setTimeout(()=>{
				if(this.bottomStatus === 'loading' && this.bottomAllLoaded === false)  this.onBottomLoaded(true);
				if(this.topStatus === 'loading' && this.topAllLoaded === false)  this.onTopLoaded(true);
			}, 1000);

		},

  },

}

</script>

<style lang="scss" scoped>

 @import '../../../assets/style/mixin';

	.slide-refresh-wrap{
		background-color: #F3F3F3;
		position: relative;
		overflow:hidden;
		@include wh(100%, auto);
	}

	.slide-refresh-content{
		position: relative;
		background-color: #fff;
		height:auto;
		z-index: 9;
	}

 .slide{
	  @extend .ab;
	 	@include fc(.24rem, #333);
	 	@extend .flexCenter;
		left: 0; right: 0; height: 1.5rem;
	 	z-index: 1;
	 	span{
	 		text-align: center;
	 	}
 }

 .slide-top{
 	 @extend .slide;
	 top: 0;
 }

 .slide-bottom{
 	 @extend .slide;
	 bottom: 0;
 }


</style>
