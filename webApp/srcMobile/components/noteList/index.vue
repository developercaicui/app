<template lang="html">

  <article class="tmp-list-wrap" ref="tmpListWrap">

    <section class="list-details">
      <h1>PART A Business organis...</h1>
      <div class="t-list">
        <p>Chapter 1 - Organisation and Types jhsk khhjd...</p>
        <span class="iconfont icon-bianji">&nbsp;2</span>
      </div>
    </section>
  </article>

</template>

<script type="text/ecmascript-6">


export default {

  components: {
  },

  data() {
    return {
    }
  },


  mounted() {

    let OHTML = document.documentElement;
    let oScreenWidth = OHTML.clientWidth || OHTML.getBoundingClientRect().width;

    this.$refs.tmpListWrap.style.cssText = `width: ${oScreenWidth}px; overflow-x: hidden;`;

  },

  methods: {

  }

}

</script>
<style lang="scss" scoped>

@import "../../assets/style/mixin";

.tmp-list-wrap{
  @include wh(100%, auto);
  float: left;
  background-color: #fff;
}


.list-details{
  h1{
    @include wh(100%, 1.08rem);
    @include fc(.32rem, #202020);
    @extend .textYcenter;
    text-indent: .3rem;
  }
}
.t-list{

  @extend .textYcenter;
  height: 1rem;
  background-color: #fafafa;

  p{
    @include fc(.32rem, #000);
    @extend .text-ellipsis;
    width: 5.9rem;
    text-indent: .2rem;
  }
  span{
    flex: 1;
    text-align: right;
    padding-right: .3rem;
    @include fc(.26rem, $themeColor);
  }

}

</style>
