<template lang="html">

  <header class="comm-header">
    <div class="logo">财萃网</div>
    <a href="javascript:;" class="is-msg">
      <span>&#xe67e;</span>
      <span class="msg-num">9</span>
    </a>
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

@import "../../assets/style/mixin";

.comm-header{

  @include wh(100%, .9rem);
  background-color: #fff;
  border-bottom: 1px solid #bdbbbb;

  .logo{
    font-size: 0;
    @include wh(4.76rem, .77rem);
    background: url('../../assets/img/login.jpg') no-repeat;
    background-size: 4.76rem .77rem;
    margin: 0 auto;
    transform: translate3d(0, (.9-.77)/2+rem, 0);
  }

  .is-msg{

    font-family: 'iconfont';
    @extend .ab;
    right: .36rem; top: (.9-.6)/2+rem;
    @include wh(.6rem, .6rem);
    @include fc(.56rem, #65767E);

    .msg-num{
      @extend .ab;
      @include wh(.36rem, .36rem);
      @include fc(.24rem, #fff);
      top: 0; left: 0;
      transform: translate3d( -.1rem, -.1rem, 0);
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f00;
      border-radius: 100%;
    }

  }



}


</style>
