<template lang="html">

  <main class="search-list-wrap">
    <div id="header" class="head">
      <a href="javascript:;" class="iconfont icon-article-back" @click="backPreviousPage"></a>
      <input name="keyword" type="text" tapmode oninput="search()" class="Searchbox center"><span tapmode onclick="search()" class="Search">搜索</span>
    </div>

    <main style="margin-top:.9rem;">
      <allList></allList>
    </main>
  </main>
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

.search-list-wrap{
  font-size: 0; line-height: 1;
  min-height: 100%;
  overflow-y: auto; overflow-x: hidden;
  background: #f2f2f2;
  .head {
      width: 100%;
      line-height: 0.9rem;
      color: #fff;
      font-size: 0.36rem;
      position: relative;
      background: #fff;
      overflow: hidden;
      height: 0.9rem;
      box-sizing: content-box;
      border-bottom: 1px solid #dddddd;
      position:fixed;
      left: 0;
      top: 0;
      z-index:10;
      a{
        @extend .ab;
        @include wh(.9rem, .9rem);
        @include fc(.36rem, #000);
        @extend .flexCenter;
        &:nth-of-type(1){
          left: 0;
        }
        &:nth-of-type(2){
          right: 0;
        }
      }
      .Searchbox {
        box-sizing: border-box;
        position: absolute;
        left: 14%;
        bottom: 0.14rem;
        height: 0.6rem;
        width: 5.2rem;
        outline: none;
        border: 0;
        border-radius: 0.3rem;
        padding: 0 0.8rem 0 0.4rem;
        background: url("../../assets/img/search.svg") 95% center no-repeat;
        /*background-color: #383f41;*/
        border: 1px solid #a3a3a3;
        background-size: 8%;
        color: #a3a3a3;
        text-align: left;
      }
      .Search {
        width: 1.3rem;
        float: right;
        height: 100%;
        text-align: center;
        font-size: 0.3rem;
        color: #a3a3a3;
        line-height: 0.9rem;
      }
  }
  

}


</style>
