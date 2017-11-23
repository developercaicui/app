<template lang="html">

  <SlideRefresh @top-status-change="topStatusChange">
    <div class="index-wrap">
        <courseList :is-update-list="isUpdateCourseList"></courseList>
        <activityList></activityList>
    </div>
  </SlideRefresh>


</template>

<script type="text/ecmascript-6">

import activityList from './subpage/activity_list';
import courseList from './subpage/course_list';
import SlideRefresh from 'base/SlideRefresh';

export default {

  components: {
    activityList,
    courseList,
    SlideRefresh
  },

  data() {
    return {
      isUpdateCourseList: false,
    }
  },

  created() {

    this.webApi.delCookie('userInfo');
		this.webApi.delCookie('token');

    this.webApi.setCookie('isTargetLogin', 'false');
    this.webApi.setCookie('userInfo', JSON.stringify(this.$route.query));
    this.webApi.setCookie('token', this.$route.query.token);

  },

  methods: {

		topStatusChange(status) {
      if(status == 'loading') {
        this.isUpdateCourseList = true;
        setTimeout(()=>{
          this.isUpdateCourseList = false;
        },100);
      }
		}

  }

}
</script>

<style lang="scss" scoped>

 @import "../../assets/style/mixin";

 .index-wrap{
   font-size: 0; line-height: 1;
   background-color: #fff;
   height: 100%; overflow: auto;
 }

</style>
