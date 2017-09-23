<template lang="html">
	
	<div class="course-content course-pic-list learning" ref="courseContentlearn">
	<SlideRefresh @top-status-change="topStatusChange">
		<div class="learning-navL">
        <p :class="[(activeBtn==index)?'active':'']" @touchend="learningNav(index)" v-for="(value,index) in learningData">{{ value.categoryName ? value.categoryName : "&nbsp;&nbsp;&nbsp;" }}</p>
      </div>

      <div class="stydys" v-for="(value,key) in learningData" v-if="activeBtn===key">
        <template v-for="val in value.children">
        <h2>{{ val.subjectName }}</h2>
        <li class="learnLi" data-coursename="" data-chaptername="" @click="openCourse(item,$event)" v-for="item in val.courseLists">
          <div :style="setBackground(item.courseBkImage)" class="cpl-head">
            <h4 class="exam_time none"></h4>
            <h4 class="course_due">课程到期：{{ formatDate(item.expirationTime,"Y")+'-'+formatDate(item.expirationTime,'M')+'-'+formatDate(item.expirationTime,'D') }}</h4>
          </div>
          <div class="cpl-main">
            <div class="li">
              <h3>{{ item.courseName }}</h3>
            </div>
            <div class="li pro-li">
              <div class="progress-box">进度： 
                <div class="progress">
                  <div :data-courseProgress="item.courseProgress" :data-progress="item.progress" :min="[item.courseProgress?item.courseProgress:0]" :max="[item.taskTotal?item.taskTotal:0]" class="progress-bar"></div>
                </div>
                <div class="progress-val"></div>
              </div>
            </div>
            <div class="li cpl-fool">
              <div onclick="openActivate('CMA Part I 中文 前导','QiQi Wu','吴奇奇','undefined','undefined','/upload/201606/09c9342818e24393a970aa93d25b9a4d.png','1','8a22ecb553eab1280153f36f380a007f','/upload/201604/92da0abdac4a45f5b46f9546ade771ac.jpg',this)" class="btn btn-o" style="display:none;">
                <span>马上激活</span>
                <div class="hide data"></div>
              </div>
              <div tapmode onclick="renew()" class="btn btn-o" style="display:none;">
                <span>申请重听</span>
              </div>
            </div>
          </div>
        </li>
        </template>
      </div>
		<img class="no-data" v-show="this.sectionList && this.sectionList.length === 0" src="../../../assets/img/404.svg"/>
      </SlideRefresh>
	</div>

</template>

<script>

import {getLearningCourse,getCourseProgres} from '../../../api/port';
import SlideRefresh from '../../../components/Comm/SlideRefresh';

