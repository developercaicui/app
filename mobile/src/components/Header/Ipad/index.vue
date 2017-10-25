<template lang="html">

  <header class="comm-header-ipad">

    <section class="user-info">
      <div class="img-head">
        <a href="javascript:;"><img :src="`${this.webApi.cdnImgUrl}${userInfo.avatar}`" /></a>
      </div>
      <address class="text">
        <span>{{ userInfo.nickName }}</span>
        <span>{{ userData.mobile ? userData.mobile : userData.email }}</span>
      </address>
    </section>
    <aside class="user-log">
      上次登录时间：<span>{{ loginLogData.time }}</span>&nbsp;&nbsp;&nbsp;
      最近考试：<span :data-id="examDate.id">{{ courseName }}&nbsp;&nbsp;{{ courseTime }}</span>
    </aside>
    <aside href="javascript:;" class="is-msg" @touchend="openMsgListAlert">
      <span>&#xe67e;</span>
      <span class="msg-num" v-if="totalCount>0">{{ totalCount }}</span>
    </aside>
    <MyMsg :msgList="msgList" @gain-msg-list="gainMsgList" @updata-msg-state="updataMsgState" @close-msg-alert="closeMsgListAlert" :isMsgWrap="isMsgWrap"></MyMsg>
  </header>

</template>

<script>

import MyMsg from '../../../page/Msg/Ipad';

export default {

  components: {
		MyMsg,
  },

  data() {
    return {
      courseName: '暂无考试', // 最近考试名称
      courseTime: '', // 最近考试时间
      isMsgWrap: false, // 是否显示消息列表
      totalCount: 0, // 消息数
      userInfo: {},
    }
  },

  computed: {

		msgList() {

      let list = this.$store.getters.getMsgList;
      let _obj = document.createElement('div');

      list.map(item => {
        item.sentTime = this.webApi.stringData(item.sentTime);
        _obj.innerHTML = item.content;
        item.content = _obj.innerText;
      });

      this.totalCount = list.length;

			return list;
		},

    userData() {
      return this.$store.getters.getUserDetails;
    },

    examDate() {

      let data = this.$store.getters.getUserExamData;

      if(!data.examinationDate) return data;

      let { categorySign: courseName,examinationDate: courseDate } = data;
      let courseTime = new Date(courseDate);

      this.courseName = courseName;
      this.courseTime = `${this.webApi.isSmallTen(courseTime.getFullYear())}/${this.webApi.isSmallTen(courseTime.getMonth())}/${this.webApi.isSmallTen(courseTime.getDate())}`;

      return data;

    },

    loginLogData() {
      return this.$store.getters.getLoginLogData;
    },


	},

  created() {

    this.userInfo = JSON.parse(this.webApi.getCookie('userInfo') || {});
    this.userInfo.avatar = this.userInfo.avatar+'?s='+Math.random();
    this.$store.commit('updateMsgListParams', {
        token: this.userInfo.token,
        self: 0
    });
    this.$store.dispatch('fetchMsgList');

    this.$store.dispatch('fetchUserInfo', { token: this.userInfo.token });


    this.$store.commit('updateExamDateParams', {
        memberId: this.userInfo.memberId,
    });
    this.$store.dispatch('fetchExamDate');


    this.$store.commit('updateLoginLogParams', {
        memberid: this.userInfo.memberId,
    });
    
    this.$store.dispatch('fetchLoginLog');

  },


  methods: {

    // 获取消息列表
    gainMsgList(type) {

      this.$store.commit('updateMsgListParams', {
          self: type,
      });

      this.$store.dispatch('fetchMsgList');

    },

    // 消息条目数更新
    updataMsgState(data) {
      this.totalCount = this.totalCount - data.num;
      this.msgList = data.list;
    },

    // 打开消息列表
    openMsgListAlert() {
      this.isMsgWrap = true;
    },

    // 关闭消息弹框
    closeMsgListAlert(isOff) {
      this.isMsgWrap = isOff;
    },


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
     left: 1rem; top: .46rem;

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
     @include fc(.56rem, #666);
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
