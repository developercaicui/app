<template lang="html">

	<div>
		<Ipad v-if="isIpad" :course-data="courseData" :section-list="sectionList"></Ipad>
		<Mobile v-if="isMobile"></Mobile>
	</div>

</template>

<script>

import Ipad from './Ipad';
import Mobile from './Mobile';
import { getNewNoteSectionList } from '../../api/port';

export default {

	components: {
		Mobile,
		Ipad,
  },

  data() {
    return {
			isIpad: false,
      isMobile: false,
			sectionList: [],
			courseData: {}
    }
  },

	created() {

	  this.webApi.loadingData();
		this.courseData = JSON.parse(this.$route.params.data);

	},

	mounted() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;

		getNewNoteSectionList({
			courseId: this.courseData.courseId
		})

		.then(res =>{

			this.webApi.closeLoadingData();

			if(!res || res.state != 'success'){
				this.webApi.alert('获取列表失败，请稍后再试');
				return false;
			}

			this.sectionList = res.data[0].chapters;
			this.courseData = res.data[0];

		})


	},


  methods: {

  }

}

</script>

<style lang="scss" scoped>

</style>
