<template lang="html">

  <main class="search-list-wrap">

    <header class="head">
      <div class="ipt-search">
        <input type="text" name="" value="" placeholder="搜一下" />
        <a href="javascript:;" class="iconfont icon-jia"></a>
      </div>
      <a href="javascript:;" @click="handleCloseSearch">取消</a>
    </header>

    <article class="cont-wrap">
      <detailsList></detailsList>
    </article>
  </main>

</template>

<script type="text/ecmascript-6">

import detailsList from "components/NoteDetailsList";

export default {

  components: {
    detailsList,
  },

  data() {
    return {

    }
  },

  created() {

  },

  methods: {

    // 取消搜索
    handleCloseSearch() {
      this.$emit('closeNoteSearch', false);
    },

  }


}
</script>

<style lang="scss" scoped>

@import "../../../assets/style/mixin";

.search-list-wrap{
  position: fixed;
  left: 0; top: 0; bottom: 0; right: 0;
  background-color: #F2F2F2;

  .head{

    @extend .relative;
    @extend .borderBox;
    height: 1rem;
    padding: .2rem;
    background-color: #fff;
    border-bottom: 1px solid #ddd;

    .ipt-search{
      @extend .relative;
      @extend .borderBox;
      padding: .1rem .2rem;
      margin-right: .8rem;
      background-color: #F2F2F2;
      &:before{
        content: '';
        @extend .show;
        @extend .ab;
        @include wh(2px, .36rem);
        background-color: $themeColor;
        transform: translate3d(0, .02rem,0);
      }
      input{
        @include fc(.28rem, #999);
        @include wh(100%, 100%);
        text-indent: .08rem;
        background-color: rgba(0,0,0,0);
      }
      a{
        @extend .ab;
        right: .16rem; top: 50%;
        @include fc(.16rem, #757575);
        transform: translate3d(0,-50%,0) rotate(45deg);
      }
    }

    > a{
      @extend .ab;
      @include wh(.8rem, 100%);
      @include fc(.26rem, #666);
      @extend .flexCenter;
      right: .15rem; top: 0;
    }


  }

}

.cont-wrap{

  overflow-y: auto;
  background-color: #fff;

}



</style>
