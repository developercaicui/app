<template lang="html">

	<div class="live-wrap-ipad">

		<div class="main">
			<div class="course-test-title">
	         	<p v-html="liveTitle"></p> 
	         	<p v-html="liveTime"></p>
	      	</div>
	      	<div class="detail">
	      		<p v-html="liveContent"></p>
	      	</div>
	      	<div class="live-footer">
	          <div @click="opencourseLive" class="live-footer-btn" v-html="liveBtn"><!-- 预约报名 --></div>
	        </div>  
		</div>
		<iframe style="position: absolute;z-index: 2;" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>

	</div>

</template>

<script>

export default {

  data() {
    return {
    	data: {},
		liveTime: '',
		liveTitle: '',
		liveContent: '',
		liveBtn: '',
		startTime: '',
		endTime: '',
		is_ok: false,
    }
  },
  created() {
  	 this.data = {
          "id" : "C12F16482A1345A5971B9A9866F5FD92",
          "taskId" : "32d0ad71a7a7ba09c495f94cdb3b4336",
          "title" : "9月ACCA考前冲刺串讲直播-P7",
          "taskType" : "openCourse",
          "taskLevel" : "core",
          "express" : null,
          "openCourseTeacherName" : "王承平",
          "openCourseTeacherPicture" : "/upload/openCourse/2017/08/07/F4737FDBD775425593DD6FB32BA933CF.jpg",
          "openCourseVideoCapture" : "/upload/openCourse/2017/08/07/11F2E48639234B7B9AA74F4E005B9C7D.jpg",
          "openCourseSuitableCrowd" : "",
          "openCourseHotspot" : "",
          "openCourseRegistrationAddress" : "",
          "openCourseComments" : "",
          "openCourseStartTime" : 1503187200,
          "openCourseCourseStatus" : "publish",
          "openCourseSiteId" : "D550E277598F7D23",
          "openCourseCcid" : "",
          "openCourseCertificate" : "ACCA,P7",
          "openCourseBackgroundImage" : "/upload/openCourse/2017/08/02/AD8C5A58611E4C428675EAE2160BD559.jpg",
          "openCourseContent" : "开课时间：\r\n8月19日：上午9:00-12:00   下午14:30-17:30\r\n8月20日：上午9:00-12:00   下午14:30-17:30",
          "openCourseLiveType" : "construe",
          "openCourseCertificateId" : "ff808081473905e701475cd3c2080001",
          "openCourseSubjectId" : "ff8080814dc1dc4e014de1236c921356",
          "openCourseEndTime" : 1503223200,
          "openCourseIsPublish" : null,
          "openCourseIsRecommend" : null,
          "openCourseIsInnerAppointment" : 1,
          "openCourseLiveCover" : "/upload/openCourse/2017/08/02/AD8C5A58611E4C428675EAE2160BD559.jpg",
          "openCourseLiveListPicture" : "/upload/openCourse/2017/08/02/AD8C5A58611E4C428675EAE2160BD559.jpg",
          "openCourseTeacherIntroduction" : "王承平",
          "openCourseTags" : "",
          "openCourseClickNumber" : null,
          "openCourseAdminId" : null,
          "openCourseLiveRoomId" : "AE1E5FEC55B464139C33DC5901307461",
          "openCourseLiveRoomPassword" : "",
          "openCourseLiveManageId" : "CB735BE8334BC857"
        }

        this.startTime = this.data.openCourseStartTime;
        this.endTime = this.data.openCourseEndTime;

  },
  mounted() {

  	this.liveTitle = this.data.title;

  	this.liveTime = `直播时间:${this.webApi.formatDate(this.startTime,'M')}月${this.webApi.formatDate(this.startTime,'D')}日&nbsp;&nbsp;${this.webApi.formatDate(this.startTime,'h')}:${this.webApi.formatDate(this.startTime,'m')}---${this.webApi.formatDate(this.endTime,'h')}:${this.webApi.formatDate(this.endTime,'m')}`

	this.liveContent = this.stringToEntity(this.data.openCourseContent);

	this.setLiveBtn();

  },

  methods: {
  	opencourseLive() {
  		if(this.is_ok){
  			if(this.data.openCourseLiveRoomPassword){
	              let values = {
	                  roomid: this.data.openCourseLiveRoomId,
	                  userid: this.data.openCourseLiveManageId,
	                  viewername: JSON.parse(this.webApi.getCookie("userInfo")).nickName,
	                  viewertoken: this.data.openCourseLiveRoomPassword,
	                  autoLogin: true
	              }


	              location.href = 'https://view.csslcloud.net/api/view/login?roomid='+values.roomid+"&userid="+values.userid+"&viewername="+values.viewername+"&viewertoken="+values.viewertoken;

	              return false;

	          }else{
	              let values = {
	                  roomid: this.data.openCourseLiveRoomId,
	                  userid: this.data.openCourseLiveManageId,
	                  viewername: JSON.parse(this.webApi.getCookie("userInfo")).memberId,
	                  viewertoken: this.webApi.getCookie('token'),
	                  autoLogin: true
	              }

	          }

	          // values.roomid = "FD9878C7F1462B8F9C33DC5901307461";
	          // values.userid = "5A5317CD18F546D7";

	          // values.viewername = "8a22cc685215de9f01521b37b748020f";
	          // values.viewertoken = "9bb38605-2a65-4c80-bb0e-013d075183ca";
	          
	           
	          // console.log('https://view.csslcloud.net/api/view/login?roomid='+values.roomid+"&userid="+values.userid+"&viewername="+values.viewername+"&viewertoken="+values.viewertoken)

	           $("iframe").attr("src",'course-live-iframe.html?roomid='+values.roomid+"&userid="+values.userid+"&viewername="+values.viewername+"&viewertoken="+values.viewertoken)

  		}
  	},
	stringToEntity(str) {
      	let newStr = '';
      	let arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"','#39':"'"};
      	newStr = str.replace(/&(lt|gt|nbsp|amp|quot|#39);/ig,function(all,t){
      		return arrEntities[t];
      	});
      	return newStr;
    },
    setLiveBtn() {

      	let nowTime = new Date().getTime();

      	if(nowTime < this.startTime*1000){

          	this.liveBtn = "直播未开始";

      	}else if(nowTime >= this.startTime*1000 && nowTime < this.endTime*1000){

          	this.liveBtn = "进入直播间";

          	this.is_ok = true;

      	}else{
          	this.is_ok = true;

          	this.liveBtn = "直播已结束";

      	}
    },

  },

}

