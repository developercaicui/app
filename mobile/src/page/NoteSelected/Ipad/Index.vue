<template lang="html">

	<div class="node-ipad-list">

		<header>
			<a href="javascript:;" @touchend.stop="handleBack">&#xe67f;</a>
			<h1>请选择课程</h1>
		</header>

		<SlideRefresh @top-status-change="topStatusChange">
		  <template v-for="(item, index) in selectedData.courselist">
			  <h1 :data-index="index" class="list-all" @click="openSectionList">{{ item.courseName }}</h1>
		  </template>
		</SlideRefresh>

	</div>

</template>

<script>

import SlideRefresh from '../../../components/Comm/SlideRefresh';

export default {

	components: {
		SlideRefresh
  },

	props: {
		'selectedData': {
			type: Object,
			default: {}
		}
	},

  data() {
    return {
    }
  },

  methods: {

		// 课程的实时状态
		topStatusChange(status) {

			if(status == 'loading') {
				this.webApi.loadingData();
				this.$store.dispatch('fetchNewNoteList');
			}

		},

		openSectionList(ev) {

			this.$router.push({
				path: `selectedsection/${encodeURIComponent(JSON.stringify(this.selectedData.courselist[ev.target.dataset.index]))}`,
			});

		},

		// 返回上一页
		handleBack() {
			this.$router.go(-1);
		},

  }

}

</script>

<style lang="scss" scoped>

	@import "../../../assets/style/mixin";

	.node-ipad-list{

		font-size: 0; line-height: 1;
		padding-top: $commTop;
		padding-bottom: .6rem;
		background-color: #fff;

		.list-all{
			 @include wh(100%, 1.2rem);
			 @include fc(.32rem, $commPink);
			 display: flex;
			 align-items: center;
			 justify-content: flex-start;
			 padding: 0 .75rem 0 .3rem;
			 background-color:  #f7f7f7;
			 border-bottom: 1px solid #eadfdf;
		}

		> header{
			position: relative;
			@include wh(100%, 1.05rem);
			border-bottom: 1px solid #B9B9B9;
			background-color: #fff;
			> a{
				@extend .ab;
				@include fc($commBackFont, $commPink);
				@include wh(1.5rem, 1.05rem);
				@extend .flexCenter;
				font-family: 'iconfont';
				left: 0; padding-left: .1rem; top: 0;
			}

			h1{
				@extend .flexCenter;
			  @include fc($headH1Font, #1D1D1D);
				height: inherit;
			}

		}




 }


</style>
