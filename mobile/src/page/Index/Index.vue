<template lang="html">

	<div>
		<indexIpad :activity-list='activityList' v-show="isIpad"></indexIpad>
		<indexMobile :activity-list='activityList' v-show="isMobile"></indexMobile>
	</div>

</template>

<script>

import indexIpad from './Ipad';
import indexMobile from './Mobile';
import { getActivityList } from '../../api/port';


export default {

	components: {
		indexMobile,
		indexIpad,
  },

  data() {
    return {
			isIpad: false,
      isMobile: false,
			activityList: [], // 活动列表
    }
  },

	created() {

		let oHtml = document.documentElement;

		this.isIpad = oHtml.dataset.isipad == 'false' ? true : false ;
		this.isMobile = oHtml.dataset.ismobile == 'false' ? true : false ;


		let oDiv = document.createElement('div');

		// 获取活动列表
		getActivityList()

		.then(res =>{

			if(res && res.state == 'success'){

				this.activityList = res.data.map(item => {

					oDiv.innerHTML = item.content;

					return {
						id: item.id,
						title: item.title,
						src: `${this.webApi.cdnImgUrl}${oDiv.querySelectorAll('img')[0].getAttribute('src')}`,
						href: oDiv.querySelectorAll('a')[0].getAttribute('href')
					};

				});

			}

		})

	},


  methods: {

  }

}

</script>

<style lang="scss" scoped>

</style>
