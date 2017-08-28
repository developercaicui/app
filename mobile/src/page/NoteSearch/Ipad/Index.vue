<template lang="html">


	<div class="node-search-wrap-ipad">

		<header>
			<div class="enter-ipt">
				<input type="text" v-model="keywords" placeholder="搜索">
			</div>
			<div class="state-edit">
				<a href="javascript:;" @touchend="searchCourse">搜索</a>
				<router-link to="list">取消</router-link>
			</div>
		</header>

		<main class="body-list">

			<mt-loadmore @bottom-status-change="handleBottomChange"  @top-status-change="handleTopChange" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">

				<div slot="top" class="mint-loadmore-top">
					<span v-show="topStatus === 'pull'" :class="{ 'rotate': topStatus === 'pull' }">下拉刷新</span>
					<span v-show="topStatus === 'drop'" :class="{ 'rotate': topStatus === 'drop' }">释放更新</span>
					<mt-spinner v-show="topStatus === 'loading'" type="snake" color="#ccc"></mt-spinner>
				</div>

					<section class="list" v-for="item in noteData.list" :data-id="item.id">
						<div>{{ item.nikeName }}</div>
						<h1>{{ item.title }}</h1>
						<p>{{ item.contentSummary }}</p>
						<time>{{ item.updateTime }}</time>
					</section>

					<div slot="bottom" class="mint-loadmore-top">
						<mt-spinner v-show="bottomStatus == 'loading'" type="triple-bounce" color="#12B697"></mt-spinner>
						<span v-show="bottomStatus === 'pull'" :class="{ 'rotate': bottomStatus === 'pull' }">下拉刷新</span>
						<span v-show="bottomStatus === 'drop'" :class="{ 'rotate': bottomStatus === 'drop' }">释放更新</span>
					</div>

			</mt-loadmore>

			<div class="no-data" v-show="totalCount == 0"><img src="../../../assets/img/404.svg"></div>

		</main>




	</div>

</template>

<script>

export default {

	props: {
	 'note-data': [Object]
 },


  data() {
    return {
			keywords: '文字',
			totalCount: 0, // 总条目数
			bottomStatus: '',
			topStatus: '',
			pageNo: 1, // 当前页数
			sumPage: 1, // 总页数
			isOneData: false, // 是否是第一次
			allLoaded: false, // 数据是否全部加载完成
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



		handleTopChange(status) {

			this.topStatus = status;

			if(status == 'loading') setTimeout(() =>{ this.topStatus = '' },1000);

		},

		handleBottomChange(status) {

			this.bottomStatus = status;
			console.log(status, `asdsa:${this.totalCount}`)

		},

		loadTop() {
			// 假刷新
		},

		loadBottom() {

			this.$emit('search-note', {
				keywords: '文字',
				pageNo: this.pageNo
			});

			this.pageNo = this.pageNo + 1;

			// 调用父组件

		},



		// 搜索课程笔记
		searchCourse() {


			this.$emit('search-note', {
				keywords: this.keywords,
				pageNo: this.pageNo
			});


		},

  }

}

</script>

<style lang="scss" scoped>

	@import "../../../assets/style/mixin";

	$green: #12B697;

	.node-search-wrap-ipad{

		 font-size: 0;

		 // 下拉刷新
		> .body-list{

			font-size: .24rem;
			padding-top: 1.05rem;

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
			@include wh(100%, 1.05rem);
			left: 0; top: 0;
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
				border-radius: .3rem;
				border: 1px solid #ccc;
			}
		}

		.state-edit{
			 @extend .ab;
			 right: .35rem; top: 50%; transform: translateY(-50%);
			 font-size: .27rem;
			 a{
				 &:nth-of-type(1){
				 	color: $green;
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

			&:last-of-type{
				border-bottom-width: 0;
			}

			> div{
				color: #333;
			}
			p{
				@include fc(.24rem, #acacac);
			}
			h1{
				font-size: .24rem;
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