export default {

	components: {
		SlideRefresh
  	},

	data() {
	    return {
			isIpad: false,
	  		isMobile: false,
			learningData: {}, // 在学课程列表
			learningcourse: {},
			activeBtn: "",
			imgurl: 'http://cdnimg.caicui.com/',
			sectionList:[],
	    }
	},

	created() {
		
		this.getDate();
		 
	},


  methods: {
  	// 课程的实时状态
	topStatusChange(status) {

		if(status == 'loading') {

			this.getDate();
			
		}

	},
	getDate() {
		let courseParams = {
			pageNo: 1,
			pageSize: 1000,
			token: this.webApi.getCookie('token')
		};

		this.webApi.loadingData();

		// 获取在学课程列表
		getLearningCourse(courseParams)

		.then(res =>{

			this.webApi.closeLoadingData();

			if(res && res.state == 'success'){

				if(res.data.courselist.length < 1){
				      return false;
				}

				let learningcourseData = res;

				let setListObj = {},setListArr = [];

				for(let i=0;i<res.data.courselist.length;i++){
				    if(!setListObj[res.data.courselist[i].courseId]){
				        setListArr.push(res.data.courselist[i]);
				        setListObj[res.data.courselist[i].courseId] = "1"
				    }
				}

				res.data.courselist = setListArr;

				let learninglist = res.data.courselist;
	    		let courseArr = [];
				for(let i=0;i<learninglist.length;i++){
					courseArr.push(learninglist[i].courseId);
				}
				let params = {
					'token':this.webApi.getCookie('token'),
					'memberId':JSON.parse(this.webApi.getCookie("userInfo")).memberId,
					'courseId':courseArr.toString()
				}
				
				// 获取课程学习进度
				getCourseProgres(params)

				.then(res =>{

					if(res && res.state == 'success'){
						
						for(let i=0;i<learninglist.length;i++){
							for(let j=0;j<res.data.length;j++){ 
								if(learninglist[i].courseId == res.data[j].courseId){
									learninglist[i].courseProgress = res.data[j].courseProgress;
						            learninglist[i].createDate = res.data[j].createDate;
						            learninglist[i].chapterId = res.data[j].chapterId;
						            learninglist[i].chapterName = res.data[j].chapterName;
						            learninglist[i].progress = res.data[j].progress;
						            learninglist[i].taskId = res.data[j].taskId;
						            learninglist[i].taskName = res.data[j].taskName;

								}
							}
						}

						let ret={
						  data : {
						    total : learningcourseData.data.total,
						    courselist : learninglist
						  }
						}

						this.learningData = this.webApi.outCourseList(ret);

						this.sectionList.push(this.learningData);
					  	
						let str = JSON.stringify(this.learningData);

						this.activeBtn = str.substr(2, str.indexOf(':')-3);
						
						
					}
					
				})
				
			}

		})
	},
  	
  	learningNav(ind) {
	    this.activeBtn = ind;
	},
	formatDate(now, t) {//时间转换
	    let date = new Date(parseInt(now * 1000));
	    let Y,M,D,h,m,s;
	    if (t == 'Y') {
	        Y = date.getFullYear();
	        return Y;
	    }
	    if (t == 'M') {
	        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
	        return M;
	    }
	    if (t == 'D') {
	        D = date.getDate();
	        return this.extra(D);
	    }
	    if (t == 'h') {
	        h = date.getHours();
	        return this.extra(h);
	    }
	    if (t == 'm') {
	        m = date.getMinutes();
	        return this.extra(m);
	    }
	    if (t == 's') {
	        s = date.getSeconds();
	        return this.extra(s);
	    }
    },
	 //补位函数。
	extra(x) {
	    //如果传入数字小于10，数字前补一位0。
	    if (parseInt(x) < 10) {
	      return "0" + parseInt(x);
	    } else {
	      return x;
	    }
	},
	// 横向进度条
	progressBar() {
		let progressBarlist = document.getElementsByClassName("progress-bar");
		let progr = document.getElementsByClassName("stydys");
		for(let i=0;i<progressBarlist.length;i++){
			let _t = progressBarlist[i];
			let taskprogress = _t.getAttribute('data-courseProgress') ? parseInt(_t.getAttribute('data-courseProgress')) : 0;
			let taskTotal = _t.getAttribute('max') ? parseInt(_t.getAttribute('max')) : 0;
			let percentage = 0;
			let lastProgress = _t.getAttribute('data-progress');
			if(taskprogress && taskTotal){
				let a = taskprogress/taskTotal;
				if(a>0 && a<0.01){
					a = 0.01
				}
				percentage = parseInt(a*100);
			}else if(lastProgress){
				percentage = 1;
			}

	        let $val = _t.parentNode.parentNode.lastChild;

	        if($val){
	            $val.innerHTML = percentage+'%';
	        }	      
	        if (_t.getAttribute('data')!='1') {
	            setTimeout(function(){
	                _t.style.width = percentage + '%';
	            },500);
	            _t.setAttribute('data','1');
	        }
		}
	},
	setBackground(url) {
		return `background-image:url(${this.webApi.cdnImgUrl}${url})`
	},
	openCourse(data,ev) {// 发送课程信息给原生

		if(data.lock_status != 0 ){

			this.webApi.alert('当前的课程已锁定,续费后即可解锁！');

			return false;

		}

		let obj = this.webApi.recursiveParentNode(ev.target,'li');
		let progress = obj.querySelector("div.progress-val").innerText.replace(/\%/g,"");
		data.studyProportion = progress;
		data.expirationTime = this.formatDate(data.expirationTime,"Y")+'/'+this.formatDate(data.expirationTime,'M')+'/'+this.formatDate(data.expirationTime,'D');
		data.token = this.webApi.getCookie('token');
		data.memberId = JSON.parse(this.webApi.getCookie("userInfo")).memberId;
		
		g.getClassCourseData(JSON.stringify(data))
	}
  },
  updated() {
	this.progressBar();
  },
  mounted () {

    
  }
}

