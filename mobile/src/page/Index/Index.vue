<template lang="html">

	<div>
		<Ipad :learning-course-list="learningCourseList" :activity-list='activityList' v-if="isIpad"></Ipad>
		<Mobile :learning-course-list="learningCourseList" :activity-list='activityList' v-if="isMobile"></Mobile>
	</div>

</template>

<script>

import Ipad from './Ipad';
import Mobile from './Mobile';
import { getActivityList, getLearningCourse, getCourseProgres, getExamDate } from '../../api/port';


export default {

	components: {
		Mobile,
		Ipad,
  },

  data() {
    return {
			isIpad: false,
      isMobile: false,
			activityList: [], // 活动列表
			learningCourseList: [], // 最近在学课程
			userInfo: {}, // 用户信息
    }
  },

	created() {
		this.webApi.loadingData();
	},

	mounted() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;
		this.userInfo = JSON.parse(this.webApi.getCookie('userInfo'));

		let oDiv = document.createElement('div');

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

			this.learningCourseList = res.data.courselist.map( item => {

				let expirationDate = new Date(item.expirationTime*1000);

				return {
					courseName: item.courseName,
					courseId: item.courseId,
					categoryId: item.categoryId,
					courseGroupId: item.courseGroupId,
					expirationTime: `${expirationDate.getFullYear()}/${this.webApi.isSmallTen(expirationDate.getMonth())}/${this.webApi.isSmallTen(expirationDate.getDate())}`,
					courseGroupId: item.courseGroupId,
					subjectID: item.subjectID,
					taskTotal: item.taskTotal,
					versionId: item.versionId,
					courseProgress: 0,
					examinationDate: '暂无考试',
					token: this.userInfo.token,
					memberId: this.userInfo.memberId
				}

			});


		})
		.then(() =>{

			let courseIds =  this.learningCourseList.map(item => item.courseId);


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

			res.data.map((item, index) =>{

				let num = parseInt(item.courseProgress/this.learningCourseList[index].taskTotal*100) || 0;

				this.learningCourseList[index].courseProgress = item.courseProgress;
				this.learningCourseList[index].studyProportion = num > 100 ? 100 : num;
			});

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

			// courseId 做比较
			res.data.map(item => this.learningCourseList.map(list => item.categoryId == list.subjectID ? list['examinationDate'] =  `${new Date(item.examinationDate).getFullYear()}/${this.webApi.isSmallTen(new Date(item.examinationDate).getMonth())}/${this.webApi.isSmallTen(new Date(item.examinationDate).getDate())}` : '暂无考试') );

		})


		// 获取活动列表
		getActivityList()

		.then(res => {

			if(!res || res.state != 'success'){
				this.webApi.alert('获取失败，请稍后再试');
				return false;
			}


			this.activityList = res.data.map(item => {

				oDiv.innerHTML = item.content;

				return {
					id: item.id,
					title: item.title,
					src: `${this.webApi.cdnImgUrl}${oDiv.querySelectorAll('img')[0].getAttribute('src')}`,
					href: oDiv.querySelectorAll('a')[0].getAttribute('href')
				};

			});


		})


	},


  methods: {

  }

}

</script>

<style lang="scss" scoped>
</style>
