<template lang="html">
	<div class="set-info-modal" v-if="isShow">
		<div class="backdrop"></div>
    <div class="set-info-modal">
      <div id="mask0" class="modal">
        <div class="set_tit">视频纠错
            <div @click="closeIndex" class="right">关闭</div>
        </div>

        <div id="pop-radios" class="pop-radios"><a href="javascript:;" class="pop-radio-label active"><span class="pop-radio"><span class="pop-radio-round"></span></span><span class="pop-radio-span">无法播放</span></a>          <a href="javascript:;" class="pop-radio-label"><span class="pop-radio"><span class="pop-radio-round"></span></span><span class="pop-radio-span">音画不同步</span></a>          <a href="javascript:;" class="pop-radio-label"><span class="pop-radio"><span class="pop-radio-round"></span></span><span class="pop-radio-span">播放卡顿</span></a>          <a href="javascript:;" class="pop-radio-label"><span class="pop-radio"><span class="pop-radio-round"></span></span><span class="pop-radio-span">内容问题</span></a>          <a href="javascript:;" class="pop-radio-label"><span class="pop-radio"><span class="pop-radio-round"></span></span><span class="pop-radio-span">其它错误</span></a></div>
        <div class="feeback-textareaBox">
          <textarea id="textarea" name="content" placeholder="请输入反馈，我们将为您不断改进。"></textarea>
          <div class="taskInfo">
              <p class="taskInfo-time"><span></span><span>23:33</span></p>
              <p class="taskInfo-title">任务3 战略规划概述</p>
          </div>
        </div>
        <div class="pop-tel">联系方式
          <input type="text" class="pop-input-tel">
          <div class="right">
            <p @click="closeIndex">取消</p>
            <p class="active" @click="sub()">提交</p>
          </div>
        </div>
      </div>
      
    </div>
	</div>

</template>

<script>

import jquery  from 'jquery';
import { getUserInfo,loginout,complaintOpinion} from '../../../api/port';


