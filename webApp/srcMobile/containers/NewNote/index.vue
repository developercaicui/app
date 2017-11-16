<template lang="html">

  <div class="new-note-wrap">

    <header class="head">
      <a href="javascript:;" class="iconfont icon-article-back"></a>
      <span>选择课程</span>
    </header>

    <div class="cont">
      <select-course></select-course>
    </div>



  </div>

</template>

<script type="text/ecmascript-6">

import selectCourse from './subpage/select_course';

export default {

  components: {
    selectCourse,
  },

  data() {
    return {
      data: {
      }
    }
  },

  created() {


  },

  mounted() {


  },

  methods: {



  }


}
</script>

<style scoped lang="scss">

@import "../../assets/style/mixin";

.new-note-wrap{
  font-size: 0; line-height: 1;
  height: 100%;
  @include wh(100%, 100%);
  overflow: hidden;
  background-color: #f3f3f3;

  .cont{
    height: 100%;
    overflow-y: auto;
  }

}

.nav{
  position: fixed;
  left: 0; right: 0; bottom: 0; background-color: #fff;
  height: 1rem;
  display: flex;
  border-top: 1px solid #DCDCDC;
  a{
    @include fc(.34rem, $themeColor);
    @extend .flexCenter;
    flex: 1;
    &:first-of-type{
      border-right: 1px solid #DCDCDC;
    }
  }
}

.head{

  @extend .relative;
  text-align: center;
  height: 1rem; border-bottom: 1px solid #D6D6D6;
  @extend .flexCenter;
  background-color: #fff;

  span{
    @include fc($headerSize, #202020);
  }
  a{
    @extend .ab;
    @include wh(.9rem, .9rem);
    @include fc(.4rem, $themeColor);
    @extend .flexCenter;
    &:nth-of-type(1){
      left: 0;
    }
  }

}



</style>
