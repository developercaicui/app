<template lang="html">

  <div class="tmp-select-course-wrap">

    <template v-for="(item, index) in list">
      <h1 :data-index="index" class="list-all" @click="openSectionList">
        <aside>{{ item.courseName }}</aside>
      </h1>
    </template>


  </div>

</template>

<script type="text/ecmascript-6">

import { mapActions, mapGetters } from 'vuex';

export default {

  data() {
    return {
      list: [],
    }
  },

  computed: {

    ...mapGetters([
      'getSelectCourseList'
    ])

  },

  watch: {

    getSelectCourseList(list) {
      this.list = list;
    }

  },

  created() {

    this.fetchSelectCourseList({
      token: this.webApi.getCookie('token'),
  		pageSize: 66,
  		pageNo: 1,
    });

  },

  mounted() {

  },

  methods: {

    openSectionList(ev) {
      this.$router.push({
				path: `/note/selectsection/${encodeURIComponent(JSON.stringify(this.list[ev.target.dataset.index]))}`,
			});
    },


    ...mapActions([
      'fetchSelectCourseList'
    ])

  }


}
</script>

<style scoped lang="scss">

@import "../../../assets/style/mixin";

.tmp-select-course-wrap{

  .list-all{
     @include wh(100%, .88rem);
     @include fc(.32rem, #fff);
     @extend .borderBox;
     display: flex;
     align-items: center;
     justify-content: flex-start;
     padding: 0 .3rem;
     margin-top: .25rem;
     background-color: $themeColor;
     aside{
       @extend .text-ellipsis;
     }
  }

}

</style>
