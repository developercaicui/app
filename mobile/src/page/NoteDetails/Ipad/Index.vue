<template lang="html">

	<div class="node-wrap-ipad-details">

		<header>
			<a href="javascript:;" @touchend="backDetailsList">&#xe67f;</a>
			<h1>{{ detailsData.chaptername }}</h1>
			<div class="state-edit">
				<a href="javascript:;" @touchend="handleEditNote" v-if="isEdit">&#xe609;</a>
				<a href="javascript:;" @touchend="removeDetails">&#xe618;</a>
			</div>
		</header>

		<main>


			<section class="list">
				<h1><span>课程介绍</span><time>{{ detailsData.updateTime }}</time></h1>
				<p>{{ detailsData.content }}</p>
				<div class="pic-all">
					<i v-for="(item, index) in detailsData.imgPath" :style="item" v-show="index < 3" @touchend="handleOpenBigPic"></i>
					<span v-show="detailsData.imgPath && detailsData.imgPath.length > 3">{{ picLengthInfo }}</span>
				</div>
			</section>


		</main>

		<photoAlbum :picList="picList" v-show="isShowList" @closeBigPic="closeBigPic"></photoAlbum>

	</div>

</template>

<script>

import photoAlbum from '../../../components/Comm/photoAlbum';

export default {

	props: ["details-data", 'data', 'isEdit'],

	components: {
		photoAlbum,
	},

  data() {
    return {
			picList: [],
			picLengthInfo: '共0张',
			isShowList: false,
    }
  },

  updated() {
		this.picList = this.data.detailsData.picList;
		this.picLengthInfo = `共${ this.picList.length }张`;
	},

	mouthed() {


	},

  methods: {

		// 打开大图
		handleOpenBigPic() {
			this.isShowList = true;
		},

		// 关闭大图
		closeBigPic(off) {
			this.isShowList = off;
		},

		// 返回上一页
		backDetailsList() {
			this.$router.go(-1);
		},

		// 删除详情
		removeDetails() {
			this.$emit('remove-details', {id: this.data.sectionData.id})
		},

		// 编辑日志
		handleEditNote() {

			this.$router.push({
				path: `/note/edit/${encodeURIComponent(JSON.stringify(this.data))}`
			});

		}


  }

}

</script>

<style lang="scss" scoped>

	@import "../../../assets/style/mixin";

	.node-wrap-ipad-details{

		font-size: 0;
		padding-top: $commTop;
		background-color: #fff;

		.pic-all{
			margin-top: .5rem;
			position: relative;
			i{
				@include wh(3rem, 2rem);
				display: inline-block; margin-right: .3rem;
			}
			span{
				@include wh(.9rem, .4rem);
				@extend .ab;
				@include fc(.24rem, #fff);
				display: inline-block;
				bottom: 0;
				text-align: center; line-height: 1.8;
				background-color: rgba(0, 0, 0, .7);
				transform: translate3d(-1.2rem, -.03rem, 0);
			}
		}

		.list{

			@include fc(.26rem, #333);
			padding: .35rem .5rem; line-height: 1;
			border-bottom: 1px solid #E2E2E2;


			h1{
				color: #acacac;
				margin-bottom: .25rem;
			}
			time{
				display: inline-block;
				float: right;
				color: #ACACAC;
				text-align: right;
			}
			p{
				margin-bottom: .1rem;
			}

			&:last-of-type{
				border-bottom-width: 0;
			}

		}

		.state-edit{
			@extend .ab;
			right: .35rem; top: 50%; transform: translateY(-50%);
			font-family: 'iconfont';
			a{
				color: $commPink;
				&:nth-of-type(1){
					font-size: $headIconFont;
					margin-right: .3rem;
				}
				&:nth-of-type(2){
					font-size: .45rem;
				}
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



	}


</style>
