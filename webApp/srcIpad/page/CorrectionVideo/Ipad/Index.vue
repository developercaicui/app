<template lang="html">
	<div class="note-wrap-ipad-edit">
      <header class="one-top">
        <a href="javascript:;" @touchend.stop="closeIndex">&#xe67f;</a>
        <h1>视频纠错</h1>
        <div class="state-edit"  @touchend.stop="sub">
          <a href="javascript:;">&#xe654;</a>
        </div>
      </header>

        <div id="pop-radios" class="pop-radios">
          <a href="javascript:;" class="pop-radio-label"  @click="selecType" :data-index="index" :class="courrNum == index ?'active' : '' " v-for="(item,index) in cmptType">
            <span class="pop-radio">
                <span class="pop-radio-round"></span>
            </span>
            <span class="pop-radio-span">{{ item }}</span>
          </a>
        </div>
        <div class="feeback-textareaBox">
          <textarea id="textarea" name="content" placeholder="请输入反馈，我们将为您不断改进。" ref="textarea"></textarea>
          <div class="taskInfo">
              <p class="taskInfo-time"><span></span><span v-text="taskInfotime"></span></p>
              <p class="taskInfo-title" v-text="taskInfotitle"></p>
          </div>
        </div>
        <div class="pop-tel">请核对您的联系方式
          <input type="text" class="pop-input-tel" :value="mobile" ref="popinputTel">
          <div class="right">
            <!-- <p @click="closeIndex">取消</p>
            <p class="active" @click="sub()">提交</p> -->
          </div>
        </div>

	</div>

</template>

<script>

import { getUserInfo,loginout,complaintOpinion} from '../../../api/port';

