<template lang="html">

  <nav class="comm-nav">
    <a href="javascript:;" class="user-img"><img src="http://img.caicui.com/upload/201606/41a981b9bee4446bad56f5d78389b4cd.png"></a>
    <a href="">学习中心</a>
    <a href="">在线课程</a>
    <a href="">我的笔记</a>
    <a href="">我的问答</a>
    <a href="">我的讨论</a>
    <a href="">缓冲课程</a>
    <a href="">设置</a>
  </nav>

</template>

<script>
export default {

  data() {
    return {
    }
  },

  methods: {

  }

}
</script>

<style lang="scss" scoped>

@import "../../assets/style/mixin";

.comm-nav{

  @include wh(1.6rem, 100%);
  position: fixed;
  left: 0; top: 0;
  background-color: #01161c;
  text-align: center; font-size: 0; line-height: 0;

  .user-img{

    margin-top: .62rem;

    img{
      width: 100%;
      @include wh(.78rem, .78rem);
      border-radius: 100%;
    }

  }

  a{

    @extend .show;
    @include fc(.28rem, #fff);
    margin-top: 1.8rem;

    &:before{
      content: '';
      @extend .show;
      @extend .ab;
      left: 0; right: 0;
      transform: translate3d(0,-.6rem,0);
      font-family: 'iconfont'; font-size: .6rem;
    }

    &:nth-of-type(1):before{
      @extend .hide;
    }
    &:nth-of-type(2){
      margin-top: 1.8rem;
      &:before{
        content: '\e624';
      }
    }
    &:nth-of-type(3):before{
      content: '\e625';
    }
    &:nth-of-type(4):before{
      content: '\e606';
    }
    &:nth-of-type(5):before{
      content: '\e893';
    }
    &:nth-of-type(6):before{
      content: '\e648';
    }
    &:nth-of-type(7):before{
      content: '\e62c';
    }
    &:nth-of-type(8):before{
      content: '\e643';
    }

  }

}

</style>
