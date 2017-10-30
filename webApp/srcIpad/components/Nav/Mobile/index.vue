<template lang="html">

  <nav class="comm-nav-mobile">
    <router-link to="index" class="active"><span>中心</span></router-link>
    <router-link to="#"><span>课程</span></router-link>
    <router-link to="#"><span>我的</span></router-link>
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

 .comm-nav-mobile{

   position: fixed;
   bottom: 0; right: 0; left: 0;
   height: 1.1rem;
   background-color: #fff;
   display: flex;
   text-align: center;

   a{

     position: relative;
     @extend .show;
     @include fc(.24rem, #5a5a5a);
     flex: 1;

     &.active{
        color: #34907b;
     }

     &:before{
       content: '';
       @extend .show;
       position: absolute;
       left: 0; right: 0; top: 0;
       transform: translate3d(0,.12rem,0);
       font-family: 'iconfont';
     }

     &:nth-of-type(1):before{
       content: '\e624'; font-size: .48rem;
       transform: translate3d(0,.14rem,0);
     }
     &:nth-of-type(2):before{
       content: '\e641'; font-size: .54rem;
     }
     &:nth-of-type(3):before{
       content: '\e69f'; font-size: .58rem;
     }

     span{
       @extend .show;
       transform: translate3d(0,.66rem,0);
     }


   }


 }

</style>
