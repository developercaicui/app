<template lang="html">


	<div class="node-search-wrap-ipad">

		<header>
			<div class="enter-ipt">
				<input type="text" v-model="keywords" placeholder="搜索">
			</div>
			<div class="state-edit">
				<a href="javascript:;" @click.stop="searchCourse">搜索</a>
				<a href="javascript:;" @click.stop="backPreviousPage">取消</a>
			</div>
		</header>

		<main class="body-list">

			<section class="list" v-for="item in noteData.list" :data-id="item.id" :data-data="JSON.stringify(item)" @click="handleOpenDetails">
				<div>{{ item.nikeName }}</div>
				<h1>{{ item.title }}</h1>
				<p>{{ item.contentSummary }}</p>
				<time>{{ item.updateTime }}</time>
			</section>

			 <img src="../../../assets/img/404.svg" class="no-data" v-show="totalCount == 0">

		</main>

	</div>

</template>

<script>

export default {

	props: {
		noteData: {
			type: Object,
			default: {}
		}
 },


  data() {
    return {
			keywords: '',
			totalCount: 0, // 总条目数
			bottomStatus: '',
			topStatus: '',
			pageNo: 1, // 当前页数
			sumPage: 1, // 总页数
    }
  },

	created() {
	},

	mouthed() {
		this.isOneData = true;
	},

	updated() {

		if(this.noteData) this.totalCount = this.noteData.totalCount || 0;
		if(this.totalCount > 10) this.sumPage = Math.ceil(this.totalCount / 10); // 默认每页10条

	},

  methods: {

		// 上一页
		backPreviousPage() {
			this.$router.go(-1);
		},

		// 搜索课程笔记
		searchCourse() {

			let type = 1;

			if(this.keywords == '') {
				this.webApi.alert('搜索内容不能为空');
				return false;
			}
			// 是否搜索全部
			if(document.referrer.includes('coursenote')) type = 0;

			this.$emit('search-note', {
				keywords: this.keywords,
				pageNo: this.pageNo,
				self: type,
			});


		},

		handleOpenDetails(ev) {

			let oSection = this.webApi.recursiveParentNode(ev.target, 'section');
			let data = {
				courseData: {},
				sectionData: JSON.parse(oSection.dataset.data)
			};

			this.$router.push({
				path: `/note/details/${encodeURIComponent(JSON.stringify(data))}`,
			});



		},


  }

}

</script>

<style lang="scss" scoped>

	@import "../../../assets/style/mixin";

	.node-search-wrap-ipad{

		 font-size: 0;

		 // 下拉刷新
		> .body-list{

			font-size: .24rem;
			padding-top: 1.35rem;

			> .mint-loadmore{
				padding-bottom: .6rem;
				height: 100%;
			}
			.mint-loadmore-top{
				 color: #acacac;
			 	 display: flex;
				 justify-content: center;
				 align-items: flex-end;
				 height: auto;

				 > span:nth-of-type(3){
				 	  margin-top: .4rem;
				 }
			}
			.mint-loadmore-text{
				color: #ccc;
			}


			.no-data{
				@extend .ab;
				@include wh(2.4rem, 2.4rem);
				left: 50%; top: 4rem;
				margin-left: -1.2rem;
			}

		}




		> header{
			position: fixed;
			@include wh(100%, 1.45rem);
			left: 0; top: 0;
			border-top: $commTop solid #fff;
			border-bottom: 1px solid #B9B9B9;
			background-color: #fff;
			z-index: 9;
		}

		.enter-ipt{
			@extend .ab;
			@include wh(17.4rem, .5rem);
			left: .3rem; top: .25rem;
			&:before{
				@include fc(.46rem, #B9B9B9);
				@extend .ab;
				content: '\e651';
				font-family: 'iconfont';
				right: -.5rem; top: .03rem;
			}
			input{
				@include wh(100%, 100%);
				padding: 0 .3rem;
				font-size: .26rem;
				border-radius: .3rem;
				border: 1px solid #ccc;
			}
		}

		.state-edit{
			 @extend .ab;
			 right: .35rem; top: 0; bottom: 0;
			 font-size: $headFont;
			 a{
			 	 @extend .flexCenter;
				 float: left; height: 100%;
				 &:nth-of-type(1){
				 	color: $commPink;
					margin-right: .3rem;
				 }
				 &:nth-of-type(2){
				 	color: #ccc;
				 }
			 }
	  }



		.list{

			@include fc(.24rem, #333);
			padding: .35rem .5rem; line-height: 1;
			border-bottom: 1px solid #E2E2E2;
			font-size: .26rem;

			&:last-of-type{
				border-bottom-width: 0;
			}

			> div{
				color: #333;
			}
			p{
				color: #acacac;
			}
			h1{
				margin: .25rem 0;
			}
			time{
				@extend .show;
				color: #ACACAC;
				text-align: right;
				padding-bottom: .4rem;
			}

		}


	}


</style>
