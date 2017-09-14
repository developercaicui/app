<template lang="html">
	<div class="set-info-modal" v-if="isShow">
		<div class="backdrop"></div>
    <div class="set-info-modal">
      <div id="mask0" class="modal">
        <div class="set_tit">试题纠错
            <div @click="closeIndex" class="right">关闭</div>
        </div>
        <div id="pop-radios" class="pop-radios">
          <a href="javascript:;" class="pop-radio-label active"><span class="pop-radio"><span class="pop-radio-round"></span></span><span class="pop-radio-span">答案有异议</span></a>          
          <a href="javascript:;" class="pop-radio-label"><span class="pop-radio"><span class="pop-radio-round"></span></span><span class="pop-radio-span">解析有误</span></a>          
          <a href="javascript:;" class="pop-radio-label"><span class="pop-radio"><span class="pop-radio-round"></span></span><span class="pop-radio-span">错别字</span></a>          
          <a href="javascript:;" class="pop-radio-label"><span class="pop-radio"><span class="pop-radio-round"></span></span><span class="pop-radio-span">排版错误</span></a>          
          <a href="javascript:;" class="pop-radio-label"><span class="pop-radio"><span class="pop-radio-round"></span></span><span class="pop-radio-span">其它错误</span></a>
        </div>
        <div class="feeback-textareaBox">
          <textarea id="textarea" name="content" placeholder="请输入反馈，我们将为您不断改进。"></textarea>
          <div class="taskInfo">
              <p class="taskInfo-time"><span></span><span>1题</span></p>
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

import $ from 'jquery';
import { getUserInfo,loginout,complaintOpinion} from '../../../api/port';

