<template lang="html">

	<div class="course-content course-pic-list learning">
		<div class="learning-navL">
        <p :class="[(activeBtn==index)?'active':'']" @click="learningNav(index)" v-for="(value,index) in learningData">{{ value.categoryName ? value.categoryName : "&nbsp;&nbsp;&nbsp;" }}</p>
      </div>

      <div class="stydys" v-for="(value,key) in learningData" v-if="activeBtn===key">
        <template v-for="val in value.children">
        <h2>{{ val.subjectName }}</h2>
        <li class="learnLi" data-coursename="" data-chaptername="" @click="openCourse(this,item.courseId,item.chapterId,item.subjectID,item.categoryId,item.subjectName,item.categoryName,item.versionId)" v-for="item in val.courseLists">
          <div style="background-image:url(http://cdnimg.caicui.com/upload/201604/92da0abdac4a45f5b46f9546ade771ac.jpg)" class="cpl-head">
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
                  <div min="0" max="21" class="progress-bar"></div>
                </div>
                <div class="progress-val">{{ item.taskTotal }}%</div>
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
	</div>

</template>

<script>

import {getLearningCourse,getCourseProgres} from '../../../api/port';

export default {

	components: {
		
  	},

	data() {
	    return {
			isIpad: false,
	  		isMobile: false,
			learningData: {}, // 在学课程列表
			learningcourse: {},
			index: 0,
			init: true,
			activeBtn: ""
	    }
	},

	created() {

		let courseParams = {
			pageNo: 1,
			pageSize: 1000,
			token: JSON.parse(this.webApi.getCookie("userInfo")).token
		};
		// 获取活动列表
		getLearningCourse(courseParams)

		.then(res =>{

			if(res && res.state == 'success'){
				let learningcourseData = res;
				let learninglist = res.data.courselist;
	    		let courseArr = [];
				for(var i=0;i<learninglist.length;i++){
					courseArr.push(learninglist[i].courseId);
				}
				let params = {
					'token':JSON.parse(this.webApi.getCookie("userInfo")).token,
					'memberId':JSON.parse(this.webApi.getCookie("userInfo")).memberId,
					'courseId':courseArr.toString()
				}
				
				
				getCourseProgres(params)

				.then(res =>{

					if(res && res.state == 'success'){
						
						for(var i=0;i<learninglist.length;i++){
							for(var j=0;j<res.data.length;j++){ 
								if(learninglist[i].courseId == res.data[j].courseId){
									learninglist[i].showProgress = res.data[j].courseProgress;
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

						let str = JSON.stringify(this.learningData);
						this.activeBtn = str.substr(1, str.indexOf(':'));
						console.log(this.learningData)
						console.log(this.activeBtn)

					}
					
				})
				
			}

		})
		
		 
	},


  methods: {
  	getCourseList() {
		let ret={
		  "data" : {
		    "total" : 11,
		    "courselist" : [ {
		      "categoryIndex" : 10,
		      "taskTotal" : "21",
		      "isU" : 1,
		      "courseBkImage" : "/upload/201604/92da0abdac4a45f5b46f9546ade771ac.jpg",
		      "categoryId" : "ff808081486933e601489c4662f60851",
		      "courseId" : "8a22ecb553eab1280153f36f380a007f",
		      "outline" : "",
		      "teacherName" : "QiQi Wu",
		      "orderID_item_id" : "8a22ecb55474935701547591fa290453",
		      "lock_date" : null,
		      "categoryName" : "CMA中文",
		      "subjectName" : "CMA 中文 Part-1",
		      "courseIndex" : 130,
		      "expirationTime" : 1518574182,
		      "subjectID" : "ff808081486933e601489c799f0f0868",
		      "lock_status" : 0,
		      "teacherImage" : "/upload/201606/09c9342818e24393a970aa93d25b9a4d.png",
		      "versionId" : "ff808081491181a3014917d1bec90762",
		      "teacherHonor" : "吴奇奇",
		      "subjectIndex" : 50,
		      "courseSource" : "zhongbo",
		      "availability" : "<p>\r\n\tCMA P1 中文 前导讲义有更新，更新章节：\r\n</p>\r\n<p>\r\n\t第1章-第1节-知识点1\r\n</p>\r\n<p>\r\n\t<span style=\"line-height:1.5;\">第1章-第2节-知识点2</span> \r\n</p>\r\n第3章-第1节-知识点1<br />",
		      "courseName" : "CMA Part I 中文 前导"
		    }, {
		      "categoryIndex" : 5,
		      "taskTotal" : "67",
		      "isU" : 2,
		      "courseBkImage" : "/upload/201502/f002241f59484b92bd9e9a97b5043093.jpg",
		      "categoryId" : "ff808081473905e701475cd3c2080001",
		      "courseId" : "ff8080814db86d41014dc1a141b70400",
		      "outline" : "",
		      "teacherName" : "Susie Zhang",
		      "orderID_item_id" : "8a22ecb555910eae0155b51b5ffa055d",
		      "lock_date" : null,
		      "categoryName" : "ACCA",
		      "subjectName" : "F9",
		      "courseIndex" : 17,
		      "expirationTime" : 1504496683,
		      "subjectID" : "ff808081473905e7014762542d940078",
		      "lock_status" : 0,
		      "teacherImage" : "/upload/201606/b369525b70a04212923e0a2e761ca664.png",
		      "versionId" : "ff808081473905e701476bd7aca20090",
		      "teacherHonor" : "八年教龄，ACCA金牌讲师",
		      "subjectIndex" : 10,
		      "courseSource" : "zhongbo",
		      "availability" : "ACCA F9基础课 讲义有更新~",
		      "courseName" : "ACCA F9 Financial Management"
		    }, {
		      "categoryIndex" : 5,
		      "taskTotal" : "62",
		      "isU" : 2,
		      "courseBkImage" : "/upload/201502/0c3c222776a64f6ab99e21cc6245845a.jpg",
		      "categoryId" : "ff808081473905e701475cd3c2080001",
		      "courseId" : "ff8080814dc1dc4e014dff8da1b52b9a",
		      "outline" : "",
		      "teacherName" : "Susie Zhang",
		      "orderID_item_id" : "8a22ecb555910eae0155b51b5ffa055d",
		      "lock_date" : null,
		      "categoryName" : "ACCA",
		      "subjectName" : "F9",
		      "courseIndex" : 18,
		      "expirationTime" : 1504496683,
		      "subjectID" : "ff808081473905e7014762542d940078",
		      "lock_status" : 0,
		      "teacherImage" : "/upload/201606/b369525b70a04212923e0a2e761ca664.png",
		      "versionId" : "ff808081486933e6014889882d9c0590",
		      "teacherHonor" : "八年教龄，ACCA金牌讲师",
		      "subjectIndex" : 10,
		      "courseSource" : "zhongbo",
		      "availability" : "",
		      "courseName" : "复习串讲-ACCA F9 Financial Management"
		    }, {
		      "categoryIndex" : 5,
		      "taskTotal" : "61",
		      "isU" : 2,
		      "courseBkImage" : "/upload/201502/fb9f1cfc2911499da1666e8aa5383d47.jpg",
		      "categoryId" : "ff808081473905e701475cd3c2080001",
		      "courseId" : "ff8080814db86d41014dc1a2200f04d0",
		      "outline" : "",
		      "teacherName" : "Cindy Deng",
		      "orderID_item_id" : "8a22ecb555910eae0155b51b5ffa055d",
		      "lock_date" : null,
		      "categoryName" : "ACCA",
		      "subjectName" : "F3",
		      "courseIndex" : 5,
		      "expirationTime" : 1502615106,
		      "subjectID" : "ff808081473905e701476252b4390073",
		      "lock_status" : 0,
		      "teacherImage" : "/upload/201606/448ebf46b76e43158d1431d94c90836a.png",
		      "versionId" : "ff808081473905e7014762700dfa0081",
		      "teacherHonor" : "ACCA资深会员,金牌讲师",
		      "subjectIndex" : 4,
		      "courseSource" : "zhongbo",
		      "availability" : "",
		      "courseName" : "ACCA F3 Financial Accounting"
		    }, {
		      "categoryIndex" : 5,
		      "taskTotal" : "14",
		      "isU" : 2,
		      "courseBkImage" : "/upload/201502/a9ebe23379ba4ab0bd4997d2b604b723.jpg",
		      "categoryId" : "ff808081473905e701475cd3c2080001",
		      "courseId" : "ff8080814dc1dc4e014e00cca7542e08",
		      "outline" : "",
		      "teacherName" : "Cindy Deng",
		      "orderID_item_id" : "8a22ecb555910eae0155b51b5ffa055d",
		      "lock_date" : null,
		      "categoryName" : "ACCA",
		      "subjectName" : "F3",
		      "courseIndex" : 6,
		      "expirationTime" : 1502615106,
		      "subjectID" : "ff808081473905e701476252b4390073",
		      "lock_status" : 0,
		      "teacherImage" : "/upload/201606/448ebf46b76e43158d1431d94c90836a.png",
		      "versionId" : "ff808081486933e60148897bb8480584",
		      "teacherHonor" : "ACCA资深会员,金牌讲师",
		      "subjectIndex" : 4,
		      "courseSource" : "zhongbo",
		      "availability" : "",
		      "courseName" : "复习串讲-ACCA F3 Financial Accounting"
		    }, {
		      "categoryIndex" : 5,
		      "taskTotal" : "96",
		      "isU" : 2,
		      "courseBkImage" : "/upload/201502/06604e12add04761867e6f289ea85988.jpg",
		      "categoryId" : "ff808081473905e701475cd3c2080001",
		      "courseId" : "ff8080814db86d41014dc1a2b31805a1",
		      "outline" : "",
		      "teacherName" : "Crystal Zhang",
		      "orderID_item_id" : "8a22ecb555910eae0155b51b5ffa055d",
		      "lock_date" : null,
		      "categoryName" : "ACCA",
		      "subjectName" : "F5",
		      "courseIndex" : 9,
		      "expirationTime" : 1502094687,
		      "subjectID" : "ff808081473905e7014762534dda0075",
		      "lock_status" : 0,
		      "teacherImage" : "/upload/201606/8cd1b9fb6d394cebabb98fbc9112244f.png",
		      "versionId" : "ff808081473905e701476bd3ddb0008c",
		      "teacherHonor" : "资深会员",
		      "subjectIndex" : 6,
		      "courseSource" : "zhongbo",
		      "availability" : "",
		      "courseName" : "ACCA F5 Performance Management"
		    }, {
		      "categoryIndex" : 5,
		      "taskTotal" : "81",
		      "isU" : 2,
		      "courseBkImage" : "/upload/201502/87c65d3727df4778919c6234a5100929.jpg",
		      "categoryId" : "ff808081473905e701475cd3c2080001",
		      "courseId" : "ff8080814dc1dc4e014e00cd0f0f2e27",
		      "outline" : "",
		      "teacherName" : "Crystal Zhang",
		      "orderID_item_id" : "8a22ecb555910eae0155b51b5ffa055d",
		      "lock_date" : null,
		      "categoryName" : "ACCA",
		      "subjectName" : "F5",
		      "courseIndex" : 10,
		      "expirationTime" : 1502094687,
		      "subjectID" : "ff808081473905e7014762534dda0075",
		      "lock_status" : 0,
		      "teacherImage" : "/upload/201606/8cd1b9fb6d394cebabb98fbc9112244f.png",
		      "versionId" : "ff808081486933e601488980da180588",
		      "teacherHonor" : "资深会员",
		      "subjectIndex" : 6,
		      "courseSource" : "zhongbo",
		      "availability" : "<span> \r\n<p>\r\n\t<br />\r\n</p>\r\n<p>\r\n\t<br />\r\n</p>\r\n<p>\r\n\t<br />\r\n</p>\r\n</span>",
		      "courseName" : "复习串讲-ACCA F5 Performance Management"
		    }, {
		      "categoryIndex" : 5,
		      "taskTotal" : "52",
		      "isU" : 2,
		      "courseBkImage" : "/upload/201502/a167bb130d4d4b98b4794a00e63812ff.jpg",
		      "categoryId" : "ff808081473905e701475cd3c2080001",
		      "courseId" : "ff8080814db86d41014dc1a1a3460481",
		      "outline" : "",
		      "teacherName" : "Hebe Zhang",
		      "orderID_item_id" : "8a22ecb555910eae0155b51b5ffa055d",
		      "lock_date" : null,
		      "categoryName" : "ACCA",
		      "subjectName" : "F7",
		      "courseIndex" : 13,
		      "expirationTime" : 1499138648,
		      "subjectID" : "ff808081473905e701476253fd980077",
		      "lock_status" : 0,
		      "teacherImage" : "/upload/201606/bacc3011e8c54317a3af839ad4bd7c65.png",
		      "versionId" : "ff808081473905e701476bd679ed008e",
		      "teacherHonor" : "五年教龄，金牌讲师",
		      "subjectIndex" : 8,
		      "courseSource" : "zhongbo",
		      "availability" : "",
		      "courseName" : "ACCA F7 Financial Reporting"
		    }, {
		      "categoryIndex" : 5,
		      "taskTotal" : "36",
		      "isU" : 2,
		      "courseBkImage" : "/upload/201502/55e43bffcb8340b9834c727f70f56fe8.jpg",
		      "categoryId" : "ff808081473905e701475cd3c2080001",
		      "courseId" : "ff8080814dc1dc4e014dff808fcc28b5",
		      "outline" : "",
		      "teacherName" : "Hebe Zhang",
		      "orderID_item_id" : "8a22ecb555910eae0155b51b5ffa055d",
		      "lock_date" : null,
		      "categoryName" : "ACCA",
		      "subjectName" : "F7",
		      "courseIndex" : 14,
		      "expirationTime" : 1499138648,
		      "subjectID" : "ff808081473905e701476253fd980077",
		      "lock_status" : 0,
		      "teacherImage" : "/upload/201606/bacc3011e8c54317a3af839ad4bd7c65.png",
		      "versionId" : "ff808081486933e601488985753d058c",
		      "teacherHonor" : "五年教龄，金牌讲师",
		      "subjectIndex" : 8,
		      "courseSource" : "zhongbo",
		      "availability" : "",
		      "courseName" : "复习串讲-ACCA F7 Financial Reporting"
		    }, {
		      "categoryIndex" : 5,
		      "taskTotal" : "34",
		      "isU" : 2,
		      "courseBkImage" : "/upload/201502/73625f7d43bf44c188a7090506a72486.jpg",
		      "categoryId" : "ff808081473905e701475cd3c2080001",
		      "courseId" : "ff8080814f0b1b74014f158ab55a0e33",
		      "outline" : "",
		      "teacherName" : "Alice Liu",
		      "orderID_item_id" : "8a22ecb555910eae0155b51b5ffa055d",
		      "lock_date" : null,
		      "categoryName" : "ACCA",
		      "subjectName" : "ICFE财务英语",
		      "courseIndex" : 1,
		      "expirationTime" : 1498556398,
		      "subjectID" : "ff808081481f989801482047193f001c",
		      "lock_status" : 0,
		      "teacherImage" : "/upload/201506/35286bac812747cb8a5c399bf7f87c9d.jpg",
		      "versionId" : "ff808081481f98980148204d121e001e",
		      "teacherHonor" : "人见人爱，花见花开",
		      "subjectIndex" : 1,
		      "courseSource" : "zhongbo",
		      "availability" : "                    ",
		      "courseName" : "ICFE财务英语标准课 ACCA前导"
		    }, {
		      "categoryIndex" : null,
		      "taskTotal" : "35",
		      "isU" : 1,
		      "courseBkImage" : "/upload/201610/a53af9b49e8144c1a4400128b09b65de.jpg",
		      "categoryId" : null,
		      "courseId" : "8a22ecb557d16e020157d1d7526f1dff",
		      "outline" : "",
		      "teacherName" : "CMA 明星讲师团",
		      "orderID_item_id" : "8a22ecb55474935701547591fa290453",
		      "lock_date" : null,
		      "categoryName" : null,
		      "subjectName" : "CMA中文",
		      "courseIndex" : 1,
		      "expirationTime" : 1507196388,
		      "subjectID" : "ff808081486933e601489c4662f60851",
		      "lock_status" : 0,
		      "teacherImage" : "/upload/201412/e5b55ad1a15448d5bf5f5d1d3ae8f59a.png",
		      "versionId" : "8a22ecb557d16e020157d1d7526f1dff",
		      "teacherHonor" : "吴奇奇 张秀军",
		      "subjectIndex" : 10,
		      "courseSource" : "zhongbo",
		      "availability" : "",
		      "courseName" : "CMA 中文 （体验课）"
		    } ],
		    "pageNo" : 0,
		    "pageSize" : 999
		  },
		  "state" : "success",
		  "msg" : ""
		}

		this.learningcourse = ret
	
		let stooges = this.learningcourse.data.courselist;

		let categoryIdArr = [];
		for(let i=0;i<stooges.length;i++){
		   if(categoryIdArr && categoryIdArr.length){
		         let isPush = true;
		         for(let j=0;j<categoryIdArr.length;j++){
		               if(stooges[i].subjectID == categoryIdArr[j].subjectID){
		                     isPush = false;
		               }
		         }
		         if(isPush){
		               categoryIdArr.push({
		                     categoryId :　stooges[i].categoryId,
		                     subjectID :　stooges[i].subjectID,
		                     categoryIndex :　stooges[i].categoryIndex,
		                     subjectIndex : stooges[i].subjectIndex,
		                     categoryName : stooges[i].categoryName,
		                     subjectName : stooges[i].subjectName,
		                     courseLists : []
		               })
		         }
		   }else{
		         categoryIdArr.push({
		               categoryId :　stooges[i].categoryId,
		               subjectID :　stooges[i].subjectID,
		               categoryIndex :　stooges[i].categoryIndex,
		               subjectIndex : stooges[i].subjectIndex,
		               categoryName : stooges[i].categoryName,
		               subjectName : stooges[i].subjectName,
		               courseLists : []
		         })
		   }
		   
		}
		let courseLists = [];
		for(let i=0;i<categoryIdArr.length;i++){
		   for(let j=0;j<stooges.length;j++){
		         if(categoryIdArr[i].subjectID == stooges[j].subjectID){
		               categoryIdArr[i].courseLists.push(stooges[j]);
		         }
		   }
		}
		function down(x, y) {
		      return (x.subjectIndex > y.subjectIndex) ? 1 : -1
		}
		
		let learningD = {};
		categoryIdArr.forEach(function(val, i) {
		    let categoryName = val.categoryName;
		    let categoryId = val.categoryId; 
		    if (!learningD[categoryId]) {
		        learningD[categoryId] = {
		           categoryName : categoryName,
		           subjectIndex : categoryIdArr[i].subjectIndex,
		           children: [categoryIdArr[i]]
		        }
		    }else{
		      learningD[categoryId].children.push(
		            categoryIdArr[i]
		      )
		      learningD[categoryId].children.sort(down)
		    }
		    
		});

		this.learningData =  learningD;
		
		let str = JSON.stringify(this.learningData);
		console.log(str.substr(1, str.indexOf(':')))
  	},
  	learningNav(ind) {

        this.init = false;
        this.activeBtn = ind;
      },
      formatDate(now, t) {
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
      }
  },
  mounted () {
    // this.getCourseList()
  }
}

</script>

<style lang="scss" scoped>
.course-content{
    padding-top:1.6rem;
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
  }
}

.course-pic-list{
  li{
    margin: 0.2rem 0;
      height: 2rem;
      width: 6.8rem;
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
          color: #212121;
          font-size: 0.24rem;
        }
        p{
          margin: 0.05rem 0;
          font-size: 0.2rem;
        }

      }
      .cpl-main .li{
        padding: 0.3rem 0.3rem;
        height: 0.95rem;
        overflow: hidden;
      }
      .learnLi:before{
        content: "";
        position: absolute;
        z-index: 3;
        background: #eee;
        width: 44%;
        height: 0.03rem;
        bottom: 0.75rem;
        right: 0.7rem;
      }
  }
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
  background: #00a185;
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
  border: 1px solid #00a185;
  background: #00a185;
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
  color: #00a185;
  background: none;
  margin:0 0.5rem;
  position:absolute;
}

</style>
