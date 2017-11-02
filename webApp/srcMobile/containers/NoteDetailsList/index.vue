<template lang="html">

  <div class="node-list-details-wrap">

    <header class="head">
      <a href="javascript:;" class="iconfont icon-article-back" @click="backPreviousPage"></a>
      <span>课程笔记</span>
      <a href="javascript:;" class="iconfont icon-jia"></a>
    </header>

    <main class="cont">
      <detailsList></detailsList>
    </main>

  </div>

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

  computed: {

  },

  created() {

  },

  watch: {

  },

  mounted() {

  },

  methods: {


    // 返回上一页
    backPreviousPage() {
      this.$router.go(-1);
    },


  }


}
</script>

<style scoped lang="scss">

@import "../../assets/style/mixin";

.node-list-details-wrap{
  font-size: 0; line-height: 1;
  min-height: 100%;
  overflow-y: auto; overflow-x: hidden;
}

.head{

  text-align: center;
  height: 1rem; border-bottom: 1px solid #EFEFEF;
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
      left: 0; font-size: .44rem;
    }
    &:nth-of-type(2){
      right: 0;
    }
  }

}




</style>
