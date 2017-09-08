<template lang="html">

  <header class="comm-header-ipad">

    <section class="user-info">
      <div class="img-head">
        <img :src="headImg"/>
      </div>
      <address class="text">
        <span>{{name}}</span>
        <span>{{phone}}</span>
      </address>
    </section>
    <aside class="user-log">
      上次登录时间：<span>{{time}}</span>&nbsp;&nbsp;&nbsp;
      最近考试：<span>{{courseName}}&nbsp;&nbsp;{{courseTime}}</span>
    </aside>
    <aside href="javascript:;" class="is-msg" @touchend="openMsgListAlert">
      <span>&#xe67e;</span>
      <span class="msg-num" v-if="totalCount>0">{{totalCount}}</span>
    </aside>
    <MyMsg :msg-list="msgList" @gain-msg-list="gainMsgList" @updata-msg-state="updataMsgState" @close-msg-alert="closeMsgListAlert" :is-msg-wrap="isMsgWrap"></MyMsg>
  </header>

</template>

<script>

import { getUserInfo, getLoginLog, getExamDate, getMsgList } from '../../../api/port';
import MyMsg from '../../../page/Msg/Ipad';

export default {

  components: {
		MyMsg,
  },

  data() {
    return {
      name: '',
      headImg: '',
      phone: '',
      time: '', // 最新登录时间
      courseName: '', // 最近考试名称
      courseTime: '', // 最近考试时间
      isMsgWrap: false, // 是否显示消息列表
      totalCount: 0, // 消息数
      msgList: [], // 消息列表
      userInfo: {},
    }
  },

  created() {


    if(!this.webApi.getCookie('userInfo')) return;

    this.userInfo = JSON.parse(this.webApi.getCookie('userInfo'));

    // 用户基本信息
    getUserInfo({token: this.userInfo.token})

    .then(res =>{

      if(!res || res.msg == 'noLogin'){

        this.$router.push({
          path: 'login'
        });

        return false;
      }



      return res.data;

    })
    .then(data =>{

      if(!data) return false;
      this.name = data.nickName;
      this.headImg = `${this.webApi.cdnImgUrl}${data.avatar}`;
      this.phone = data.mobile ? data.mobile : data.email;
    });

    // 获取登录时间
    getLoginLog({
      verTT: new Date().getTime(),
      memberid: this.userInfo.memberId,
      pageSize: 1,
      pageNo: 1
    })

    .then(res =>{
      this.time = !res || res.state != 'success' ? new Date().getTime() : this.stringData(res.data[0].loginTime);
    })


    // 最近考试时间以及科目
    getExamDate({
      verTT: new Date().getTime(),
      memberId: this.userInfo.memberId
    })

    .then(res =>{

      if(!res || res.state != 'success'){
        this.webApi.alert('消息获取失败，请稍后再试~');
        return false;
      }

      if(res.data.length == 0){
        this.courseName = '暂无考试';
        return;
      }

      let {data: [{categorySign: courseName,examinationDate: courseDate}]} = res;
      let courseTime = new Date(courseDate);

      this.courseName = courseName;
      this.courseTime = `${this.webApi.isSmallTen(courseTime.getFullYear())}/${this.webApi.isSmallTen(courseTime.getMonth())}/${this.webApi.isSmallTen(courseTime.getDate())}`;


    })

    .catch(err =>{
      this.webApi.alert();
      return false;
    })




  },

  methods: {

    // 获取消息列表
    gainMsgList(type) {

      // 获取消息
      getMsgList({
         verTT: new Date().getTime(),
         pageNo: 1,
         pageSize: 99,
         type: type,
         isRead: 0,
         token: this.userInfo.token,
      })

      .then(res =>{


        if(!res || res.state != 'success'){
          this.webApi.alert('消息获取失败，请稍后再试');
          return false;
        }

        let {data: data, totalCount: totalCount} = res;
        let _obj = document.createElement('div');

        this.totalCount = totalCount;
        this.msgList = data;
        this.msgList.map(item => {

          item.sentTime = this.stringData(item.sentTime);
          _obj.innerHTML = item.content;
          item.content = _obj.innerText;
        })



      })


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

    // PC端时间计算为例
    stringData($_data) {
       $_data = parseInt($_data);
        var $_return_string = '1分钟前';
        var $_timestamp=parseInt(new Date().getTime()/1000);
        var $_reste = $_timestamp - $_data;
        if($_reste<0){
        	$_reste = 1;
        }
        // if($_reste<60){
        //     $_return_string = $_reste+'秒前';
        // }else
       	// if($_reste>=60 && $_reste <3600){
       	if($_reste <3600){
            $_return_string = Math.ceil($_reste/60)+'分钟前';
        }else if($_reste>=3600 && $_reste <(3600*24)){
            $_return_string = Math.ceil($_reste/3600)+'小时前';
        }else if($_reste>=(3600*24) && $_reste <(3600*24*30)){
            $_return_string = Math.ceil($_reste/(3600*24))+'天前';
        }else if($_reste>=(3600*24*30) && $_reste <(3600*24*30*12)){
            $_return_string = Math.ceil($_reste/(3600*24*30))+'月前';
        }else{
            $_return_string = Math.ceil(parseInt($_reste/(3600*24*30*12)))+'年前';
        }
        return $_return_string;

    }

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
