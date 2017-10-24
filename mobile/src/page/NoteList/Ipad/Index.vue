<template lang="html">

	<div class="node-ipad-list">

		<header class="head">
			<h1>章节列表</h1>
			<div class="state-edit">
				<router-link to="/note/search">&#xe651; </router-link>
				<router-link to="/note/selected">新建&nbsp;<span>+</span></router-link>
			</div>
		</header>

		<SlideRefresh @top-status-change="topStatusChange">

			<main class="list-wrap">

				<template v-for="item in sectionList">

					<h1 :data-id="item.id">{{ item.courseName }}</h1>

					<template v-for="twoItem in item.children">

						<section v-if="twoItem.nodeNum != 0" class="list" :data-id="twoItem.id">
							<div>
								<span></span>
								<h1 @click.stop="shrinkList">{{ twoItem.chapterTitle }}</h1>
							</div>

							<template v-for="threeItem in twoItem.children">

							<section v-if="threeItem.nodeNum != 0" class="list" :data-course="JSON.stringify(item)" :data-chapter="JSON.stringify(twoItem)" :data-chaptertwo="JSON.stringify(threeItem)"  @click.stop="openNoteDetails($event, threeItem.isLeaf)" :data-id="threeItem.id">
								<div>
									<h1 :data-nodenum="threeItem.nodeNum">{{ threeItem.chapterTitle }}</h1>
									<i v-if="threeItem.nodeNum > 0 && threeItem.isLeaf">{{ threeItem.nodeNum }}</i>
								</div>

								<template v-for="fourItem in threeItem.children">
									<section v-if="fourItem.nodeNum != 0" class="list" :data-course="JSON.stringify(item)" :data-chapter="JSON.stringify(threeItem)" :data-chaptertwo="JSON.stringify(fourItem)" @click.stop="openNoteDetails($event, true)" :data-id="fourItem.id">
										<div>
											<h1 :data-nodenum="fourItem.nodeNum">{{ fourItem.chapterTitle }}</h1>
											<i v-if="fourItem.nodeNum > 0">{{ fourItem.nodeNum }}</i>
										</div>
									</section>
								</template>

							</section>

							</template>

						</section>

				   </template>

				</template>

				<img class="no-data" v-show="!this.firstLoading && this.sectionList && this.sectionList.length === 0" src="../../../assets/img/404.svg"/>

			</main>

	 </SlideRefresh>

	</div>

</template>

<script>

import SlideRefresh from '../../../components/Comm/SlideRefresh';

export default {

	props: {
		sectionList: {
			type: Array,
			default: []
		}
	},

	components: {
		SlideRefresh
  },

  data() {
    return {
			firstLoading: true, // 是否是首次加载
    }
  },

	watch: {

		sectionList() {
			this.firstLoading = false;
		}

	},

  methods: {

		// 实时状态
		topStatusChange(status) {
			if(status == 'loading') this.$emit('fetch-list');
		},

		// 收缩列表
		shrinkList(ev) {

			let oSection = this.webApi.recursiveParentNode(ev.target, 'section');

			oSection.classList.contains('shrink-list') ? oSection.classList.remove('shrink-list') : oSection.classList.add('shrink-list');

		},

		openNoteDetails(ev, isOff) {

			let _obj = ev.target;

			if(_obj.dataset.nodenum < 1 || !isOff) return;

			let oSection = this.webApi.recursiveParentNode(ev.target, 'section');
			let course = JSON.parse(oSection.dataset.course);
			let chapter = JSON.parse(oSection.dataset.chapter);
			let chapterTwo = JSON.parse(oSection.dataset.chaptertwo);
			let data = {
				courseData:  Object.assign(course, chapter, chapterTwo),
				self: 1
			}

			this.$router.push({
				path: `/note/detailslist/${encodeURIComponent(JSON.stringify(data))}`,
			});

		},

  }

}

</script>

<style lang="scss" scoped>

	@import "../../../assets/style/mixin";

	.node-ipad-list{

		font-size: 0; line-height: 1;
		padding-top: $commTop;
		background-color: $commTopBack;

		.list{

			padding: 0 .75rem;
			border-bottom: 1px solid #f5f5f5;

			> section.list{
			  padding-left: 0rem;
				padding-right: 0;
				> section.list{
					padding-left: .3rem;
					> div span{
						@extend .hide;
					}
					> div h1{
						font-size: .24rem;
					}
				}

			}

			&.shrink-list{
				height: 1.2rem;
				overflow: hidden;
				> div{
					> span:after{
							transform: rotate(-270deg);
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

			> h1{
				@include wh(100%, 1.2rem);
				@include fc(.32rem, $commPink);
				display: flex;
				align-items: center;
				justify-content: flex-start;
				padding: 0 .75rem 0 .3rem;
				background-color:  #f7f7f7;
			}

		}

		header.head{

			@include wh(100%, 1.46rem);
			position: relative;
			border-bottom: 1px solid #B9B9B9;
			background-color: #f5f5f5;

			h1{
				@extend .flexCenter;
			  @include fc(.3rem, #1D1D1D);
				height: inherit;
				padding-top: 0.4rem;
			}

		 }

		 .state-edit{
 			@extend .ab;
 			right: .35rem; top: 28%; bottom: 0;
 			font-family: 'iconfont';
 			a{
 				color: $commPink;
				@extend .flexCenter;
				height: 100%; float: left;
 				&:nth-of-type(1){
 					margin-right: .4rem;
					font-size: $headIconFont;
 				}
 				&:nth-of-type(2){
 					font-size: $headFont;
 				}
 			}
 		}

		.no-data{
			@extend .ab;
			@include wh(2.4rem, 2.4rem);
			left: 50%; top: 4rem;
			margin-left: -1.2rem;
		}

 }


</style>
