<template lang="html">

  <main class="activity-list-wrap">

    <div class="title">
      <h1>中博活动</h1>
      <a href="javascript:;" class="iconfont text-move">MORE&nbsp;</a>
    </div>

    <figure class="list" v-for="item, index in list" :data-href="item.url">
      <img :src="item.src" :title="item.title"/>
    </figure>

  </main>

</template>

<script type="text/ecmascript-6">

import { mapGetters, mapActions } from 'vuex';

export default {

  data() {
    return {
      list: []
    }
  },

  computed: {

    ...mapGetters([
       'getActivityLists',
       'getIsfirstActivity'
    ]),

  },

  watch: {

    getActivityLists(data) {

      this.list = data.map(item =>{
        return {
          url: item.url,
          title: item.title,
          src: `${this.webApi.cdnImgUrl}${item.imagePath}`
        }
      });

    }

  },

  created() {
    this.fetchActivityList();
  },

  methods: {

    ...mapActions([
      'fetchActivityList'
    ]),

  }


}
</script>

<style lang="scss" scoped>

@import "../../../assets/style/mixin";

.activity-list-wrap{

  @extend .relative;
  overflow: hidden;
  border-top: .2rem solid #f2f2f2;

  .title{
    position: relative;
    @include fc(.3rem, #333);
    border-left: .05rem solid $themeColor;
    margin: .3rem;
    padding-left: .16rem;
    height: .3rem; line-height: 1;

    a{
      @extend .ab; right: 0; top: 0;
      @include fc(.24rem, #999);
      &:after{
        content: "\e66e";
      }
    }
  }

  .list{

    padding-bottom: .1rem;

    img{
      @include wh(100%, 2.23rem);
    }

  }

}

</style>
