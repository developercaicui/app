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
  
  	 this.data =  {
                                    "id": "0451F553230B448DA99FCE30C4BA2ECA",
                                    "taskId": "9cd3531bbfb0563634e9bda29dbe3311",
                                    "title": "0905test",
                                    "taskType": "openCourse",
                                    "taskLevel": "core",
                                    "express": null,
                                    "openCourseTeacherName": "于谦",
                                    "openCourseTeacherPicture": "/upload/openCourse/2017/01/17/1A4E9AF75C354E969022296D244E7C94.jpg",
                                    "openCourseVideoCapture": "",
                                    "openCourseSuitableCrowd": "适合人群1111111111111111",
                                    "openCourseHotspot": "热点1111111111111111",
                                    "openCourseRegistrationAddress": "",
                                    "openCourseComments": "备注11111111111111",
                                    "openCourseStartTime": "1505780400",
                                    "openCourseCourseStatus": "publish",
                                    "openCourseSiteId": "",
                                    "openCourseCcid": "",
                                    "openCourseCertificate": "CMA 英文,CMA 英文 Part-1",
                                    "openCourseBackgroundImage": "/upload/openCourse/2017/01/17/1A4E9AF75C354E969022296D244E7C94.jpg",
                                    "openCourseContent": "/upload/openCourse/2017/01/17/1A4E9AF75C354E969022296D244E7C94.jpg",
                                    "openCourseLiveType": "live",
                                    "openCourseCertificateId": "ff8080814997fb36014998b6ca0804ef",
                                    "openCourseSubjectId": "ff8080814997fb36014998b8660904f0",
                                    "openCourseEndTime": "1505827140",
                                    "openCourseIsPublish": "1",
                                    "openCourseIsRecommend": null,
                                    "openCourseIsInnerAppointment": "1",
                                    "openCourseLiveCover": "/upload/openCourse/2017/01/19/EC5E67DE03494D3CB4EC0B9772BE6079.jpg",
                                    "openCourseLiveListPicture": "/upload/openCourse/2017/01/19/EC5E67DE03494D3CB4EC0B9772BE6079.jpg",
                                    "openCourseTeacherIntroduction": "二哥",
                                    "openCourseTags": "/upload/openCourse/2017/01/17/1A4E9AF75C354E969022296D244E7C94.jpg",
                                    "openCourseClickNumber": null,
                                    "openCourseAdminId": null,
                                    "openCourseLiveRoomId": "9A9AA9D36E17FF089C33DC5901307461",
                                    "openCourseLiveRoomPassword": "",
                                    "openCourseLiveManageId": "CB735BE8334BC857"
                                }
        
        this.data = this.$route.query;

        this.startTime = this.data.openCourseStartTime;
        this.endTime = this.data.openCourseEndTime;

  },
  mounted() {

  	this.liveTitle = this.data.title;

  	this.liveTime = `直播时间:${this.webApi.formatDate(this.startTime,'Y')}月${this.webApi.formatDate(this.startTime,'M')}月${this.webApi.formatDate(this.startTime,'D')}日&nbsp;&nbsp;${this.webApi.formatDate(this.startTime,'h')}:${this.webApi.formatDate(this.startTime,'m')}---${this.webApi.formatDate(this.endTime,'h')}:${this.webApi.formatDate(this.endTime,'m')}`

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
	              console.log('https://view.csslcloud.net/api/view/login?roomid='+values.roomid+"&userid="+values.userid+"&viewername="+values.viewername+"&viewertoken="+values.viewertoken)

	              this.$router.push('iframe?roomid='+values.roomid+"&userid="+values.userid+"&viewername="+values.viewername+"&viewertoken="+values.viewertoken)
	          } 

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
		padding:$commTop 1rem;
		overflow-y: auto;
		.course-test-title {
			width: 100%;
		    margin: 0.2rem auto 0 auto;
		    p{
		    	color: #1f1f1f;
    			line-height: 1.2;
    			font-size: 0.35rem;
    			&:nth-child(1) {
				    font-weight: bold;
				}
				&:nth-child(2) {
				    margin-top: 0.1rem;
				    font-size: 0.3rem;
				    color: #00a084;
				}
		    }
		}
		.detail {

		    width: 100%;
		    background-color: #f0f2f1;
		    padding: 0.1rem;
		    border-radius: 0;
		    border: 1px solid #929292;
		    box-sizing: border-box;
		    margin: 0.1rem auto 0 auto;
		    p {
			    font-size: 0.3rem;
			    color: #393939;
			    font-weight: normal;
			    margin-left: 0.05rem;
			}
		}
		.live-footer{
			width: 100%;
			margin: 0 auto;
    		padding-bottom: 1rem;
    		.live-footer-btn{
    			height: 0.58rem;
			    width: 2rem;
			    border-radius: 0.12rem;
			    background-color: #00a085;
			    font-size: 0.32rem;
			    color: #fff;
			    margin: 0.15rem auto 0.1rem 0;
			    text-align: center;
			    line-height: 0.58rem;
			    border-radius: 0.3rem;
    		}
		}
		
	}


</style>
