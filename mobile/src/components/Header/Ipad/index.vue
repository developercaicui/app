<template lang="html">

  <header class="comm-header-ipad">

    <section class="user-info">
      <div class="img-head">
        <img src="http://cdnimg.caicui.com/upload/avatar/big_ff808081492d486801492d4a28f50004.jpg"/>
      </div>
      <address class="text">
        <span>不粘锅</span>
        <span>18273821212</span>
      </address>
    </section>
    <aside class="user-log">
      上次登录时间：<span>一天前</span>
      最近考试：<span>ACCA P1  2017/12/13</span>
    </aside>
    <aside href="javascript:;" class="is-msg">
      <span>&#xe67e;</span>
      <span class="msg-num">9</span>
    </aside>
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

 .comm-header-ipad{


   @include wh(100%, 2.4rem);
   position: relative;
   background-color: #f5f5f5;
   border-bottom: 1px solid #D2D2D2;

   .user-log{
     position: absolute;
     @include fc(.24rem, #b0b0b0);
     right: 1.2rem; top: 1.8rem;
     span{
       @include fc(.28rem, #666);
     }
   }

   .user-info{
     position: absolute;
     width: 4rem;
     left: 1.6rem; top: .46rem;

     .text{
       position: absolute;
       left: 2.04rem; top: .2rem;
     }

     span{
       @include show();
       &:nth-of-type(1){
         @include fc(.46rem, #000);
       }
       &:nth-of-type(2){
         margin-top: .1rem;
         @include fc(.26rem, #B0B0B0);
       }
     }

     img{
       @include wh(1.6rem, 1.6rem);
       margin-top: .05rem; margin-left: .05rem;
       border-radius: 100%;
     }

     .img-head{
       @include wh(1.7rem, 1.7rem);
       background-color: #fff;
       border-radius: 100%;
     }

   }

   .is-msg{
     font-family: 'iconfont';
     position: absolute;
     right: .94rem; bottom: 1.2rem;
     @include wh(.6rem, .6rem);
     @include fc(.56rem, #3CC6B3);
     transform: scale(.9);

     .msg-num{
       position: absolute;
       @include wh(.36rem, .36rem);
       @include fc(.24rem, #fff);
       top: 0; right: 0;
       transform: translate3d(.02rem, -.1rem, 0);
       display: flex;
       justify-content: center;
       align-items: center;
       background-color: #f00;
       border-radius: 100%;
     }

   }
   

 }

</style>
