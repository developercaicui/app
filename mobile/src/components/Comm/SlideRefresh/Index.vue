<template lang="html">

	<div class="slide-refresh-wrap" ref="refreshWrap" @touchstart="handleStart" @touchmove="handleMove" @touchend="handleEnd">

		<slot name="top">
			<div class="slide">
				<span class="text" v-show="topStatus !== 'loading'">{{ topText }}</span>
				<mt-spinner type="snake" color="#3CC6B3" v-show="topStatus === 'loading'"></mt-spinner>
			</div>
		</slot>

		<div class="slide-refresh-content" ref="refreshContent">
			<slot></slot>
		</div>
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
			isDirection: '',
			moveY: 0,
    }
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

	mounted() {

		let oHtml = document.documentElement

		this.screenWidth = oHtml.getBoundingClientRect().width || oHtml.clientWidth;
		this.screenHeight = oHtml.getBoundingClientRect().height || oHtml.clientHeight;
		this.contentHeight = this.$refs.refreshContent.offsetHeight;

		this.$refs.refreshWrap.style.cssText = `background-color: #F3F3F3;position: relative;width:${this.screenWidth}px; height:${this.screenHeight}px; overflow:hidden;`;
		this.$refs.refreshContent.style.cssText = ` width:${this.screenWidth}px;`

	},


  methods: {

		onTopLoaded() {

			this.topStatus = 'end';
			this.topAllLoaded = false;

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


	    this.downOff = true;

		},

		handleMove(ev) {

			let touch = ev.changedTouches[0];
			let moveY = 0;

			if(this.downOff){
	      this.downOff = false;
	      this.startY = touch.pageY;
	    }


			if(document.body.scrollTop <= 50 || document.body.scrollTop >= (this.contentHeight-this.screenHeight)-50) {

				moveY = (touch.pageY-this.startY) /3;

				this.moveY = moveY;

				// 下拉
				if(moveY > 0) {

					this.webApi.addCss(this.$refs.refreshContent, {
						transform: `translate3d(0, ${moveY}px, 0)`
					});

					if(moveY < 50) this.topStatus = 'pull';
					if(moveY > this.isDirection) this.topStatus = 'drop';


					this.isDirection = 'top';

				}
				// 上拉
				else {

					this.isDirection = 'bottom';

				}


	    }

		},

		handleEnd(ev) {


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


			setTimeout(()=>{
				if(this.topStatus === 'loading' && this.topAllLoaded === false)  this.onTopLoaded();
			}, 1000);

		},

  }

}

</script>

<style lang="scss" scoped>

 @import '../../../assets/style/mixin';

	.slide-refresh-content{
		position: relative;
		background-color: #fff;
		height:auto;
		overflow-y:auto;
		z-index: 9;

	}

 .slide{
	 	@extend .ab;
		@include fc(.24rem, #333);
		@extend .flexCenter;
		top: 0; left: 0; right: 0; height: 1.5rem;
		z-index: 1;
		span{
			text-align: center;
		}
 }


</style>
