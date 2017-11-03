<template lang="html">

  <article class="tmp-details-list-wrap">

    <section class="list">
      <div class="cont">
        <h1>请问这个撒旦撒旦撒大叔大婶多请问这个撒旦撒旦撒大叔大婶多请问这个撒旦撒旦撒大叔大婶多</h1>
        <div class="cont-details">
          <time>13:52</time>
          <span>显示</span>
          <time>2017-9-10&nbsp;&nbsp;15:20</time>
        </div>
      </div>
      <div class="pic">
        <img src="http://www.caicui.com/upload/openCourse/2017/10/17/DDF5B2125C3842C9B3CFD0BA4230864A.png"/>
      </div>
    </section>

    <section class="list">
      <div class="cont">
        <h1>请问这个撒旦撒旦撒大叔大婶多请问这个撒旦撒旦撒大叔大婶多请问这个撒旦撒旦撒大叔大婶多</h1>
        <div class="cont-details">
          <time>13:52</time>
          <span>用户名最长显示</span>
          <time>2017-9-10&nbsp;&nbsp;15:20</time>
        </div>
      </div>
    </section>

    <section class="list">
      <div class="cont">
        <h1>请问这个撒旦撒旦撒大叔大婶多请问这个撒旦撒旦撒大叔大婶多请问这个撒旦撒旦撒大叔大婶多</h1>
        <div class="cont-details">
          <time>13:52</time>
          <span>超出最长超出最长超出最长超出最长</span>
          <time>2017-9-10&nbsp;&nbsp;15:20</time>
        </div>
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

  },

  methods: {

  }

}

</script>
<style lang="scss" scoped>

@import "../../assets/style/mixin";

.tmp-details-list-wrap{

  .list{
    @extend .borderBox;
    height: 1.8rem;
    border-bottom: 1px solid #EFEFEF;
    padding: .4rem .25rem;
    display: flex;
    h1{
      @include fc(.3rem, #666);
      @extend .text-ellipsis;
    }
  }

  .cont-details{
    @include fc(.26rem, #999);
    margin-top: .32rem;
    span{
      @extend .text-ellipsis;
      display: inline-block;
      font-size: .24rem;
      height: .24rem; max-width: 1.9rem;
      transform: translate3d(0,.03rem,0);
      margin-right: .2rem; margin-left: .16rem;
    }
    time{
      display: inline-block;
      &:nth-of-type(1){
        text-indent: .3rem;
        &:before{
          content: '';
          @extend .ab;
          @extend .show;
          border: .18rem solid rgba(0,0,0,0);
          border-left-color: #999;
          border-radius: .1rem;
          transform: translate3d(0,-.05rem,0);
        }
      }
    }
  }

  .cont{
    width: 100%; overflow: hidden;
  }

  .pic{
    padding-left: .25rem;
    img{
      @include wh(1rem, 1rem);
    }
  }

}


</style>