export default {

	data() {
	    return {
	    	isShow: true,
	    	is_ok: true,
        data:{},
        task_info_detail:{}
	    }
	},

	created() {
    // 试卷类型数据
    this.data = {
      "task_info_detail": {
          "courseId": "ff8080814dad5062014dadd9c70d0053",
          "courseName": "ACCA F2 Management Accounting",
          "chapterId": "ff8080814dad5062014dadd9c739005a",
          "chapterName": "Chapter 1 The Nature, Source and Purpose of Management Accounting",
          "knowledgePointId": null,
          "progress": 3,
          "taskInfo": {
              "id": "8a22ecb55340689101534f0199100058",
              "taskId": "8a22ecb5559bad0501559fe5d3d8003b",
              "title": "ACCA F2 Management Accounting-CH1章节测评",
              "taskType": "exam",
              "taskLevel": null,
              "express": null,
              "totalCount": 10,
              "difficulty": "简单",
              "examenType": "chapter",
              "examUrl": "/exam/examination/examinationTask/8a22ecb55340689101534f0199100058"
          }
      },
      "exam_id": {
          "title": "Which one of the followings is not a level of decision making in an&nbsp;organization?<br />\r\n<div>\r\n\t<br />\r\n</div>",
          "id": "ff8080814c4f2e9f014c5f189a42013d",
          "background": null,
          "context": "[{\"title\":\"Management\",\"isChecked\":false},{\"title\":\"Operational\",\"isChecked\":false},{\"title\":\"Board\",\"isChecked\":true},{\"title\":\"Strategic\",\"isChecked\":false}]",
          "sn": 2150,
          "questionTypes": "radio",
          "source": "中博练习册",
          "answerResolution": "Strategic, operational and management are the three levels of decision<br />\r\nmaking in an organization.<br />\r\n&nbsp;<br />"
      }
    }
    
    //知识点练习类型数据
    // this.data = {
    //   "task_info_detail":{
    //     "courseId":"8a22ecb5545a87e801545af5048c0006",
    //     "courseName":"CMA Part I 中文 基础课",
    //     "chapterId":"8a22ecb55b1ec7e9015b228f54e00031","chapterName":"知识点1 战略规划概述","knowledgePointId":"8a22ecb55aa7aa10015ac65817840a36",
    //     "progress": 30,
    //     "taskInfo":{
    //         "id":"91e6a108c22e0e440e9f3ad3b106042a","taskId":"91e6a108c22e0e440e9f3ad3b106042a","title":"知识点练习","taskType":"knowledgePointExercise","taskLevel":"core","express":null
    //     }
    //   },
    //   "data_exercise_id":"915dbd195dcf27db11ce264653e87d45",
    //   "exam_info":{
    //     "id":"915dbd195dcf27db11ce264653e87d45","createDate":1500634013000,"modifyDate":1500634013000,"accuracy":0,"answerResolution":"职能战略增强了组织的竞争战略。","background":null,"context":"[{\"title\":\"它用财务和非财务指标确定组织的价值。\",\"isChecked\":false,\"myChecked\":false},{\"title\":\"它强化组织的竞争战略。\",\"isChecked\":true,\"myChecked\":false},{\"title\":\"它决定如何根据组织业务进行资源分配。\",\"isChecked\":false,\"myChecked\":true},{\"title\":\"它聚焦于分辨和培育关键资源。\",\"isChecked\":false,\"myChecked\":false}]","exerciseState":"publish","questionTypes":"radio","sn":10466,"title":"以下涉及职能战略的哪项内容是正确的？","difficultyId":"ff8080814a7a4010014a7a715a7d00b8","sourceId":"ff8080814f1c162a014f200204971459","versionId":"ff8080814f1c162a014f200e6b482543","fileName":null,"sheetName":null,"nid":18938
    //   }
    // }

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
          let content = $.trim($('textarea[name=content]').val());
          if (content == '') {
              this.webApi.alert('意见内容不能为空');
              return false;
          }

          let task_info_detail = this.data.task_info_detail;
          if(this.data.data_exercise_id){
              task_info_detail.taskInfo.id = this.data.data_exercise_id;
          }
          let nameJson = {
            "courseName" : task_info_detail.courseName,
            "chapterName" : task_info_detail.chapterName,
            "taskName" : task_info_detail.taskInfo.title,
            "id" : task_info_detail.taskInfo.id
          }
          let courseId = task_info_detail.courseId;
          let chapterId = task_info_detail.chapterId;
          let taskId = task_info_detail.taskInfo.taskId;
          let type = task_info_detail.taskInfo.taskType;
          let title = task_info_detail.taskInfo.title.replace(/\n|\r|\t|<[^<]*>/g,'');
          let progress = task_info_detail.progress;
          let exam_id = this.data.exam_id;
          let exercise_id = "";
          if(exam_id){
              exercise_id = exam_id.id;
              title = exam_id.title.replace(/\n|\r|\t|<[^<]*>/g,'');
          }else{
              exercise_id = task_info_detail.taskInfo.id;
          }

          let nickName = JSON.parse(this.webApi.getCookie("userInfo")).nickName;
          let param = {};
          let systype = "ipad";

          param.memberId = JSON.parse(this.webApi.getCookie("userInfo")).memberId;//投诉人id
          param.memberName = nickName;//投诉人昵称
          param.cmptType = $(".pop-radio-label.active").find(".pop-radio-span").text();//投诉类型
          param.cmptContent = content+'<a class="content-addDom" data-nameJson="'+JSON.stringify(nameJson)+'" href="javascript:;" data-course-id="'+courseId+'" data-chapter-id="'+chapterId+'" data-task-id="'+taskId+'" data-type="'+type+'" data-title="'+title+'" data-sort="'+progress+'" data-exercise-id="'+exercise_id+'"><试题：'+progress+'题></a>';//投诉内容
          param.contactWay = $(".pop-input-tel").val();//联系方式
          param.deviceDesc = systype;//设备描述

          console.log(JSON.stringify(param))

          this.webApi.loadingData();

          if (this.is_ok) {

              this.is_ok = false;

              complaintOpinion(param)

              .then(res =>{

                 this.webApi.closeLoadingData();

               if (res && res.state == 'success') {

                      this.webApi.alert('发表成功');

                      setTimeout(function () {

                          //关闭此页面


                      }, 600);

                  } else {
                      this.is_ok = true;
                      // this.webApi.alert('发表失败，请重试！');
                      this.webApi.alert(res.msg);
                  }

              })
          }
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

    let title = this.data.task_info_detail.taskInfo.title;

    if(this.data.exam_info){
        title = this.data.exam_info.title;
    }
    if(this.data.exam_id){
        title = this.data.exam_id.title;
    }

    let progress = this.data.task_info_detail.progress;//任务进度

    $(".taskInfo-time").find("span").eq(1).html(progress+"题");
    $(".taskInfo-title").html(title.replace(/\n|\r|\t|<[^<]*>/g,''));

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
body{
  overflow-x: hidden;
}
body #mask0 {
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

.modal input {
  margin-right: -0.55rem;
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
  border: 1px solid #ff366d;
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
    background: #ff366d;
    border-radius: 3px;
}
.taskInfo-time span:nth-child(1):before{
    content: "";
    width: 0.26rem;
    height: 0.26rem;
    background: url(../../../assets/img/exam.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0.22rem;
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
    border: 1px solid #ff366d;
    text-align: center;
    line-height: 0.5rem;
    color: #ff366d;
    font-weight: bold;
    font-size: 0.26rem;
}
.pop-tel div p:nth-child(1){
    margin-right: 0.4rem;
}
.pop-tel div p.active{
    background: #ff366d;
    color: #fff;
}
</style>