</script>

<style lang="scss" scoped>
@import "../../../assets/style/mixin";
.course-content{
    padding-top:1.4rem;
}
.learning-navL {
    line-height: 1rem;
    padding-left: 1.1rem;
    p{
      display: inline-block;
      border: 2px solid #3d4e64;
      line-height: 0.6rem;
      padding: 0 0.6rem;
      font-weight: bold;
      font-size: 0.3rem;
      color: #3d4e64;
      margin-right: 0.6rem;
    }
    .active{
	    background: #3d4e64;
	    color: #fff;
    }
}

.stydys{
  margin-left: 1.1rem;
  margin-top: 0.38rem;
  h2 {
      padding-bottom: 0.1rem;
      font-size: 0.26rem;
      color: #3d4e64;
      font-weight: bold;
  }
}

.course-pic-list{
  li{
    margin: 0.2rem 0;
      height: 2rem;
      width: 6.9rem;
      background: #fff;
      border-bottom: 1px solid #ddd;
      position: relative;
      display: inline-block;
      border: 1px solid #d2d2d2;
      margin-right: 0.4rem;

      .cpl-head{
        background-size: 100% 100%;
        height: 100%;
        color: #fff;
        width: 2.8rem;
        float: left;
        h4{
          font-size: 0.2rem;
          padding: 0.8rem 0 0 0.16rem;
        }
      }
      .cpl-main{
        color: #606f77;
        float: left;
        width: 3.9rem;
        .li{
          padding: 0.3rem 0.3rem;
          height: 0.95rem;
          overflow: hidden;
        }
        h3{
          color: #3d4e64;
          font-size: 0.24rem;
        }
        p{
          margin: 0.05rem 0;
          font-size: 0.2rem;
        }

      }
      .cpl-main .li{
        padding: 0.3rem 0.3rem;
        height: 0.9rem;
        overflow: hidden;
      }
     
  }
}
.course-pic-list li.learnLi:before{
	content: "";
    position: absolute;
    z-index: 3;
    background: #eee;
    width: 50%;
    height: 0.03rem;
    bottom: 0.75rem;
    right: 0.3rem;
}
.course-pic-list .progress-box {
  display: block;
  margin-top: 0.2rem;
  font-size: 0.3rem;
}
.course-pic-list .progress-box .progress {
  height: 0.07rem;
  width: 62%;
}
.course-pic-list .progress-box .progress .progress-bar {
  height: 0.07rem;
}
.progress-box {
  display: inline-block;
  white-space: nowrap;
  margin-right: 0.2rem;
  color: #999999;
}
.progress-box > * {
  display: inline-block;
  vertical-align: middle;
}
.progress-box .progress {
  height: 0.1rem;
  width: 100%;
  background: #ccc;
  border-radius: 0.05rem;
  overflow: hidden;
}
.progress-box .progress .progress-bar {
  width: 0;
  height: 0.1rem;
  background: #ff366d;
  border-radius: 0.05rem;
  transition: all 1.2s 0.8s;
}
.progress-box .progress-val {
  margin: 0 0.1rem;
  position: absolute;
}
.progress-box .progress-val ~ .progress {
  width: 75%;
}
.btn {
  font-size: 0.32rem;
  display: inline-block;
  text-align: center;
  padding: 0 0.5rem;
  border: 1px solid #ff366d;
  background: #ff366d;
  color: #fff;
  margin: auto 0.2rem;
}
.btn.btn-block {
  display: block;
  letter-spacing: 0.5rem;
  text-indent: 0.5rem;
}
.btn.btn-bind {
  background: #02aed9;
  letter-spacing: 0.05rem;
  text-indent: 0.05rem;
}
.btn.btn-o {
  color: #ff366d;
  background: none;
  margin:0 0.5rem;
  position:absolute;
}
.no-data{
	@extend .ab;
	@include wh(2.4rem, 2.4rem);
	left: 50%; top: 4rem;
	margin-left: -1.2rem;
}
</style>
