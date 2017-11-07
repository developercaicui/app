<template lang="html">

  <div class="node-list-wrap" ref="nodeListWrap">

    <header class="head">
      <a href="javascript:;" class="iconfont icon-article-back"></a>
      <span>发布新帖</span>
      <a href="javascript:;" @click="searchNoteList">发布</a>
    </header>
  
    <main class="ipt-wrap">
      <div>
        <input type="text" name="" value="12312321312"/>
        <a href="javascript:;" class="iconfont icon-jiantou-copy-copy look-all"></a>
      </div>
      <div>
        <textarea placeholder="问答、讨论内容"></textarea>
      </div>
    </main>

    <uploadPicture></uploadPicture>

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
      
    }
  },

  created() {

  },

  mounted() {


  },

  methods: {

    // 返回上一页
    backPreviousPage() {
      this.$router.go(-1);
    },

    // 搜索交流
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
  background: #f2f2f2;

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
        right: 0.3rem;
        font-size: 0.3rem;
        font-weight: bold;
      }
    }

  }
  
  .ipt-wrap{
      background-color: #fff;
      margin-top: .3rem;
      height: 100%;
      > div{
        @extend .relative;
        &:nth-of-type(1){
          @include wh(100%, 1rem);
          border-bottom: 1px solid #E4E4E4;
          padding: 0 .3rem;
          input {
            @include fc(.3rem, #333);
            @include wh(5.6rem, .9rem);
          }
          .look-all{
            @extend .ab;
            right: .3rem; top: 50%;
            transform: translate3d(0,-50%,0);
            @include fc(.3rem, #333);
          }
        }
        &:nth-of-type(2){
          @include wh(100%, 80%);
          padding: .3rem;
          textarea{
            @include wh(100%, 90%);
            @include fc(.24rem, #999);
            line-height: 1.5;
          }
        }

      }
    }
}


</style>
