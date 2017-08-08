<template lang="html">

	<main class="index-wrap">

		<Headers></Headers>

		<div class="the-course">
			<h1>在学课程</h1>

			<a href="javascript:;" class="list">
				<section>
					<h2>复习串讲－ACCA F2 AccoACCA ntant inBusiness</h2>
					<div>
						<time>考试时间：2017/08/12</time>
						<time>课程到期：2017/08/12</time>
					</div>
				</section>
				<section>
					<canvas></canvas>
					<span></span>
				</section>
			</a>

		</div>
	</main>

</template>

<script>

import Headers from '../../components/Header';


export default {

	components: {
    Headers,
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

 @media screen and (max-width: 768px) {
	 @import "../../assets/style/mobile/index";
 }

 @media screen and (min-width: 769px) {
	  @import "../../assets/style/ipad/index";
 }

</style>