export default {

	data() {
	    return {
	    	isShow: true,
	    	is_ok: true
	    }
	},

	created() {

    $('body').attr('show', 'index');

		getUserInfo({'token':this.webApi.getCookie('token')})

		.then(res =>{

	      if(res && res.state == 'success'){
	            
	          if(res.data.mobile){
                  $(".pop-input-tel").val(res.data.mobile)
              }else{
                  $(".pop-input-tel").val(res.data.email)
              } 
	            
	      }

	    })

	},

	updated() {


	},

	components: {
    
  	},

	methods: {
		    closeIndex() {
          this.isShow = !this.isShow;
        },
      	//投诉类型
      	selecType(ev) {
      		ev.target.classList.add("active")
      	},
      	sub() {
          var content = $.trim($('textarea[name=content]').val());
          if (content == '') {
              this.webApi.alert('意见内容不能为空');
              return false;
          }

      //     let task_info_detail = api.pageParam.task_info_detail;
      //     let nameJson = {
      //       "courseName" : task_info_detail.courseName,
      //       "chapterName" : task_info_detail.chapterName,
      //       "taskName" : task_info_detail.taskInfo.title,
      //       "id" : task_info_detail.taskInfo.videoCcid
      //     }
      //     let courseId = task_info_detail.courseId;
      //     let chapterId = task_info_detail.chapterId;
      //     let taskId = task_info_detail.taskInfo.taskId;
      //     let type = task_info_detail.taskInfo.taskType;
      //     let title = task_info_detail.taskInfo.title;
      //     let ccid = task_info_detail.taskInfo.videoCcid;
      //     let siteid = task_info_detail.taskInfo.videoSiteId;
      //     let progress = api.pageParam.progress;//任务进度
      //     let videoTime = task_info_detail.taskInfo.videoTime;


      //     //let title=content.substr(0,20);
      //     let nickName = get_loc_val('mine', 'nickName');
      //     let param = {};
      //     let systype = api.systemType;

      //     param.memberId = getstor('memberId');//投诉人id
      //     param.memberName = nickName;//投诉人昵称
      //     param.cmptType = $(".pop-radio-label.active").find(".pop-radio-span").text();//投诉类型
      //     param.cmptContent = content+'<a class="content-addDom" data-nameJson="'+JSON.stringify(nameJson)+'" href="javascript:;" data-course-id="'+courseId+'" data-chapter-id="'+chapterId+'" data-task-id="'+taskId+'" data-type="'+type+'" data-title="'+title+'" data-video-ccid="'+ccid+'" data-video-siteid="'+siteid+'" data-progress="'+progress+'" data-video-time="'+videoTime+'">视频：'+formatSec(progress)+'</a>';//投诉内容
      //     param.contactWay = $(".pop-input-tel").val();//联系方式
      //     param.deviceDesc = systype;//设备描述

      //     console.log(JSON.stringify(param))

      //     this.webApi.loadingData();

      //     if (this.is_ok) {
      //         this.is_ok = false;
      //         complaintOpinion(param)

      //         .then(res =>{

      //            this.webApi.closeLoadingData();

      //          if (res && res.state == 'success') {

      //                 this.webApi.alert('发表成功');

      //                 setTimeout(function () {
      //                     this.isShow = !this.isShow
      //                 }, 600);

      //             } else {
      //                 this.is_ok = true;
      //                 // this.webApi.alert('发表失败，请重试！');
      //                 this.webApi.alert(res.msg);
      //             }

      //       })
      // }
    }
	},
	mounted() {


		//投诉类型
      	$('#pop-radios .pop-radio-label').on('click', function () {
          	$(this).addClass('active').siblings().removeClass('active');
      	});

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
body[show='index'] {
  overflow-x: hidden;
}
body[show='index'] #mask0 {
  opacity: 1;
  -webkit-transform: translate(-50%, -50%);
}
body[show='video'] {
  overflow-x: hidden;
}
body[show='video'] #mask0 {
  -webkit-transform: translate(-250%, -50%);
}
body[show='video'] #mask3 {
  opacity: 1;
  -webkit-transform: translate(-50%, -50%);
}
body[show='feedback'] {
  overflow-x: hidden;
}
body[show='feedback'] #mask0 {
  -webkit-transform: translate(-250%, -50%);
}
body[show='feedback'] #mask {
  opacity: 1;
  -webkit-transform: translate(-50%, -50%);
}
body[show='about'] {
  overflow-x: hidden;
}
body[show='about'] #mask0 {
  -webkit-transform: translate(-250%, -50%);
}
body[show='about'] #mask2 {
  opacity: 1;
  -webkit-transform: translate(-50%, -50%);
}
.set-info-modal {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.modal {
  width: 13rem;
  height: 11rem;
  font-size: 0.3rem;
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 0;
  -webkit-transform: translate(50%, -50%);
  z-index: 3;
  border-radius: 7px;
  background: #f3f3f3;
  overflow: hidden;
}
.modal .avatar {
  width: 0.7rem;
  height: 0.7rem;
  vertical-align: middle;
  margin-right: 0.4rem;
}
.modal .user_nick {
  color: #494949;
  font-size: 0.34rem;
  font-weight: bold;
}
.modal ul {
  margin: 0.25rem;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 0.12rem;
  line-height: 0.9rem;
}
.modal ul.user-info {
  line-height: 1.1rem;
}
.modal ul li {
  padding: 0 0.3rem;
}
.modal ul li:not(:last-child) {
  border-bottom: 1px solid #ddd;
}
.modal ul li:after {
  content: '';
  display: table;
  clear: both;
}
.modal ul li .right {
  font-size: 0.26rem;
  color: #494949;
}
.modal ul li .icon-check {
  color: #01a185;
  font-size: 0.4rem;
  display: none;
}
.modal ul li.active .icon-check {
  display: inline-block;
}
.modal .logout {
  color: #f00;
}
.modal input {
  margin-right: -0.55rem;
}
.modal .on-off {
  width: 1.3rem;
  height: 0.6rem;
  border-radius: 20px;
  margin: 0.12rem 0 0 0;
  position: relative;
  transition: all 0.3s;
}
.modal .on-off:before {
  content: '';
  position: absolute;
  top: 0.02rem;
  width: 0.56rem;
  height: 0.56rem;
  border-radius: 50%;
  background: #fff;
  box-shadow: 1px 1px #c0c0bc;
}
.modal .public_box {
  background: #00a185;
}
.modal .public_box::before {
  left: 0.02rem;
}
.modal .private_box {
  background: #e1e0db;
}
.modal .private_box::before {
  right: 0.02rem;
}
.modal .set_tit {
  height: 0.9rem;
  line-height: 0.9rem;
  font-size: 0.34rem;
  color: #494949;
  text-align: center;
  border-radius: 7px 7px 0 0;
  background: #fff;
  border-bottom: 1px solid #a8a8a8;
  position: relative;
}
.modal .set_tit .icon-close {
  position: absolute;
  top: 0.33rem;
  right: 0.3rem;
  color: #a4a4a4;
  font-weight: bold;
  font-size: 0.34rem;
}
.modal .set_tit .icon-arrow-left {
  position: absolute;
  top: 0.27rem;
  left: 0.32rem;
  color: #00a085;
  font-weight: bold;
  font-size: 0.4rem;
}
.modal .set_tit .send_btn {
  font-size: 0.28rem;
  color: #494949;
  font-weigth: bold;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  border-radius: 0.1rem;
  padding: 0 0.24rem;
  background: #f2f0f0;
  position: absolute;
  top: 0.15rem;
  right: 0.24rem;
}
.modal .exit {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.2);
}
.modal .exit_choice {
  width: 5.41rem;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 5;
  -webkit-transform: translate(-50%, -50%);
  border-radius: 10px;
  background: #fff;
}
.modal .exit_choice .exit_cur {
  height: 1.28rem;
  line-height: 1.28rem;
  font-family: '微软雅黑';
  color: #4e4e4e;
  font-size: 0.32rem;
  text-align: center;
  border-bottom: 1px solid #acadac;
}
.modal .exit_choice .ok_cancel {
  height: 0.9rem;
  line-height: 0.9rem;
  font-size: 0.34rem;
}
.modal .exit_choice .ok_cancel .cancel {
  width: 50%;
  float: left;
  text-align: center;
  color: #4e4e4e;
  border-right: 1px solid #acadac;
}
.modal .exit_choice .ok_cancel .ok {
  width: 50%;
  float: left;
  text-align: center;
  color: #00a085;
}
.modal textarea {
  min-height: 2.5rem;
  line-height: 0.4rem;
  font-size: 0.3rem;
  color: #494949;
  padding: 0.2rem;
  border: 0;
  border-radius: 7px;
  background: #fff;
  width: 100%;
  outline: none;
}
.modal{
    width: 10.8rem;
    height: 12.6rem;
}

