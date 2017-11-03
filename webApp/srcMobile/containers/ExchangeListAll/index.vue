<template lang="html">

  <div class="node-list-wrap" ref="nodeListWrap">

    <header class="head">
      <a href="javascript:;" class="iconfont icon-article-back"></a>
      <span>交流</span>
      <a href="javascript:;" class="iconfont icon-sousuo2" @click="searchNoteList"></a>
    </header>
    
    <nav class="top-nav">
      <div class="color-box"></div>
      <div @click="courseMenu" class="left"><span class="new_back">最新回复</span><i class="iconfont icon-angle-down"></i></div>
      <div onclick="go_to('my-talk');" class="right my_talk">我的交流</div>
    </nav>
    <div class="backdrop opacity" v-if="isShowMenu" @click="courseMenu"></div>
    <ul class="dropdown-menu" v-if="isShowMenu">
      <li v-for="(item,index) in menulist" @click="menuEvent(index)">{{item}}</li>
    </ul>

    <main style="margin-top:1.8rem;">
        <allList></allList>
    </main>

    <search v-show="isHinddenSearch" @closeNoteSearch="closeNoteSearch"></search>

  </div>

</template>

<script>

import allList from './subpage/all_list';
import search from './subpage/search';

export default {

  components: {
    allList,
    search
  },

  data() {
    return {
      isShowMenu: false,
      menulist: ["最新回复","发帖时间","精华讨论","回复数量"],
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

    // let OHTML = document.documentElement;
    // let oScreenWidth = OHTML.clientWidth || OHTML.getBoundingClientRect().width;
    // let oScreenHeight = OHTML.clientHeight || OHTML.getBoundingClientRect().height;
    // let oSpan = this.$refs.navWrap.querySelectorAll('span');
    //
    //
    // this.specificValue = (oSpan[1].offsetLeft - (oSpan[0].offsetLeft + oSpan[0].offsetWidth)) / oScreenWidth;
    // this.screenWidth = oScreenWidth;
    // this.$refs.nodeListWrap.style.cssText = `width: ${oScreenWidth}px;`;
    // this.$refs.listWrap.style.cssText = `height: ${oScreenHeight}px; width: ${oScreenWidth * 2}px; overflow: hidden;`;

  },

  methods: {
    courseMenu() {
        this.isShowMenu = !this.isShowMenu;
    },
    menuEvent(index) {

        this.isShowMenu = !this.isShowMenu;
    },
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
          };

          if (this.screenWidth/3 < Math.abs(_endX - this.touchStartX)) {
            this.defaultTabIndex = this.defaultTabIndex == 0 ? 1 : 0 ;
          }

          this.touchOldX = this.defaultTabIndex * this.screenWidth;

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
  background: #f2f2f2;
}

.head{
  width: 100%;
  text-align: center;
  height: .9rem;
  @extend .flexCenter;
  background: #fff;
  border-bottom: 1px solid #dddddd;
  position:fixed;
  left: 0;
  top: 0;
  z-index:10;
  span{
    @include fc($headerSize, #000);
    font-weight: bold;
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
.color-box{
    width: 100%;
    height: 0.1rem;
    background: #f2f2f2;
}
.top-nav {
    width: 100%;
    height: 0.8rem;
    font-size: 0.3rem;
    line-height: 0.8rem;
    border-bottom: 1px solid #eee;
    background: #fff;
    font-weight: bold;
    position:fixed;
    left: 0;
    top: 0.9rem;
    z-index:10;
    .left{
        float: left;
        padding-left: 0.3rem;
    }
    .right {
      float: right;
      color: $themeColor;
      padding-right: 0.3rem;
    }
    i {
      padding-left: 0.1rem;
      font-size: 0.36rem;
      color: #9a9a9a;
      vertical-align: middle;
    }
}
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.6);
    z-index: 10;
}
.backdrop.opacity {
    background: rgba(0,0,0,0);
}
.dropdown-menu {
  background: rgba(0,0,0,0.8);
  font-size: 0.3rem;
  display: table;
  color: #fff;
  position: absolute;
  z-index: 9;
  margin: 0.2rem 0.2rem;
  border-radius: 0.2rem;
  padding: 0.2rem 0;
  top: 1.8rem;
}
.dropdown-menu:before {
  content: '';
  position: absolute;
  border: 0.2rem solid transparent;
  border-bottom-color: rgba(0,0,0,0.8);
  top: -0.395rem;
  left: 50%;
  margin-left: -0.15rem;
}
.dropdown-menu li {
  padding: 0.2rem 0.6rem;
}
.dropdown-menu li:not(:last-child) {
  border-bottom: 1px solid #fff;
}

</style>
