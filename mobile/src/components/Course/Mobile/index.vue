<template lang="html">

  <header class="comm-header-mobile">
    <div class="login"></div>
    <div href="javascript:;" class="is-msg">
      <span>&#xe631;</span>
      <span class="msg-num">9</span>
    </div>
  </header>

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

  @import "../../../assets/style/mixin";

  $pathImg: '../../../assets/img/';

  .comm-header-mobile{

    @extend .flexCenter;
    height: .9rem;
    background-color: #fff;
    border-bottom: 1px solid #898989;
    box-sizing: border-box;

    .login{
      @include wh(3.69rem, .59rem);
      background: url($pathImg+'login_b.png') no-repeat;
      background-size: 3.69rem .59rem;
    }

    .is-msg{

      font-family: 'iconfont';
      position: absolute;
      right: .22rem; top: .2rem;
      @include wh(.6rem, .6rem);
      @include fc(.5rem, #666);

      .msg-num{
        position: absolute;
        @include wh(.36rem, .36rem);
        @include fc(.24rem, #fff);
        top: 0; right: 0;
        transform: translate3d(-.1rem, -.1rem, 0) scale(.7);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f00;
        border-radius: 100%;

      }

    }


  }

</style>
