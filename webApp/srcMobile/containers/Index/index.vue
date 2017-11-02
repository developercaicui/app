<template lang="html">

  <div class="index-wrap">
    <courseList></courseList>
    <activityList></activityList>
  </div>

</template>

<script type="text/ecmascript-6">

import activityList from './subpage/activity_list';
import courseList from './subpage/course_list';

export default {

  components: {
    activityList,
    courseList
  },

  data() {
    return {

    }
  },

  created() {

    this.webApi.delCookie('userInfo');
		this.webApi.delCookie('token');

    this.webApi.setCookie('userInfo', JSON.stringify(this.$route.query));
    this.webApi.setCookie('token', this.$route.query.token);

  }

}
</script>

<style lang="scss" scoped>

 @import "../../assets/style/mixin";

 .index-wrap{
   font-size: 0; line-height: 1;
   background-color: #fff;
   min-height: 100%;
 }

</style>
