<template lang="html">

  <div class="my-msg-wrap" v-show="isMsgWrap" data-type="wrap" @touchend.stop="closeMsgAlert">

    <div class="content-body-wrap">
      <section class="msg-content">
        <nav>
          <a href="javascript:;">消息中心</a>
          <a href="javascript:;" class="active">个人动态</a>
          <a href="javascript:;">站内短信</a>
        </nav>
        <div class="list-wrap">
          <figure @touchend="openMsgDetails">
            <img src="http://cdnimg.caicui.com/upload/avatar/big_ff808081492d486801492d4a28f50004.jpg" />
            <section>
              <h1>黄浦江上的的卢浦大桥<time>2天前</time></h1>
              <p>哈喽，你也学习F1吧，我准备6月考试多交流好不好吗？</p>
            </section>
          </figure>
        </div>
      </section>
      <section class="msg-content-details" ref="msgContentDetails">
        <div class="msg-navs">
          <a href="javascript:;" @touchend="closeMsgDetails">&#xe67f;</a>
          <h1>消息详情</h1>
        </div>
        <div class="list-wrap">
          <figure>
            <img src="http://cdnimg.caicui.com/upload/avatar/big_ff808081492d486801492d4a28f50004.jpg" />
            <section>
              <h1>黄浦江上的的卢浦大桥</h1>
              <p>哈喽，你也学习F1吧，我准备6月考试多交流好不好吗？</p>
            </section>
          </figure>
        </div>
      </section>
    </div>

  </div>
</template>

<script>


export default {

  props: {
    'error-msg': [String],
    'is-msg-wrap': [Boolean]
  },

  data() {
    return {
    }
  },

  created(){


  },

  methods: {

    // 关闭消息弹框
    closeMsgAlert(ev) {

      if(ev.target.dataset.type == 'wrap') this.$emit('close-msg-alert',false)

    },

    // 打开消息详情
    openMsgDetails() {
      this.$refs.msgContentDetails.classList.add('msg-content-details-active')
    },

    // 关闭消息详情
    closeMsgDetails() {
      this.$refs.msgContentDetails.classList.remove('msg-content-details-active')
    },

  }

}

</script>

<style lang="scss" scoped>

@import "../../../assets/style/mixin";

.my-msg-wrap{

  position: fixed;
  left: 0; top: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,.5);
  z-index: 103; font-size: 0;

  &:after{
    content: '';
    @extend .show;
    @extend .ab;
    right: .9rem; top: 1.5rem;
    border: .25rem solid rgba(0,0,0,0);
    border-right-color: #fff;
    transform: rotate(90deg) translate3d(-.46rem,.13rem,0);
  }

  .content-body-wrap{
    @include wh(5.9rem, 8rem);
    @extend .ab;
    background-color: #fff;
    border-radius: .2rem;
    z-index: 11;
    right: .9rem; top: 1.5rem;
    overflow: hidden;

  }

  .msg-content{

    @extend .ab;
    left: 0; top: 0;
    @include wh(100%, 100%);


    nav{

      @include wh(100%, 1.1rem);
      background-color: #fbfbfb;
      border-bottom: 1px solid #d8d8d8;
      border-top-left-radius: .2rem;
      border-top-right-radius: .2rem;
      padding: .26rem .26rem .26rem 0;
      display: flex;

      a{

        @include fc(.24rem, #01a185);
        @extend .borderBox;
        display: flex;
        flex: 1; height: .6rem;
        align-items: center;
        justify-content: center;
        &:nth-of-type(1){
          @include fc(.26rem, #000);
          text-indent: -.3rem;
          border: 2px solid rgba(0,0,0,0);
        }
        &:nth-of-type(2),
        &:nth-of-type(3){
          border: 2px solid #01a185;
        }
        &:nth-of-type(2){
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
        &:nth-of-type(3){
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
        &.active{
          color: #fff;
          background-color: #01a185;
        }
      }

    }

  }

  // 消息列表
  .list-wrap{

    figure{

      padding: .25rem; border-bottom: 1px solid #e1e1e1;

      &:last-of-type{
        border-bottom-width: 0;
      }

      img{
        @extend .ab;
        @include wh(.6rem, .6rem);
        border-radius: 100%;
      }

      section{
        padding-left: .78rem;
        h1{
          @include fc(.26rem, #000);
          margin-bottom: .05rem;
        }
        p{
          line-height: 1.2
        }
        time{
          @extend .ab;
          right: .25rem;
        }
        p, time{
          @include fc(.24rem, #d9d9d9);
        }
      }

    }


  }

  // 消息详情
  .msg-content-details{

    @extend .ab;
    @include wh(100%, 100%);
    left: 0; top: 0;
    background-color: #fff;
    border-radius: .2rem;
    z-index: 11;
    transition: .3s;
    transform: translate3d(5.9rem,0,0);

    &.msg-content-details-active{
      transform: translate3d(0,0,0);
    }

    .msg-navs{

      @include wh(100%, 1.1rem);
      background-color: #fbfbfb;
      border-bottom: 1px solid #d8d8d8;
      border-top-left-radius: .2rem;
      border-top-right-radius: .2rem;
      padding: .26rem .26rem .26rem 0;
      display: flex;
      align-items: center;
      a{
        font-family: 'iconfont';
        @include fc(.38rem, #bbb9b9);
        text-indent: .28rem
      }
      h1{
        @include fc(.32rem, #000);
        width: 100%;
        text-align: center;
      }
    }

  }



}


</style>
