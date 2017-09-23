<template lang="html">


	<div class="exchange-wrap-ipad">

		<main class="one-list">

			<header class="one-top">
				<a href="javascript:;" @touchend="handleOpenSelect">{{ sortTypeText }}</a>
				<ul class="type-list" v-show="typeShow">
					<li v-for="(item, index) in msgTypeAll" :data-index="index" @touchend.stop="handleAffirmType">{{ item.text }}</li>
				</ul>
				<h1>我的讨论</h1>
			</header>

			<SlideRefresh  @top-status-change="topStatusChange">

				<section class="list" v-for="item in exchangeData.data" :data-id="item.id" @touchend="targetDetails">
					<div>{{ item.nikeName }}<span class="msg-num">{{ item.replyCount }}</span></div>
					<h1>{{ item.title }}</h1>
					<p v-html="item.contentHtml" class="content-html"></p>
					<time>{{ item.updateTime }}</time>
				</section>

		 </SlideRefresh>
			<img src="../../../assets/img/404.svg" class="no-data" :data-num="exchangeData.totalCount" v-show="exchangeData.totalCount === 0">

		</main>


	</div>

</template>

<script>

import SlideRefresh from '../../../components/Comm/SlideRefresh';

export default {


 props: {
	 'exchangeData': {
		 type: Object,
		 default: {
			 data: [],
			 totalCount: 0
		 }
	 }
 },

 components: {
	 SlideRefresh
 },


  data() {
    return {
			typeShow: false, //  留言排序类型
			sortTypeText: '发帖时间',
			msgTypeAll: [{
					text: '发帖时间',
				},{
					text: '最新回复',
				},{
					text: '回复数量',
				},{
					text: '精华讨论',
				}]
    }
  },

  methods: {

		// 实时状态
		topStatusChange(status) {

			if(status == 'loading') {
				this.webApi.loadingData();
				this.$store.dispatch('fetchExchangeList');
			}

		},

		// 打开排序类型
		handleOpenSelect() {
			this.typeShow = true;
		},

		// 选择排序类型
		handleAffirmType(ev) {

			this.sortTypeText = ev.target.innerHTML;
			this.typeShow = false;

			this.webApi.loadingData();

			this.$store.commit('updateExchangeListP', {
				verTT: new Date().getTime(),
				ordertype: ev.target.dataset.index + 1 || 1
			});

			this.$store.dispatch('fetchExchangeList');

		},

		// 打开详情
		targetDetails(ev) {

			let oSection = this.webApi.recursiveParentNode(ev.target, 'section');

			this.$emit('open-details', oSection.dataset.id);


		},

  },
  mounted() {
  		this.exchangeData.data.map(item =>{
          	item.updateTime = `${this.webApi.isEmpty(item.updateTime)?'':this.webApi.formatDate(item.updateTime,'Y')}-${this.webApi.formatDate(item.updateTime,'M')}-${this.webApi.formatDate(item.updateTime,'D')}   ${this.webApi.formatDate(item.updateTime,'h')}:${this.webApi.formatDate(item.updateTime,'m')}`;
        });
  }

}

</script>

<style lang="scss" scoped>

	@import "../../../assets/style/mixin";

	.exchange-wrap-ipad{

		font-size: 0;

		.no-data{
			@extend .ab;
			@include wh(2.2rem, 2.2rem);
			left: 50%; top: 40%;
			margin-left: -1.1rem;
			z-index: 11;
		}

		.list{
			@include fc(.24rem, #333);
			padding: .35rem .5rem; line-height: 1;
			border-bottom: 1px solid #E2E2E2;
			h1{
				font-size: .28rem;
				margin: .25rem 0;
			}
			time{
				@extend .show;
				color: #ACACAC;
				text-align: right;
				padding-bottom: .4rem;
			}
			.msg-num{
				position: absolute;
				right: .5rem; width: .75rem;
				text-align: right; color: #ACACAC;
				&:before{
					content: '\e632';
					font-family: 'iconfont';
					@extend .ab;
					@include fc(.3rem, #ACACAC);
					left: 0;
				}
			}
		}

	.one-top{
		@include wh(100%, 1.46rem);
		position: relative;
		border-bottom: 1px solid #B9B9B9;
		padding-top: .2rem;
		background-color: $commTopBack;
		a{
			@extend .ab;
			@include fc($headFont, $commPink);
			left: .38rem; padding-left: .45rem;
			top: 50%; transform: translateY(-50%);
			margin-top: .2rem;
			&:after{
				content: '\e669';
				font-family: 'iconfont';
				@extend .ab;
				@include fc($headIconFont, $commPink);
				@extend .show;
				left: -.08rem; top: -.02rem;
				transform: rotate(-90deg);
			}
		}
		h1{
			@extend .flexCenter;
		  @include fc($headH1Font, #1D1D1D);
			height: inherit;
		}
		.type-list{
			@extend .ab;
			@include fc(.24rem, #fff);
			top: 1.25rem; left: .5rem;
			background-color: rgba(0,0,0,.7);
			border-radius: 5px;
			width: 2rem;
			z-index: 11;
			&:after{
				content: '';
				@extend .show;
				@extend .ab;
				top: -.38rem;
				left: .85rem;
				border: .19rem solid rgba(0,0,0,0);
				border-bottom-color: rgba(0,0,0,.7);
			}
			li{
				padding: .15rem .2rem;
				text-align: center;
				border-bottom: 1px solid rgba(255,255,255,.7);
			}
		}
	}


	}


</style>
