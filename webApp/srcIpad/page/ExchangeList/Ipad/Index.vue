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

				<section class="list" v-for="item in exchangeData.data" :data-id="item.id" @click="targetDetails">
					<div>{{ item.nikeName }}<span class="msg-num">{{ item.replyCount }}</span></div>
					<h1>{{ item.title }}</h1>
					<p v-if="item.contentSummary" v-html="item.contentSummary" class="content-html"></p>
					<ul class="pic-group" v-if="setImg(item.imgPath)">
		                <li v-for="(imgPath,index) in setImgPath(item.imgPath)" v-if="index <= 2" :style="setBackground(imgPath)" ></li>
		                <b v-if="setImgPath(item.imgPath).length>=3">共{{ setImgPath(item.imgPath).length }}张</b>
		            </ul>
					<time><div class="tag-video-time" v-if="setTaskprogress(item)"><i class="icon-play-o icon-video">&#xe63f;</i><span>{{ setTaskprogress(item) }}</span></div>{{ timeConversion(item.updateTime) }}</time>
				</section>

		 </SlideRefresh>
			<img src="../../../assets/img/404.svg" class="no-data" :data-num="exchangeData.totalCount" v-show="!this.firstLoading && exchangeData.totalCount === 0">

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
				}],
				firstLoading: true,
    }
  },

	watch: {

		exchangeData() {
			this.firstLoading = false;
		}

	},


  methods: {

		// 时间转换
		timeConversion(val) {
				return `${this.webApi.isEmpty(val)?'':this.webApi.formatDate(val,'Y')}-${this.webApi.formatDate(val,'M')}-${this.webApi.formatDate(val,'D')}   ${this.webApi.formatDate(val,'h')}:${this.webApi.formatDate(val,'m')}`;
		},

		// 实时状态
		topStatusChange(status) {

			if(status == 'loading') {
				this.webApi.loadingData();
				this.$store.dispatch('fetchExchangeList');
			}

		},

		// 打开排序类型
		handleOpenSelect() {

			this.typeShow = !this.typeShow;

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
		setTaskprogress(item){
			return `${item.taskprogress != '-1' && item.taskType != ' '&& item.taskType == 'video' && item.courseId && item.courseId != ' ' && item.chapterId && item.chapterId != ' ' && item.taskId && item.taskId != ' '?this.webApi.formatType(item.taskType,item.taskprogress):''}`
		},
		setImg(imgPath) {

	         return `${this.webApi.isEmpty(imgPath)?'':imgPath}`;

        },
		setBackground(url) {
			return `background-image:url(${this.getImgPath(url)})`
		},
		setImgPath(imgPaths) {
			let imgPath=imgPaths.split(',');
			let imgPathArr=[];
            for(let i in imgPath) {
              if(!this.webApi.isEmpty(imgPath[i])) {
                imgPathArr.push(imgPath[i]);
              }
            }
            return imgPathArr;
		},
		getImgPath(imgPath) {//处理图片路径
			if(imgPath.length>0){
				  if(imgPath.substr(0,4)!="http"){
				     return this.webApi.exstaticUrl+imgPath;
				  }else{
				  	return imgPath;
				  }
			 }else{
			 	return imgPath;
			 }
		}

  },

}

</script>

<style lang="scss" scoped>

	@import "../../../assets/style/mixin";

	.exchange-wrap-ipad{

		font-size: 0;

		.no-data{
			@extend .ab;
			@include wh(2.4rem, 2.4rem);
			left: 50%; top: 5.46rem;
			margin-left: -1.2rem;
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
			p{
				padding:0.2rem 0;
			}
			time{
				@extend .show;
				color: #ACACAC;
				text-align: right;
				padding-top: 0.1rem;
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
.icon-video{
  font-family:"iconfont";
  font-size:0.3rem;
  font-weight: 700;
  speak: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 100%;
  vertical-align: middle;
}
.tag-video-time {
  float:left;
  margin-right: 0.2rem;
  padding: 0.02rem 0.1rem;
  border: 1px solid #8cc152;
  color: #8cc152;
  border-radius: 0.3rem;
  min-width: 1.2rem;
}
.tag-video-time i,
.tag-video-time span {
  line-height: 0.3rem;
  vertical-align: middle;
  margin: 0 0.05rem;
  font-style: normal;
}

/**通用图片组**/
.pic-group-detail {
  padding: 0.2rem 0.3rem;
}
.pic-group-detail img {
  width: 100%;
  margin: 0.1rem 0;
}
.pic-group {
  margin: 0.3rem 0;
  font-size: 0;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  height: 2rem;
  display: table;
}
.pic-group li {
  width: 3rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  background: #eee no-repeat center;
  background-size: cover;
  float: left;
  z-index: 100;
}
.pic-group li:nth-child(2) {
  margin: 0 0.3rem;
}
.pic-group b:nth-child(4) {
  position: absolute;
  z-index: 9999;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  color: #fff;
  height: 0.4rem;
  width: 1rem;
  text-align: center;
  line-height: 0.4rem;
  font-size: 0.22rem;
  margin-left: -1rem;
}
</style>
