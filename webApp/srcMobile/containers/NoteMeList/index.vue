<template lang="html">

  <div class="node-list-wrap" ref="nodeListWrap">

    <header class="head">
      <a href="javascript:;" @click="handleBackPage" class="iconfont icon-article-back"></a>
      <span>我的笔记</span>
      <a href="javascript:;" class="iconfont icon-sousuo2" @click="searchNoteList"></a>
      <router-link class="iconfont icon-jia" to="/note/new"></router-link>
    </header>

    <nav class="nav" ref="navWrap">
      <template v-for="item, index in tabList">
        <a href="javascript:;" :data-index="index" @click="bindSelectType"><span>{{ item }}</span></a>
      </template>
      <div class="bar" ref="navBar"></div>
    </nav>

    <main ref="listWrap">
      <me-list></me-list>
    </main>

    <transition name="fade">
      <search v-show="isHinddenSearch" :isOpen="isHinddenSearch" @closeNoteSearch="closeNoteSearch"></search>
    </transition>

  </div>

</template>

<script type="text/ecmascript-6">

import meList from '../NoteList/subpage/me_list';
import search from '../NoteList/subpage/search';

export default {

  components: {
    meList,
    search
  },

  data() {
    return {
      isHinddenSearch: false,
    }
  },

  created() {

  },

  mounted() {

    let OHTML = document.documentElement;
    let oScreenWidth = OHTML.clientWidth || OHTML.getBoundingClientRect().width;
    let oScreenHeight = OHTML.clientHeight || OHTML.getBoundingClientRect().height;

    this.$refs.nodeListWrap.style.cssText = `width: ${oScreenWidth}px;`;
    this.$refs.listWrap.style.cssText = `height: ${oScreenHeight}px; width: ${oScreenWidth * 2}px; overflow: hidden;`;

  },

  methods: {

    // 关闭我的列表
    handleBackPage() {
      g.closeNewNote();
    },

    // 关闭搜索
    closeNoteSearch(flag) {
      this.isHinddenSearch = flag;
    },

    // 搜索笔记
    searchNoteList() {
      this.isHinddenSearch = true;
    },

  }


}
</script>

<style scoped lang="scss">

@import "../../assets/style/mixin";

.node-list-wrap{
  font-size: 0; line-height: 1;
  min-height: 100%;
  overflow-y: auto; overflow-x: hidden;
}

.head{

  text-align: center;
  height: 1rem; border-bottom: 1px solid #d5d5d5;
  @extend .flexCenter;

  span{
    @include fc($headerSize, #202020);
  }
  a{
    @extend .ab;
    @include wh(.6rem, .9rem);
    @include fc(.36rem, $themeColor);
    @extend .flexCenter;
    &:nth-of-type(1){
      left: 0;
    }
    &:nth-of-type(3){
      right: .6rem;
    }
    &:nth-of-type(2){
      right: 0;
    }
  }

}


</style>