export default {

	data() {
	    return {
        task_info_detail:{},
        courrNum: 0,
        cmptType: ['无法播放','音画不同步','播放卡顿','内容问题','其它错误'],
        mobile: '',
        taskInfotime: '',
        taskInfotitle: '',
	    }
	},

	created() {

    this.task_info_detail = {
        "courseId": "ff8080814dad5062014dadd9c70d0053",
        "courseName": "ACCA F2 Management Accounting",
        "chapterId": "ff8080814dad5062014dadd9c7200055",
        "chapterName": "课程介绍",
        "progress": 120,
        "id": "ff808081473905e701477c4bf98b00d9",
        "taskId": "ff8080814dad5062014dadd9c7320058",
        "title": "Introduction of Paper",
        "taskType": "video",
        "videoTime": 300,
        "videoSiteId": "D550E277598F7D23",
        "videoCcid": "ED4E6BCAC88795149C33DC5901307461"
    }

    this.task_info_detail = this.$route.query;

		let memberinfo;
    
    if(this.webApi.getCookie('memberinfo')){
      
        memberinfo = JSON.parse(this.webApi.getCookie('memberinfo'));

        if(memberinfo.mobile){

            this.mobile = memberinfo.mobile

        }else{

            this.mobile = memberinfo.email

        }
    }else{

        getUserInfo({'token':this.webApi.getCookie('token')})

        .then(res =>{

            if(res && res.state == 'success'){

                if(res.data.mobile){

                      this.mobile = res.data.mobile

                  }else{

                      this.mobile = res.data.email

                  }

            }

          })
    }

	},

	updated() {


	},

	components: {

  },

	methods: {
		    closeIndex() {
           g.hiddenJiuCuoView();
        },
      	//投诉类型
        selecType(ev) {

          this.courrNum = this.webApi.recursiveParentNode(ev.target,'a').dataset.index || 0;

        },
      	sub() {
          let content = this.$refs.textarea.value;
          let mobile = this.$refs.popinputTel.value;

          if (content == '') {
              this.webApi.alert('意见内容不能为空');
              return false;
          }

          if (mobile == '') {
              this.webApi.alert('联系方式不能为空');
              return false;
          }
          let task_info_detail = this.task_info_detail;
          let nameJson = {
            "courseName" : task_info_detail.courseName,
            "chapterName" : task_info_detail.chapterName,
            "taskName" : task_info_detail.title,
            "id" : task_info_detail.videoCcid
          }
          let courseId = task_info_detail.courseId;
          let chapterId = task_info_detail.chapterId;
          let taskId = task_info_detail.taskId;
          let type = task_info_detail.taskType;
          let title = task_info_detail.title;
          let ccid = task_info_detail.videoCcid;
          let siteid = task_info_detail.videoSiteId;
          let progress = task_info_detail.progress;//任务进度
          let videoTime = task_info_detail.videoTime;

          //let title=content.substr(0,20);
          let nickName = JSON.parse(this.webApi.getCookie("userInfo")).nickName;
          let param = {};
          let systype = this.webApi.getCookie("getDeviceType");

          param.memberId = JSON.parse(this.webApi.getCookie("userInfo")).memberId;//投诉人id
          param.memberName = nickName;//投诉人昵称
          param.cmptType = document.querySelector(".pop-radio-label.active").innerText;//投诉类型
          param.cmptContent = content+'<a class="content-addDom" data-nameJson="'+JSON.stringify(nameJson)+'" href="javascript:;" data-course-id="'+courseId+'" data-chapter-id="'+chapterId+'" data-task-id="'+taskId+'" data-type="'+type+'" data-title="'+title+'" data-video-ccid="'+ccid+'" data-video-siteid="'+siteid+'" data-progress="'+progress+'" data-video-time="'+videoTime+'">视频：'+this.formatSec(progress)+'</a>';//投诉内容
          param.contactWay = mobile;//联系方式
          param.deviceDesc = systype;//设备描述

          this.webApi.loadingData();

        console.log(JSON.stringify(param))

          complaintOpinion(param)

          .then(res =>{


             this.webApi.closeLoadingData();

              if (res && res.state == 'success') {

                  this.webApi.alert('发表成功');

                  setTimeout(() => {
                      //关闭此页面
                      this.closeIndex();

                  }, 600);

              } else {

                  this.webApi.alert(res.msg);
              }

          })

    },
    formatSec(value) {
        let theTime = parseInt(value);
        // 秒
        let theTime1 = 0;
        // 分
        let theTime2 = 0;
        // 小时
        if (theTime >= 60) {
            theTime1 = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);
            if (theTime1 >= 60) {
                theTime2 = parseInt(theTime1 / 60);
                theTime1 = parseInt(theTime1 % 60);
            }
        }
        let i, s, h;
        if (theTime2 >= 10) {
            h = theTime2;
        } else {
            h = '0' + theTime2;
        }
        if (theTime1 >= 10) {
            i = theTime1;
        } else {
            i = '0' + theTime1;
        }
        if (theTime >= 10) {
            s = theTime;
        } else {
            s = '0' + theTime;
        }
        if (h > 0) {
            return parseInt(parseInt(i) + parseInt(h * 60)) + ':' + s;
        } else {
            return i + ':' + s;
        }
    },
	},
	mounted() {

    let progress = this.task_info_detail.progress;//任务进度

    this.taskInfotime = this.formatSec(progress);

    this.taskInfotitle = this.task_info_detail.title;

	}

}

</script>

<style lang="scss" scoped>

@import "../../../assets/style/mixin";

