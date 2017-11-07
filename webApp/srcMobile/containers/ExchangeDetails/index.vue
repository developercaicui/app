<template lang="html">

  <div class="node-list-details-wrap">

    <header class="head">
      <a href="javascript:;" class="iconfont icon-article-back" @click="backPreviousPage"></a>
      <span>交流详情</span>
    </header>

    <main class="cont">
      <detailsList></detailsList>
    </main>

  </div>

</template>

<script type="text/ecmascript-6">

import detailsList from "components/exchangeDetails";

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
  }

}




</style>
