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

    <main style="margin-top:1.7rem;">
        <allList></allList>
    </main>

    <div class="new-talk-btn" @click="newTalk()"><i class="iconfont icon-jia"></i></div>
    
  </div>

</template>

<script>

import allList from './subpage/all_list';

export default {

  components: {
    allList,
  },

  data() {
    return {
      isShowMenu: false,
      menulist: ["最新回复","发帖时间","精华讨论","回复数量"],
      isHinddenSearch: false,
    }
  },

  created() {

  },

  mounted() {


  },

  methods: {
    courseMenu() {
        this.isShowMenu = !this.isShowMenu;
    },
    menuEvent(index) {

        this.isShowMenu = !this.isShowMenu;
    },

    // 搜索交流
    searchNoteList() {
        this.$router.push({
          path: `/exchange/search`,
        });
    },
    //新建交流
    newTalk() {
        this.$router.push({
          path: `/exchange/newtalk`,
        });
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
  position: fixed;
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

.new-talk-btn{
    width: .9rem;
    height: .9rem;
    border-radius: 50%;
    background:rgba(255,84,131,0.85);
    position: fixed;
    right: 0.34rem;
    bottom: 1.2rem;
    z-index:20;
    text-align: center;
    line-height: .9rem;
    box-shadow: 0 0.03rem 0.07rem rgba(0,0,0, 0.2);
    i{
        color: #fff;
        font-size: 0.4rem;
    }
}
</style>