.none{display:none;}
.left{float: left;}
.right {float: right;}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  z-index: 2;
}
.backdrop.opacity {
  background: rgba(0,0,0,0);
}
.backdrop.video-bg {
  background: rgba(50,50,50,0.2);
}
.backdrop.whitedrop {
  background: #fff;
}
/*弹出层*/
body{
  overflow-x: hidden;
}
body #mask0 {
  opacity: 1;
  -webkit-transform: translate(-50%, -50%);
}
.note-wrap-ipad-edit {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.note-wrap-ipad-edit{

    padding-top: $commTop;
    background-color: $commTopWhite;

    .state-edit{
      @extend .ab;
      right: .3rem; top: 50%; transform: translateY(-50%);
      font-family: 'iconfont';
      a{
        @include fc(.7rem, $commPink);
        @extend .show;
      }
    }


  .one-top{
    position: relative;
    @include wh(100%, 1.05rem);
    border-bottom: 1px solid #B9B9B9;
    background-color: #fff;
    > a{
      @extend .ab;
      @include fc($commBackFont, $commPink);
      font-family: 'iconfont';
      left: .38rem; padding-left: .1rem;
      top: 50%; transform: translateY(-50%);
    }

    h1{
      @extend .flexCenter;
      @include fc(.3rem, #1D1D1D);
      height: inherit;
    }

  }

}
.pop-radios {
    overflow: hidden;
    padding: 0 0;
    margin-top: 0.2rem;
        margin-left: -0.1rem;
}
.pop-radios .pop-radio-label {
    display: inline-block;
    float: left;
    margin-left: 30px;
}
.pop-radios .pop-radio-label .pop-radio {
    display: inline-block;
    position: relative;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid #979797;
    vertical-align: middle;
}
.pop-radios .pop-radio-label .pop-radio .pop-radio-round {
    position: absolute;
    top: 2px;
    bottom: 0;
    left: 2px;
    right: 0;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #fff
}
.pop-radios .pop-radio-label .pop-radio-span {
    display: inline-block;
    font-size: 0.25rem;
    font-weight: bold;
    color: #666666;
    vertical-align: middle;
}
.pop-radios .pop-radio-label.active .pop-radio .pop-radio-round {
  background-color: #F5A623
}
.pop-textarea-content {
    width: initial;
    height: 195px;
    border: 1px solid #E4E4E4;
    padding: 20px;
    margin: 0 20px;
    background-color: #fff
}
.pop-tel {
    width: 100%;
    float: left;
    color: #3E4E63;
    margin-left: 0.4rem;
    margin-top:10px;
    margin-top: -0.2rem;
    font-size:0.3rem;
}
.pop-tel .pop-input-tel {
    width: 2.4rem;
    height: 0.5rem;
    border: 1px solid #E4E4E4;
    outline: none;
    font-size: 12px;
    margin-left: 10px;
    background-color: #fff
}
.feeback-but {
     margin-top: 0;
}
.feeback-textareaBox{
    width: 100%;
    height: 8.27rem;
    padding:0.2rem 0.4rem;
    position: relative;
    padding-bottom: 1rem;

    textarea{
      width:100%;
      height:100%;
      border: 1px solid #eee;
      padding: 0.2rem 0 0 0;
      font-size: 0.3rem;
    }
}
.taskInfo{
  width: 96%;
  position: absolute;
  bottom: 1rem;
  line-height: 0.2rem;
  border-top:1px solid #e5e7e7;
}
.taskInfo p{

  display: inline-block;
}
.taskInfo p:nth-child(1){
  height: 0.5rem;
  border: 1px solid $themeColor;
  border-radius: 5px;
  margin-top: 0.2rem;
  margin-left: 0.1rem;
}
.taskInfo p:nth-child(2){
    color: #666666;
    font-size: 0.22rem;
    font-weight: bold;
    max-height: 0.8rem;
    margin-left: 0.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 66%;
    padding-top: 0.1rem;
}
.taskInfo-time span{
  display: inline-block;
  font-size:0.26rem;
}
.taskInfo-time span:nth-child(1){
    width: 0.5rem;
    height: 100%;
    background: $themeColor;
    border-radius: 3px;
}
.taskInfo-time span:nth-child(1):before{
    content: "";
    width: 0;
    height: 0;
    border-top: 0.15rem solid transparent;
    border-left: 0.2rem solid #fff;
    border-bottom: 0.15rem solid transparent;
    position: absolute;
    left: 0.28rem;
    top: 0.32rem;
}
.taskInfo-time span:nth-child(2){
    float: right;
    padding: 0 0.1rem;
    line-height: 0.5rem;
    color: #666666;
    font-size: 0.22rem;
    font-weight: bold;
}
.taskInfo .taskInfo-title{
    vertical-align: middle;
}

.pop-tel div{
    margin-right: 0.8rem;
}
.pop-tel div p{
    display: inline-block;
    width: 2.2rem;
    height: 0.5rem;
    border: 1px solid $themeColor;
    text-align: center;
    line-height: 0.5rem;
    color: $themeColor;
    font-weight: bold;
    font-size: 0.26rem;
}
.pop-tel div p:nth-child(1){
    margin-right: 0.4rem;
}
.pop-tel div p.active{
    background: $themeColor;
    color: #fff;
}
</style>