</script>

<style lang="scss" scoped>

	@import "../../../assets/style/mixin";

	.live-wrap-ipad{
		width: 100%;
		height: 100%;
		padding-top: $commTop;
		background-color: $commTopWhite;
		.course-test-title {
			width: 90%;
		    margin: 0.2rem auto 0 auto;
		    p{
		    	color: #1f1f1f;
    			line-height: 1.2;
    			font-size: 0.25rem;
    			&:nth-child(1) {
				    font-weight: bold;
				}
				&:nth-child(2) {
				    margin-top: 0.1rem;
				    font-size: 0.2rem;
				    color: #00a084;
				}
		    }
		}
		.detail {

		    width: 90%;
		    background-color: #f0f2f1;
		    padding: 0.1rem;
		    border-radius: 0;
		    border: 1px solid #929292;
		    box-sizing: border-box;
		    margin: 0.1rem auto 0 auto;
		    p {
			    font-size: 0.18rem;
			    color: #393939;
			    font-weight: normal;
			    margin-left: 0.05rem;
			}
		}
		.live-footer{
			width: 90%;
			margin: 0 auto;
    		padding-bottom: 1rem;
    		.live-footer-btn{
    			height: 0.58rem;
			    width: 2rem;
			    border-radius: 0.12rem;
			    background-color: #00a085;
			    font-size: 0.26rem;
			    color: #fff;
			    margin: 0.15rem auto 0.1rem 0;
			    text-align: center;
			    line-height: 0.58rem;
			    border-radius: 0.3rem;
    		}
		}
		
	}


</style>
