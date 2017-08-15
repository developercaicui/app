<template lang="html">

	<div>
		<courseIpad :learning-data='learningData' v-show="isIpad"></courseIpad>
		<courseMobile :learning-data='learningData' v-show="isMobile"></courseMobile>
	</div>

</template>

<script>

import courseIpad from './Ipad';
import courseMobile from './Mobile';
import { getLearningCourse , getCourseProgress} from '../../api/port';


export default {

	components: {
		courseMobile,
		courseIpad,
  },

  data() {
    return {
		isIpad: false,
  		isMobile: false,
		learningData: {}, // 在学课程列表
		learningcourse: {}
    }
  },

	created() {

		let oHtml = document.documentElement;

		this.isIpad = oHtml.dataset.isipad == 'false' ? true : false ;
		this.isMobile = oHtml.dataset.ismobile == 'false' ? true : false ;


		let oDiv = document.createElement('div');
		
		// let courseParams = {
		// 	pageNo: 1,
		// 	pageSize: 1000,
		// 	token: '185e6644-5465-46ee-8de2-8224e3040cbb'
		// };
		// // 获取活动列表
		// getLearningCourse(courseParams)

		// .then(res =>{

		// 	if(res && res.state == 'success'){
		// 		let learningcourseData = ret;
		// 		let learninglist = res.data.courselist;
	 //    		let courseArr = [];
		// 		for(var i=0;i<learninglist.length;i++){
		// 			courseArr.push(learninglist[i].courseId);
		// 		}
		// 		getCourseProgress({'token':'185e6644-5465-46ee-8de2-8224e3040cbb','memberId':"8a22ecb55474935701547591f52d044e",'courseId':courseArr.toString()})
		// 		.then(ret =>{
		// 			if(ret && ret.state == 'success'){
		// 				for(var i=0;i<learninglist.length;i++){
		// 					for(var j=0;j<ret.data.length;j++){ 
		// 						if(learninglist[i].courseId == ret.data[j].courseId){
		// 							learninglist[i].showProgress = ret.data[j].courseProgress;
		// 				            learninglist[i].createDate = ret.data[j].createDate;

		// 				            learninglist[i].chapterId = ret.data[j].chapterId;
		// 				            learninglist[i].chapterName = ret.data[j].chapterName;
		// 				            learninglist[i].progress = ret.data[j].progress;
		// 				            learninglist[i].taskId = ret.data[j].taskId;
		// 				            learninglist[i].taskName = ret.data[j].taskName;

		// 						}
		// 					}
		// 				}
		// 				let ret={
		// 				  data : {
		// 				    total : learningcourseData.data.total,
		// 				    courselist : learninglist
		// 				  }
		// 				}
		// 			}

		// 			this.learningcourse = ret
		// 		})
				
		// 	}

		// })
		
		 
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

  	}
  },
  mounted () {
    this.getCourseList()
  }
}

</script>

<style lang="scss" scoped>

</style>