.modal textarea{
    min-height: 3rem;
    padding: 0.2rem 0;
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
    padding-left: 0.1rem;
    font-weight: bold;
    color: #666666;
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
    padding:0.2rem 0.4rem;
    position: relative;
    padding-bottom: 1rem;
}
.taskInfo{
  width: 92.6%;
  position: absolute;
  bottom: 0.2rem;
  line-height: 0.7rem;
  border-top:1px solid #e5e7e7;
  background: #fff;
}
.taskInfo p{

  display: inline-block;
}
.taskInfo p:nth-child(1){
  height: 0.5rem;
  border: 1px solid #42b1ab;
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
    margin-top: -0.4rem;
}
.taskInfo-time span{
  display: inline-block;
  font-size:0.26rem;
}
.taskInfo-time span:nth-child(1){
    width: 0.5rem;
    height: 100%;
    background: #42b1ab;
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
.modal .set_tit{
    font-weight: bold;
}
.modal .set_tit .right{
    width: 1rem;
    height: 0.6rem;
    border:1px solid #dedbdb;
    border-radius: 5px;
    background: #f2f0f0;
    font-size: 0.27rem;
    font-weight:bold;
    color: #5c5c5c;
    text-align: center;
    line-height: 0.6rem;
    position: absolute;
    right: 0.4rem;
    top:0.15rem;
}
.pop-tel div{
    margin-right: 0.8rem;
}
.pop-tel div p{
    display: inline-block;
    width: 2.2rem;
    height: 0.5rem;
    border: 1px solid #42b1ab;
    text-align: center;
    line-height: 0.5rem;
    color: #42b1ab;
    font-weight: bold;
    font-size: 0.26rem;
}
.pop-tel div p:nth-child(1){
    margin-right: 0.4rem;
}
.pop-tel div p.active{
    background: #42b1ab;
    color: #fff;
}
</style>
