<template lang="html">


	<div class="node-detailslist-wrap-ipad">

		<header class="one-top">
			<a href="javascript:;" @touchend="backList">章节列表</a>
			<h1>{{ data.courseData.chapterTitle }}</h1>
			<div class="state-edit">
				<router-link to="/note/selected">新建&nbsp;<span>+</span></router-link>
			</div>
		</header>

		<main>

			<section class="list" :data-section="JSON.stringify(item)" v-for="item in detailsList" :data-id="item.id" @touchend="openDetails">
				<div>{{ item.nikeName }}</div>
				<h1>{{ item.chaptername }}</h1>
				<p>{{ item.contentSummary }}</p>
				<time>{{ item.updateTime }}</time>
			</section>

			<img class="no-data" v-show="this.detailsList.length === 0" src="../../../assets/img/404.svg"/>

		</main>


	</div>

</template>

<script>

export default {

	props: {
		'details-list': {
			type: Array,
			default: []
		},
	},

  data() {
    return {
			data: {
				chaptername: '',
				data: {},
			}
    }
  },

	created() {

		this.data = JSON.parse(this.$route.params.data);

	},

  methods: {

		openDetails(ev) {

			let oSection = this.webApi.recursiveParentNode(ev.target, 'section');
			let data = {
				courseData: this.data.courseData,
				sectionData: JSON.parse(oSection.dataset.section)
			};

			this.$router.push({
				path: `/note/details/${encodeURIComponent(JSON.stringify(data))}`,
			});


		},

		// 上一页
		backList() {
			this.$router.go(-1);
		}

  }

}

</script>

<style lang="scss" scoped>

	@import "../../../assets/style/mixin";

	$green: #12B697;

	.node-detailslist-wrap-ipad{

		font-size: 0;
		padding-top: $commTop;
		background-color: #fff;

		.one-top{
			position: relative;
			@include wh(100%, 1.05rem);
			border-bottom: 1px solid #B9B9B9;
			background-color: #fff;
			> a{
				@extend .ab;
				left: .3rem; padding-left: .45rem;
				top: 50%; transform: translateY(-50%);
				@include fc($headFont, $commPink);
				&:before{
					content: '\e669';
					@include fc($commBackFont, $commPink);
					@extend .ab;
					font-family: 'iconfont';
					transform: translate3d(-.54rem, -.1rem, 0);
				}
			}

			h1{
				@extend .flexCenter;
				@include fc($headH1Font, #1D1D1D);
				height: inherit;
			}

		}



		.list{

			@include fc(.26rem, #333);
			padding: .35rem .5rem; line-height: 1;
			border-bottom: 1px solid #E2E2E2;

			> div{
				color: #333;
			}
			p{
				@include fc(.26rem, #acacac);
			}
			h1{
				font-size: .26rem;
				margin: .25rem 0;
			}
			time{
				@extend .show;
				color: #ACACAC;
				text-align: right;
				padding-bottom: .4rem;
			}

		}


		.state-edit{
			 @extend .ab;
			 right: .35rem; top: 50%; transform: translateY(-50%);
			 font-family: 'iconfont';
			 a{
			 	 @include fc($headFont, $commPink);
			 }
	  }

		.no-data{
			@extend .ab;
			@include wh(2.4rem, 2.4rem);
			left: 50%; top: 5rem;
			margin-left: -1.2rem;
		}

	}


</style>
