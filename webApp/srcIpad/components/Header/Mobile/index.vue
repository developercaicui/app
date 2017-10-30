<template lang="html">

  <header class="comm-header-mobile">
    <div class="login"></div>
    <div href="javascript:;" class="is-msg" @touchend="openMsgList">
      <span>&#xe631;</span>
      <span class="msg-num" v-if="msgListData.totalCount>0">{{msgListData.totalCount}}</span>
    </div>

    <MsgList :msg-list-data="msgListData" ref="msgList"></MsgList>

  </header>

</template>

<script>

import MsgList from '../../../page/Msg/Mobile';

export default {

  props: {
    'msg-list-data': [Object],
  },

  components: {
    MsgList,
  },

  data() {
    return {
    }
  },

  updated() {

  },

  methods: {


    // 打开消息列表
    openMsgList() {
      this.$refs.msgList.openMsgList();
    }

  }

}
</script>

<style lang="scss" scoped>

  @import "../../../assets/style/mixin";

  $pathImg: '../../../assets/img/';

  .comm-header-mobile{

    position: relative;
    height: .9rem;
    background-color: #fff;
    border-bottom: 1px solid #898989;
    box-sizing: border-box;

    .login{
      @extend .ab;
      @include wh(3.69rem, .59rem);
      background: url($pathImg+'login_b.png') no-repeat;
      background-size: 3.69rem .59rem;
      left: 50%; top: 50%;
      transform: translate3d(-50%,-50%,0);
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
