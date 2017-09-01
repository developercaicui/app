<template lang="html">

	<div class="node-ipad-list">

		<header class="head">
			<h1>章节列表</h1>
			<div class="state-edit">
				<router-link to="search">&#xe651;</router-link>
				<router-link to="selected">新建&nbsp;<span>+</span></router-link>
			</div>
		</header>
		<main class="list-wrap">

			<template v-for="item in sectionList">

				<h1 :data-id="item.id">{{item.courseName}}</h1>

				<template v-for="twoItem in item.children">

					<section class="list" :data-id="twoItem.id" v-if="twoItem.nodeNum!=0">
						<div>
							<span></span>
							<h1>{{twoItem.chapterTitle}}</h1>
						</div>

						<template v-for="threeItem in twoItem.children">

						<section class="list" :data-course="JSON.stringify(item)" :data-chapter="JSON.stringify(twoItem)" :data-chaptertwo="JSON.stringify(threeItem)" @touchend.stop="openNoteDetails" :data-id="threeItem.id" v-if="threeItem.nodeNum!=0">
							<div>
								<h1>{{threeItem.chapterTitle}}</h1>
								<i>{{threeItem.nodeNum}}</i>
							</div>

						</section>

						</template>

					</section>

			   </template>

			</template>

			<!-- <div class="no-data" v-show="totalCount == 0"><img src="../../../assets/img/404.svg"></div> -->
			<img class="no-data" v-show="totalCount == 0" src="../../../assets/img/404.svg">
		</main>
	</div>

</template>

<script>

export default {

	props: {
		'section-list': [Array]
	},

  data() {
    return {
			totalCount: 0, //总条目数
    }
  },

	updated() {
		this.totalCount = this.sectionList.length || 0;
	},

  methods: {

		openNoteDetails(ev) {

			let oSection = this.webApi.recursiveParentNode(ev.target, 'section');
			let course = JSON.parse(oSection.dataset.course);
			let chapter = JSON.parse(oSection.dataset.chapter);
			let chapterTwo = JSON.parse(oSection.dataset.chaptertwo);
			let data = {
				courseData:  Object.assign(course, chapter, chapterTwo)
			}

			console.log(data, 'note > detailslist');
			//
			this.$router.push({
				path: `detailslist/${encodeURIComponent(JSON.stringify(data))}`,
			});

		},

  }

}

</script>

<style lang="scss" scoped>

	@import "../../../assets/style/mixin";

	$green: #46C1AA;

	.node-ipad-list{

		font-size: 0; line-height: 1;

		.list{

			padding: 0 .75rem;
			border-bottom: 1px solid #f5f5f5;

			> section.list{
			  padding-left: 0rem;
				padding-right: 0;
				> section.list{
					padding-left: 0;
					> div span{
						@extend .hide;
					}
					> div h1{
						font-size: .24rem;
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
				@include fc(.32rem, $green);
				display: flex;
				align-items: center;
				justify-content: flex-start;
				padding: 0 .75rem 0 .3rem;
				background-color:  #f7f7f7;
			}

		}

		header.head{

			position: relative;
			@include wh(100%, 1.05rem);
			border-bottom: 1px solid #B9B9B9;
			background-color: #fff;

			h1{
				@extend .flexCenter;
			  @include fc(.3rem, #1D1D1D);
				height: inherit;
			}

		 }

		 .state-edit{
 			@extend .ab;
 			right: .35rem; top: 50%; transform: translateY(-50%);
 			font-family: 'iconfont';
 			a{
 				color: $green;
 				&:nth-of-type(1){
 					font-size: .3rem;
 					margin-right: .2rem;
					transform: translate3d(0,.2rem,0);
 				}
 				&:nth-of-type(2){
 					font-size: .24rem;
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
