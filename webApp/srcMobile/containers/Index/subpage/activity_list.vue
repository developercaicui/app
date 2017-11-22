<template lang="html">

  <main class="activity-list-wrap">

    <div class="title">
      <h1>中博活动</h1>
      <a href="javascript:;" class="iconfont text-move look-all" @click="lookAllActivity">MORE&nbsp;</a>
    </div>

    <figure class="list" v-for="item, index in list" :data-href="item.url" v-if="index < 1" @click="handleOpenActivity">
      <img :src="item.src" :title="item.title"/>
    </figure>

    <transition name="fade">
      <div class="all-list-wrap" v-show="isShowAllList">
        <div class="all-list">
          <header class="head">
            <a href="javascript:;" class="iconfont icon-article-back" @click="lookAllActivity"></a>
            <span>活动列表</span>
          </header>
          <figure class="list" v-for="item, index in list" :data-href="item.url" @click="handleOpenActivity">
            <img :src="item.src" :title="item.title"/>
          </figure>
        </div>
      </div>
   </transition>

  </main>

</template>

<script type="text/ecmascript-6">

import { mapGetters, mapActions } from 'vuex';

export default {

  data() {
    return {
      list: [],
      isShowAllList: false,
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

    lookAllActivity() {
      this.isShowAllList = !this.isShowAllList;
    },

    // 打开活动页
		handleOpenActivity(ev) {
			let oFigure = this.webApi.recursiveParentNode(ev.target, 'figure');
			!oFigure.dataset.href ? this.webApi.alert('活动已过期', 1500) : g.openActivityPage(oFigure.dataset.href) ;
		},

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

  .all-list-wrap{
    position: fixed;
    left: 0; right: 0; bottom: 0; top: 0;
    z-index: 11;
    background-color: #fff;
    .list{
      margin-bottom: .2rem;
      padding: 0 .3rem;
    }
    .head{

      @extend .relative;
      text-align: center;
      height: 1rem; border-bottom: 1px solid #EFEFEF;
      @extend .flexCenter;
      margin-bottom: .5rem;
      background-color: #fff;

      span{
        @include fc($headerSize, #202020);
      }
      a{
        @extend .ab;
        @include wh(.9rem, .9rem);
        @include fc(.36rem, $themeColor);
        @extend .flexCenter;
        &:nth-of-type(1){
          left: 0; font-size: .44rem;
        }
      }

    }
  }
  .all-list{
    height: 100%;
    overflow-y: auto;
  }

}

</style>
