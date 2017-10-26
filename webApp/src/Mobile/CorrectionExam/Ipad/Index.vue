<template lang="html">
	 <main>
      <CorrectionExam :correctionData="correctionData" v-if="isShowpre" @isShow="isShow"></CorrectionExam>
   </main>
</template>

<script>

import $ from 'jquery';
import CorrectionExam from '../../../components/CorrectionExam';

export default {

	data() {
	    return {
	    	correctionData:{},
        isShowpre:true
	    }
	},

	created() {
    this.correctionData = {
          "courseId": "ff8080814dad5062014dadd9c70d0053",
          "courseName": "ACCA F2 Management Accounting",
          "chapterId": "ff8080814dad5062014dadd9c739005a",
          "chapterName": "Chapter 1 The Nature, Source and Purpose of Management Accounting",
          "progress": 3,
          "exerciseId": "8a22ecb55340689101534f0199100058",//tasks里面的id
          "taskId": "8a22ecb5559bad0501559fe5d3d8003b",//任务的taskId
          "taskName": "ACCA F2 Management Accounting-CH1章节测评",//任务的title
          "examType": "exam",
          "examName": "",
      }

	},

	updated() {


	},

	components: {
    CorrectionExam
  },

	methods: {
		 isShow(boll) {
      console.log(boll)
      this.isShowpre = boll
    }
	},
	mounted() {


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
  color: $themeColor;
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
    margin-top: -0.4rem;
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
