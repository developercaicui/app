<template lang="html">

	<div>
		<Ipad @fetch-data="fetchData" :learningCourseList="learningCourseList" :activityList='activityList' v-if="isIpad"></Ipad>
		<Mobile :learningCourseList="learningCourseList" :activity-list='activityList' v-if="isMobile"></Mobile>
	</div>

</template>

<script>

import Ipad from './Ipad';
import Mobile from './Mobile';
import {
	getLearningCourse,
	getCourseProgres,
	getExamDate
} from '../../api/port';


export default {

	components: {
		Mobile,
		Ipad,
  },

  data() {
    return {
			learningCourseList: [], // 最近在学课程
			userInfo: {}, // 用户信息
    }
  },

	created() {

		let tmpUserInfo = this.webApi.getCookie('userInfo');

		tmpUserInfo = tmpUserInfo ? JSON.parse(tmpUserInfo) : {};

		this.webApi.delCookie('userInfo');
		this.webApi.delCookie('token');
    this.webApi.delCookie('deviceType');

    this.webApi.setCookie('userInfo', JSON.stringify(Object.assign(this.$route.query, tmpUserInfo)));
    this.webApi.setCookie('token', this.$route.query.token);
    this.webApi.setCookie('deviceType', this.$route.query.deviceType);

		this.webApi.remCount();

		if(!this.webApi.getCookie('userInfo')) {
			this.webApi.alert('用户登录信息失效', 2000);
		}

		this.webApi.loadingData();
		this.webApi.setCookie('isTargetLogin', 'false');

		this.userInfo = JSON.parse(this.webApi.getCookie('userInfo'));

		this.fetchData();

		this.$store.dispatch('fetchActivityList')


	},

	computed: {

		activityList() {
			return  this.$store.getters.getActivityList;
		},

		isIpad() {
			return this.$store.getters.getDeviceInfo.isIpad;
		},

		isMobile() {
			return this.$store.getters.getDeviceInfo.isMobile;
		}

	},

  methods: {

		// 接口请求
		fetchData() {

			let learningCourseList = [];

			// 最近所学课程
			getLearningCourse({
				verTT: new Date().getTime(),
				token: this.userInfo.token,
				pageNo: 1,
				pageSize: 999
			})

			.then(res =>{

				this.webApi.closeLoadingData();

				if(!res || res.state != 'success'){
					this.webApi.alert('网络异常，请稍后再试');
					return false;
				}

				learningCourseList = res.data.courselist.map( item => {

					let expirationDate = new Date(item.expirationTime*1000);

					return {
						courseName: item.courseName,
						courseId: item.courseId,
						categoryId: item.categoryId,
						courseGroupId: item.courseGroupId,
						expirationTime: `${expirationDate.getFullYear()}/${this.webApi.isSmallTen(expirationDate.getMonth() + 1)}/${this.webApi.isSmallTen(expirationDate.getDate())}`,
						courseGroupId: item.courseGroupId,
						subjectID: item.subjectID,
						taskTotal: item.taskTotal,
						versionId: item.versionId,
						lockStatus: item.lock_status,
						courseProgress: 0,
						examinationDate: '暂无考试',
						token: this.userInfo.token,
						memberId: this.userInfo.memberId
					}

				});


			})
			.then(() =>{

				let courseIds =  learningCourseList.map(item => item.courseId);


				// 进度
				return getCourseProgres({
					token: this.userInfo.token,
					memberId: this.userInfo.memberId,
					courseId: courseIds.toString()
				})

			})

			.then(res =>{

				if(!res || res.state != 'success'){
					this.webApi.alert('网络异常，请稍后再试');
					return false;
				}

				try {

						var newLastProgress = {
	             RecentCourse : []
	          };

	    			for(var i=0;i<learningCourseList.length;i++){

	    				for(var j=0;j<res.data.length;j++){

	    					if(learningCourseList[i].courseId == res.data[j].courseId){
	                  learningCourseList[i].createDate = res.data[j].createDate;
	                  learningCourseList[i].courseProgress = res.data[j].courseProgress;
	                  learningCourseList[i].progress = res.data[j].progress;
	                  newLastProgress.RecentCourse.push(learningCourseList[i]);
	    					}

	    				}

	    			}

	          var filterLastProgress = newLastProgress.RecentCourse;
	          var i = 0,
	              len = filterLastProgress.length,
	              j, d;
	          for (; i < len; i++) {
	            for (j = 0; j < len; j++) {

	              if (parseInt(filterLastProgress[i].createDate) > parseInt(filterLastProgress[j].createDate)) {
	                  d = filterLastProgress[j];
	                  filterLastProgress[j] = filterLastProgress[i];
	                  filterLastProgress[i] = d;
	              }

	            }
	          }

			      learningCourseList = filterLastProgress;

						learningCourseList.map((item, index) =>{

							let num = parseInt(item.courseProgress/this.learningCourseList[index].taskTotal*100) || 0;

							if(num === 0) num =  !item.progress ? 0 : 1;

							learningCourseList[index].courseProgress = item.courseProgress;
							learningCourseList[index].studyProportion = num > 100 ? 100 : num;
							// this.learningCourseList[index].createTime = item.createDate;

						});

				} catch (e) {

				} finally {

				}


				return getExamDate({
					verTT: new Date().getTime(),
					memberId: this.userInfo.memberId,
				})

			})
			.then(res =>{

				if(!res || res.state != 'success'){
					this.webApi.alert('网络异常，请稍后再试');
					return false;
				}

				// learningCourseList = learningCourseList.sort((a, b) => a.createTime - b.createTime );

				// courseId 做比较
				res.data.map(item => learningCourseList.map(list => item.categoryId == list.subjectID ? list['examinationDate'] =  `${new Date(item.examinationDate).getFullYear()}/${this.webApi.isSmallTen(new Date(item.examinationDate).getMonth() + 1)}/${this.webApi.isSmallTen(new Date(item.examinationDate).getDate())}` : '暂无考试') );

				this.learningCourseList = learningCourseList;
			})

		},

  }

}

</script>

<style lang="scss" scoped>
</style>
