<template lang="html">

	<main class="mobile-wrap index-wrap-mobile">

	</main>

</template>

<script>


export default {

	components: {
  },


	created() {


	},

  data() {
    return {
    }
  },

  methods: {

  }

}

</script>

<style lang="scss" scoped>

 @import "../../../assets/style/mixin";

 $commColor: #00a185;

 .index-wrap-mobile{

	 font-size: 0;

	  .the-course-wrap{

	  	.title{
	  		position: relative;
				@include fc(.3rem, $commColor);
				border-left: .05rem solid $commColor;
				margin: .3rem;
				padding-left: .16rem; height: .3rem; line-height: 1;
				a{
					font-family: 'iconfont';
				  @extend .ab; right: 0; top: 0;
					transform: rotate(180deg);
				}
	  	}

	  }

		.list{

			@extend .show;
			height: 1.86rem;
			background-color: #4a90e2;
			padding: .36rem .28rem;
			@extend .borderBox;

			.info{

				color: #fff;
				width: 4.4rem;
				display: inline-block;

				h1{
					font-size: .28rem;
					margin-bottom: .1rem
				}

				time{
					font-size: .24rem;
					padding: .05rem .34rem;
					background-color: #999;
				}

			}

		}

		.activity-list{
			img{
				width: 100%;
			}
		}

 }



</style>
