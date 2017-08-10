<template lang="html">

  <nav class="comm-nav-ipad">
    <router-link to="index" class="active">学习中心</router-link>
    <router-link to="">在线课程</router-link>
    <router-link to="">我的笔记</router-link>
    <router-link to="">我的问答</router-link>
    <router-link to="">我的讨论</router-link>
    <router-link to="">缓冲课程</router-link>
    <router-link to="">设置</router-link>
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

 @import "../../../assets/style/mixin";


 .comm-nav-ipad{

   @include wh(1.6rem, 100%);
   position: fixed;
   left: 0; top: 0;
   background-color: #3d4e64;
   text-align: center; font-size: 0; line-height: 0;
   z-index: 99;

   a{

     @extend .show;
     @include fc(.28rem, #fff);
     position: relative;
     height: 1.6rem; line-height: 7.5;
     overflow: hidden;

     &.active{
       background-color: #3db0ac;
     }


     &:before{
       @extend .show;
       position: absolute;
       left: 0; right: 0; top: 0;
       transform: translate3d(0,-1.35rem,0);
       font-family: 'iconfont'; font-size: .5rem;
     }

     &:nth-of-type(1):before{
       content: '\e624';
     }
     &:nth-of-type(2):before{
       content: '\e625';
     }
     &:nth-of-type(3):before{
       content: '\e606';
     }
     &:nth-of-type(4):before{
       content: '\e893';
     }
     &:nth-of-type(5):before{
       content: '\e648';
     }
     &:nth-of-type(6):before{
       content: '\e62c';
     }
     &:nth-of-type(7):before{
       content: '\e643';
     }

     &:first-of-type{
       margin-top: 1.6rem;
     }

     &:last-of-type{
       position: absolute;
       left: 0; right: 0;
       bottom: 1.6rem;
     }

   }

 }


</style>
