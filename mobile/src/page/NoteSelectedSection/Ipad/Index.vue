<template lang="html">

	<div class="node-ipad-list">

		<header>
			<a href="javascript:;" @click.stop="handleBack">&#xe67f;</a>
			<h1>请选择章节</h1>
		</header>

		<main class="list-wrap">


			<template v-for="item in sectionList">

				<section :data-section="JSON.stringify(item)" class="list" @touchend.stop="isUnfold">
					<div>
					  <span></span>
					  <h1>{{ item.chapterTitle }}</h1>
				  </div>

					<template v-for="towItem in item.children">

						<section :data-section="JSON.stringify(towItem)" class="list" @touchend.stop="isUnfold">
						  <div>
								<span v-show="towItem.children"></span>
								<h1>{{ towItem.chapterTitle }}</h1>
							</div>

							<template v-for="threeItem in towItem.children">

								<section :data-section="JSON.stringify(threeItem)" class="list" @touchend.stop="isUnfold">
								  <div>
										<span v-show="towItem.children"></span>
										<h1>{{ threeItem.chapterTitle }}</h1>
									</div>
								</section>

							</template>

					  </section>

					</template>


			  </section>

			</template>

		</main>

	</div>

</template>

<script>

export default {

	props: {
		'section-list': {
			type: Array,
			default: []
		},
		'course-data': {
			type: Object,
			default: {}
		}
	},

  data() {
    return {
    }
  },

	created(){

	},

  methods: {

		openNoteDetails(ev) {

			let oSection = this.webApi.recursiveParentNode(ev.target, 'section');

			this.$router.push({
				path: `detailslist?id=${oSection.dataset.id}`,
			});

		},

		// 是否展开
		isUnfold(ev) {

			let oSection = this.webApi.recursiveParentNode(ev.target, 'section')
			let oldClassHeight = oSection.getBoundingClientRect().height;
			let data = {
				type: 'new',
				courseData: this.courseData,
				sectionData: JSON.parse(oSection.dataset.section)
			}

			oSection.classList.contains('list-hide') ? oSection.classList.remove('list-hide') : oSection.classList.add('list-hide') ;

			// 选择此章节，编辑
			if(oldClassHeight == oSection.getBoundingClientRect().height){
				this.$router.push({
					path: `/note/edit/${encodeURIComponent(JSON.stringify(data))}`
				});
			}

		},

		// 返回前一页
		handleBack() {
			this.$router.go(-1);
		}

  }

}

</script>

<style lang="scss" scoped>

	@import "../../../assets/style/mixin";

	$green: #46C1AA;

	.node-ipad-list{

		font-size: 0; line-height: 1;
		padding-top: $commTop;
		background-color: #fff;

		.list{

			transition: .3s;
			height: auto;
			overflow: hidden;

			> section.list{
			  padding-left: .4rem;
				padding-right: 0;
				> section.list{
					padding-left: .4rem;
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
				border-bottom: 1px solid #f5f5f5;
				padding: 0 .75rem;

				span{
					@extend .ab;
 					left: -.18rem; padding-left: .45rem;
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

		> header{
			position: relative;
			@include wh(100%, 1.05rem);
			border-bottom: 1px solid #B9B9B9;
			background-color: #fff;
			> a{
				@extend .ab;
				@include fc($commBackFont, $commPink);
				font-family: 'iconfont';
				left: .38rem; padding-left: .1rem;
				top: 50%; transform: translateY(-50%);
			}

			h1{
				@extend .flexCenter;
			  @include fc($headH1Font, #1D1D1D);
				height: inherit;
			}

		}

		.list-hide{
			height: 1.2rem;
			> div > span:after{
				transform: rotate(-180deg);
			}
		}

 }


</style>
