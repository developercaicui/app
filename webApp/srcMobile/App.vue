<template lang="html">

  <div class="v-wrap">
    <router-view></router-view>
  </div>

</template>

<script type="text/ecmascript-6">


export default {

  components: {
  },

  data() {
    return {

    }
  },


  created() {

    // rem计算
    this.webApi.remCount();

    // 屏幕旋转监听（全局）
    // window.addEventListener("orientationchange", ev => this.webApi.remCount(), false);
    // window.addEventListener("resize", ev => this.webApi.remCount(), false);

    let arr = ['note/melist', 'note/list'];
    let _HREF = window.location.href;

    window.disposeReturnKey = () =>{
      (arr.filter(item => _HREF.includes(item)))[0] ? g.closeNewNote() : this.$router.go(-1);
    }

  },

}

</script>
<style lang="scss">

@import "./assets/style/reset";
@import "./assets/style/mixin";
@import "../node_modules/mint-ui/lib/style.css";

.v-wrap{
  @include wh(100%, 100%);
  background-color: #fff;
  overflow: hidden;
}

.mint-actionsheet-listitem, .mint-actionsheet-button{
  font-size: .3rem;
}

</style>
