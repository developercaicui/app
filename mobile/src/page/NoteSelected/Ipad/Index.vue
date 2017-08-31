<template lang="html">

	<div class="node-ipad-list">

		<header>
			<a href="javascript:;" @touchend.stop="handleBack">&#xe67f;</a>
			<h1>请选择课程</h1>
		</header>

		<template v-for="(item, index) in selectedData.courselist">
			<h1 :data-index="index" class="list-all" @touchend="openSectionList">{{ item.courseName }}</h1>
		</template>

	</div>

</template>

<script>

export default {

	props: {
		'selected-data': [Object]
	},

  data() {
    return {
    }
  },

	created(){

	},

  methods: {

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

	$green: #46C1AA;

	.node-ipad-list{

		font-size: 0; line-height: 1;

		.list-all{
			 @include wh(100%, 1.2rem);
			 @include fc(.32rem, $green);
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
				@include fc(.46rem, $green);
				font-family: 'iconfont';
				left: .38rem; padding-left: .45rem;
				top: 50%; transform: translateY(-50%);
			}

			h1{
				@extend .flexCenter;
			  @include fc(.3rem, #1D1D1D);
				height: inherit;
			}

		}




 }


</style>
