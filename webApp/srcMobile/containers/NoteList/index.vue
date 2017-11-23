<template lang="html">

  <div class="node-list-wrap" ref="nodeListWrap">

    <header class="head">
      <a href="javascript:;" class="iconfont icon-article-back" @click="backCourseList"></a>
      <span>课程笔记</span>
      <a href="javascript:;" class="iconfont icon-sousuo2" @click="searchNoteList"></a>
    </header>

    <nav class="nav" ref="navWrap">
      <template v-for="item, index in tabList">
        <a href="javascript:;" :data-index="index" @click="bindSelectType"><span>{{ item }}</span></a>
      </template>
      <div class="bar" ref="navBar"></div>
    </nav>

    <main ref="listWrap">
        <me-list></me-list>
        <all-list></all-list>
    </main>

    <transition name="fade">
      <search v-show="isHinddenSearch" :isOpen="isHinddenSearch" @closeNoteSearch="closeNoteSearch"></search>
    </transition>

  </div>

</template>

<script type="text/ecmascript-6">

import allList from './subpage/all_list';
import meList from './subpage/me_list';
import search from './subpage/search';

export default {

  components: {
    meList,
    allList,
    search
  },

  data() {
    return {
      tabList: [ '我的笔记','全部笔记' ],
      defaultTabIndex: 0,
      touchStartX: 0,
      touchOldX: 0,
      screenWidth: 0,
      touchIsMove: true,
      isHinddenSearch: false,
      specificValue: 0 // 导航滑动比值
    }
  },

  created() {
  },

  mounted() {

    let OHTML = document.documentElement;
    let oScreenWidth = OHTML.clientWidth || OHTML.getBoundingClientRect().width;
    let oScreenHeight = OHTML.clientHeight || OHTML.getBoundingClientRect().height;
    let oSpan = this.$refs.navWrap.querySelectorAll('span');


    this.specificValue = (oSpan[1].offsetLeft - (oSpan[0].offsetLeft + oSpan[0].offsetWidth)) / oScreenWidth;
    this.screenWidth = oScreenWidth;
    this.$refs.nodeListWrap.style.cssText = `width: ${oScreenWidth}px;`;
    this.$refs.listWrap.style.cssText = `height: ${oScreenHeight}px; width: ${oScreenWidth * 2}px; overflow: hidden;`;

  },

  methods: {

    // 选择笔记类型 0 为我的  1为全部
    bindSelectType(ev) {

      let oA = this.webApi.recursiveParentNode(ev.target, 'a');

      this.defaultTabIndex = oA.dataset.index;

      this.navBarMove(this.defaultTabIndex);

      this.touchOldX = -(this.defaultTabIndex * this.screenWidth);

      this.webApi.addCss(this.$refs.listWrap, {
        transform: `translate3d(${ this.touchOldX }px,0,0)`
      });

    },

    // 返回原生在学课程
    backCourseList() {
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


    navBarMove(index) {

      let oSpan = this.$refs.navWrap.querySelectorAll('span');

      this.webApi.addCss(this.$refs.navBar, {
        transform: `translate3d(${ oSpan[index].offsetLeft - oSpan[index].offsetWidth }px,0,0)`
      });

    },

    // 笔记与全部笔记滑动切换
    bindTouchMove(type, ev) {

			let _touch = ev.changedTouches[0];

      let _moveX, _endX = 0;

      switch(type) {
        case 'start':

          this.touchStartX = _touch.pageX;

          this.webApi.addCss(this.$refs.listWrap, {
            transition: `0s`
          });

        break;

        case 'move':

          _moveX = _touch.pageX;

          let __x = _moveX - this.touchStartX;

          if(Math.abs(__x) < this.screenWidth/12) {
            this.touchIsMove = false;
            break;
          }

          if(__x > 0 && this.defaultTabIndex == 0) {
            this.touchIsMove = false;
            break;
          }

          if(this.defaultTabIndex == 1 && __x < 0) {
            this.touchIsMove = false;
            break;
          }

          this.touchIsMove = true;

          this.webApi.addCss(this.$refs.navBar, {
            transform: `translate3d(${ Math.abs((__x + -this.touchOldX) * this.specificValue) }px,0,0)`
          });

          this.webApi.addCss(this.$refs.listWrap, {
            transform: `translate3d(${ __x + -this.touchOldX }px,0,0)`
          });

        break;

        case 'end':

          _endX = _touch.pageX;

          if (!this.touchIsMove) {
            this.navBarMove(this.defaultTabIndex);
            break;
          }

          if (this.screenWidth/3 < Math.abs(_endX - this.touchStartX)) {
            this.defaultTabIndex = this.defaultTabIndex == 0 ? 1 : 0 ;
          }

          this.touchOldX = this.defaultTabIndex * this.screenWidth;

          if(Math.abs(_endX - this.touchStartX) < this.screenWidth / 4 && this.touchOldX < this.screenWidth) {
            this.touchOldX = 0;
          }

          this.webApi.addCss(this.$refs.listWrap, {
            transition: `.4s`
          });

          this.webApi.addCss(this.$refs.listWrap, {
            transform: `translate3d(-${ this.touchOldX }px,0,0)`
          });

          this.navBarMove(this.defaultTabIndex);

        break;
      }


    }

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
  height: .9rem;
  @extend .flexCenter;

  span{
    @include fc($headerSize, #202020);
  }
  a{
    @extend .ab;
    @include wh(.9rem, .9rem);
    @include fc(.36rem, $themeColor);
    @extend .flexCenter;
    &:nth-of-type(1){
      left: 0;
    }
    &:nth-of-type(2){
      right: 0;
    }
  }

}

.nav{

  position: relative;
  height: .7rem;
  border-bottom: 1px solid #eee;
  display: flex; align-items: center;

  a{
    @include fc(.32rem, #333);
    flex: 1; text-align: center;
  }

  .bar{
    @extend .ab;
    @include wh(1.3rem, .04rem);
    left: 1.25rem; bottom: 0;
    background-color: $themeColor;
    transition: .4s;

  }

}


</style>
