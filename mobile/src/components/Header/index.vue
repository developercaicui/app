<template lang="html">

  <header class="comm-header">

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

  @media screen and (max-width: 768px) {
    @import "../../assets/style/mobile/comm_header";
  }

  @media screen and (min-width: 769px) {
     @import "../../assets/style/ipad/comm_header";
  }

</style>
