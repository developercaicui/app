<template>
	<div class="exam">
		<div class="exam-header">
			<a class="exam-return triangle" @click="examBackButton" href="javascript:;"></a>
			<!-- <h3 class="exam-title">试卷标题: {{exam.examTitle}}试卷类型:{{exam.examType}}</h3> -->
			<h3 class="exam-title">{{exam.examTitle}}</h3>
			<!-- <a class="exam-menu" href="javascript:;">菜单</a> -->
		</div>

		<div class="exam-body">
			<template v-if="exam.examBaseInfo.length">
				<!-- <p>传过来的ids</p>
				<ul v-for="(value, key) in examNeedIds">
					<li>{{ key }}: {{ value }}</li>
				</ul> -->
				<!-- <a href="javascript:;" class="triangle exercises-prev" @click="exercisePrev" v-if="exam.exerciseActiveIndex != 0"></a>
				<a href="javascript:;" class="triangle exercises-next" @click="exerciseNext" v-if="exam.exerciseActiveIndex != (exam.examBaseInfo.length-1)"></a> -->
				<a href="javascript:;" class="triangle exercises-prev" @click="exercisePrev"></a>
				<a href="javascript:;" class="triangle exercises-next" @click="exerciseNext"></a>
			</template>
			<questions @analysisstatus="analysisEvent"></questions>
		</div>
		<div class="exam-footer" v-if="exam.examBaseInfo.length">
			<exam-cards @cardsPrev="exercisePrev" @cardsNext="exerciseNext" @clickExamCards="exerciseChange" @cardsPosLeft="cardsPosition" :key="exam.examBaseInfo.length"></exam-cards>
			<ul class="exam-button-ul">
				<li class="exam-button-li" v-if="isSaveBtn"><a @click="exerciseAssignment" href="javascript:;" class="exam-button-a">交卷</a></li>
				<li class="exam-button-li">
					<a @click="exerciseCorrection" href="javascript:;" class="exam-button-a">纠错</a>
				</li>
				<li class="exam-button-li" v-if="isNoteAcBtn">
					<a @click="exerciseNoteEdit" href="javascript:;" class="exam-button-a">笔记</a>
				</li>
				<li class="exam-button-li" v-if="isNoteAcBtn">
					<a @click="exerciseExchangeEdit" href="javascript:;" class="exam-button-a">提问</a>
				</li>
			</ul>
		</div>
		<examCorrection v-if="correctionShow" :correction-data="correctionData" @isShow="isCorrectionShow"></examCorrection>
		<examExchangeEdit v-if="exchangeEditShow" :exchange-edit-data="exchangeEditData" @isShow="isExchangeEditShow"></examExchangeEdit>
		<examNoteEdit v-if="noteEditShow" :note-edit-data="noteEditData" @isShow="isNoteEditShow"></examNoteEdit>
	</div>
</template>
<script>
	import axios from 'axios';
	import Request from '../../api/request';
	import { mapState,mapMutations,mapActions } from 'vuex';

	import examCards from '../../components/Exam/v-exam-cards';
	import questions from '../../components/Exam/v-exam-questions';

	import examCorrection from '../../components/CorrectionExam';
	import examExchangeEdit from '../../components/ExchangeEdit';
	import examNoteEdit from '../../components/NoteEdit';
	
	export default {
		components : {
			examCards,
			questions,
			examCorrection,
			examExchangeEdit,
			examNoteEdit
		},
		data () {
			return {
				memberId : '',
				examType : this.$route.params.type,
				examId : this.$route.params.id,
				examNum : this.$route.params.examNum,
				exerciseContextSave : [],
				exerciseLastNid : 0,
				exerciseDoneCount : 0,
				exerciseErrorNum : 0,
				exerciseRightCount : 0,
				exerciseTotalTime : 0,
				examIsFinish : 0,
				cacheKnowledgeLevel1Id : '', // knowledge_path_level_one_id/courseId
				cacheKnowledgeLevel2Id : '', // knowledge_path_level_two_id/taskId

				categoryId : '',
				categoryName : '',
				subjectId : '',
				subjectName : '',
				courseId : '',
				courseName : '',
				chapterId : '',
				chapterName : '',
				taskId : '',
				taskName : '',
				userInfo : '',
				examNeedIds : '',
				correctionShow : false,
				correctionData : {},
				exchangeEditShow : false,
				exchangeEditData : {},
				noteEditShow : false,
				noteEditData : {},
			}
		},
		computed : {
			...mapState(['exam']),
			isSaveBtn (){
				if(this.exam.examType){
					if(this.exam.examType == 'chapter' || this.exam.examType == 'realImitate'){
						return true;
					}else{
						// if(this.exam.exerciseActiveIndex == (this.exam.examNumTotal-1)){
						// 	return true;
						// }
					}
				}
			},
			isNoteAcBtn () {
				if(this.exam.examType){
					if(this.exam.examType == 'chapter' || this.exam.examType == 'knowledge'){
						return true;
					}
				}
			}
		},

		created() {
			// 删除做题记录
			// Request.delMemberExercise({
			// 	"memberId" : 'ff8080815133db0d0151375bfdf30c0d',
			// 	"knowledgePointId" : 'ff8080814d4b3152014d551d7a240572',
			// 	"examenNum" : 1
			// }).then((res)=>{
			// })
			// return false;
			let userInfo = JSON.parse(this.webApi.getCookie('userInfo'));
			if(!userInfo){
				this.$router.push('/login');
				return false;
			}
			this.memberId = userInfo.memberId;
			this.userInfo = userInfo;
			
			this.update({
				"examType" : this.examType,
				"examId" : this.examId,
				"examNum" : this.examNum >= 0 ? this.examNum : ''
			})
			if(this.examType == "chapter"){
				this.exerciseExam((examenInfo, status, baseInfo) => {
					this.examRequestCallback(examenInfo, status, baseInfo);
				});
			}else if(this.examType == "knowledge"){
				this.exerciseKnowledge((examenInfo, status, baseInfo) => {
					this.examRequestCallback(examenInfo, status, baseInfo);
				});
			}else if(this.examType == "realImitate"){
				this.exerciseRealImitate((examenInfo, status, baseInfo) => {
					this.examRequestCallback(examenInfo, status, baseInfo);
				});
			}else if(this.examType == "testSite"){
				this.exerciseTestSite((examenInfo, status, baseInfo) => {
					this.examRequestCallback(examenInfo, status, baseInfo);
				});
			}
		},
		methods : {
			...mapMutations([
				'update',
				'getExerciseTitle',
				'setExamId',
				'arrEntities'
			]),
			...mapActions([
				'requestListDetail',
				'requestExerciseDetail'
			]),
			examBackButton (){
				if(window.navigator.userAgent.toLocaleLowerCase().indexOf('android') != -1){
					window.course.back();
				}else{
					examBackButton.clickExamBackButton();
				}
				
			},
			examRequestCallback (examenInfo, status, baseInfo) {
				let examNeedIds = JSON.parse(this.webApi.getCookie('examNeedIds'));
				this.examNeedIds = examNeedIds;
				let express = true;
				if(examNeedIds){
					if(examNeedIds.express == '0'){
						express = false;
					}else if(examNeedIds.express == '1'){
						express = true;
					}else{
						express = JSON.parse(decodeURI(examNeedIds.express)).analysis
					}
				}else{

				}
				this.update({
					'isAnalysis' : express
				})
				let examNum = this.examNum;
				let statusData = '';
				if(examNum){
					if(status.data && status.data.length){
						statusData = status.data[0];
						this.exerciseLastNid = +statusData.last_exercise_nid;
						this.exerciseDoneCount = +statusData.progress;
						this.exerciseErrorNum = +statusData.error_num;
						this.exerciseRightCount = this.exerciseDoneCount-this.exerciseErrorNum;
						this.exerciseTotalTime = +statusData.total_time;
						this.examIsFinish = +statusData.is_finish;
					}
				}else{
					examNum = status.data ? status.data.length : 0;
				}

				let exerciseInfo = baseInfo.data;
				let exemTitle = '';
				if(examenInfo.data[0] && examenInfo.data[0].title){
					exemTitle = examenInfo.data[0].title
				}
				if(this.examType == "knowledge" || this.examType == "testSite"){
					examNum = 0;
					if(examenInfo.data[0] && examenInfo.data[0].enTitle){
						exemTitle = examenInfo.data[0].enTitle
					}
					if(exerciseInfo && exerciseInfo.length){
						this.cacheKnowledgeLevel1Id = exerciseInfo[0].knowledge_path_level_one_id;
						this.cacheKnowledgeLevel2Id = exerciseInfo[0].knowledge_path_level_two_id;
						this.exerciseKnowledgeIds(exerciseInfo[0].exercise_filename,exerciseKnowledgeIds => {
							let baseInfoData = [];
							if(exerciseKnowledgeIds){
								exerciseKnowledgeIds.forEach((item)=>{
									baseInfoData.push({
										"id" : item
									})
								})
							}
							let exerciseInfo = baseInfoData;

							if(this.examType == "chapter" || this.examType == "knowledge"){
								if(examNeedIds){
									this.categoryId = examNeedIds.categoryId;
									this.categoryName = examNeedIds.categoryName;
									this.subjectId = examNeedIds.subjectId;
									this.subjectName = examNeedIds.subjectName;
									this.courseId = examNeedIds.courseId;
									this.courseName = examNeedIds.courseName;
									this.chapterId = examNeedIds.chapterId;
									this.chapterName = examNeedIds.chapterName;
									this.taskId = examNeedIds.taskId;
									this.taskName = examNeedIds.taskName;
									this.update({
										categoryId : examNeedIds.categoryId,
										categoryName : examNeedIds.categoryName,

										subjectId : examNeedIds.subjectId,
										subjectName : examNeedIds.subjectName,

										courseId : examNeedIds.courseId,
										courseName : examNeedIds.courseName,

										chapterId : examNeedIds.chapterId,
										chapterName : examNeedIds.chapterName,

										taskId : examNeedIds.taskId,
										taskName : examNeedIds.taskName,
									});
								}
							}
							this.update({
								"examTitle" : exemTitle,
								"examNum" : examNum,
								"examState" : statusData,
								"examBaseInfo" : exerciseInfo,
								"examNumTotal" : exerciseInfo.length,
								"exerciseLastNid" : this.exerciseLastNid,
								"exerciseActiveIndex" : this.exerciseLastNid,
								"exerciseId" : exerciseInfo[this.exerciseLastNid].id,
								"exerciseDoneCount" : this.exerciseDoneCount,
								"exerciseErrorNum" : this.exerciseErrorNum,
								"exerciseRightCount" : this.exerciseRightCount,
								"exerciseTotalTime" : this.exerciseTotalTime,
								"examIsFinish" : this.examIsFinish,
								"categoryId" : this.categoryId,
								"courseId" : this.courseId,
								"chapterId" : this.chapterId,
								"taskId" : this.taskId,
							});
							this.requestListDetail({
								memberId : this.userInfo.memberId
							});
							this.actionTaskProgress('begintest');

						});
						return false;
					}
				}else{
					if(examNeedIds){
						this.cacheKnowledgeLevel1Id = examNeedIds.courseId;
						this.cacheKnowledgeLevel2Id = examNeedIds.taskId;
					}
				}
				if(this.examType == "chapter" || this.examType == "knowledge"){
					if(examNeedIds){
						this.categoryId = examNeedIds.categoryId;
						this.categoryName = examNeedIds.categoryName;
						this.subjectId = examNeedIds.subjectId;
						this.subjectName = examNeedIds.subjectName;
						this.courseId = examNeedIds.courseId;
						this.courseName = examNeedIds.courseName;
						this.chapterId = examNeedIds.chapterId;
						this.chapterName = examNeedIds.chapterName;
						this.taskId = examNeedIds.taskId;
						this.taskName = examNeedIds.taskName;
						this.update({
							categoryId : examNeedIds.categoryId,
							categoryName : examNeedIds.categoryName,

							subjectId : examNeedIds.subjectId,
							subjectName : examNeedIds.subjectName,

							courseId : examNeedIds.courseId,
							courseName : examNeedIds.courseName,

							chapterId : examNeedIds.chapterId,
							chapterName : examNeedIds.chapterName,

							taskId : examNeedIds.taskId,
							taskName : examNeedIds.taskName,
						});
					}
				}
				this.update({
					"examTitle" : exemTitle,
					"examNum" : examNum,
					"examState" : statusData,
					"examBaseInfo" : exerciseInfo,
					"examNumTotal" : exerciseInfo.length,
					"exerciseLastNid" : this.exerciseLastNid,
					"exerciseActiveIndex" : this.exerciseLastNid,
					"exerciseId" : exerciseInfo[this.exerciseLastNid].id,
					"exerciseDoneCount" : this.exerciseDoneCount,
					"exerciseErrorNum" : this.exerciseErrorNum,
					"exerciseRightCount" : this.exerciseRightCount,
					"exerciseTotalTime" : this.exerciseTotalTime,
					"examIsFinish" : this.examIsFinish,

					"categoryId" : this.categoryId,
					"courseId" : this.courseId,
					"chapterId" : this.chapterId,
					"taskId" : this.taskId,
				});
				this.requestListDetail({
					memberId : this.userInfo.memberId
				});
				this.actionTaskProgress('begintest');
			},
			examRequestCallbackUpdata (){

			},
			exerciseExam (callback){
				axios.all([Request.getExamenInfo({
					'examenId' : this.examId
				}),Request.examStatus({
					'knowledge_points' : this.examId,
					'type' : this.exam.examFindType,
					'member_id' : this.memberId,
					'examenNum' : this.exam.examNum
				}),Request.getExerciseBaseInfo({
					'examenId' : this.examId
				})]).then(axios.spread((examenInfo, status, baseInfo) => {
					if(callback){callback(examenInfo, status, baseInfo)};
				}))
			},
			exerciseRealImitate (callback) {
				axios.all([Request.getExamenInfo({
					'examenId' : this.examId
				}),Request.examStatus({
					'knowledge_points' : this.examId,
					'type' : this.exam.examFindType,
					'member_id' : this.memberId,
					'examenNum' : this.exam.examNum
				}),Request.getExerciseBaseInfo({
					'examenId' : this.examId
				})]).then(axios.spread((examenInfo, status, baseInfo) => {
					if(callback){callback(examenInfo, status, baseInfo)};
				}))
			},
			exerciseKnowledge (callback){
				axios.all([Request.getKnowledgePointInfo({
					'knowledgePointId' : this.examId
				}),Request.examStatus({
					'knowledge_points' : this.examId,
					'type' : this.exam.examFindType,
					'member_id' : this.memberId,
					'examenNum' : 0
				}),Request.examCache({
					'knowledge_points' : this.examId,
					'type' : this.exam.examFindType
				})]).then(axios.spread((examenInfo, status, baseInfo) => {
					if(callback){callback(examenInfo, status, baseInfo)};
				}))
			},
			exerciseTestSite (callback) {
				axios.all([Request.getKnowledgePointInfo({
					'knowledgePointId' : this.examId
				}),Request.examStatus({
					'knowledge_points' : this.examId,
					'type' : this.exam.examFindType,
					'member_id' : this.memberId,
					'examenNum' : 0
				}),Request.examCache({
					'knowledge_points' : this.examId,
					'type' : this.exam.examFindType
				})]).then(axios.spread((examenInfo, status, baseInfo) => {
					if(callback){callback(examenInfo, status, baseInfo)};
				}))
			},
			exerciseKnowledgeIds (src,callback){
				if(callback){callback("ff8080814d75e63a014d7a5aad930480,ff8080814d75e63a014d7b1368b0059b,ff8080814d75e63a014d7b1854ec059f,ff8080814d75e63a014d7c16c08e06a0,a95201f807e68787f0b42b4f437a73aa,ff8080814d75e63a014d7ab126e704fd,ff8080814d75e63a014d7c11748b0699,ff8080814d75e63a014d7e7e6c6a0886,ff8080814d75e63a014d7e8160d4088a,ff8080814d75e63a014d8adc9cdc1935".split(","))};
				return;
				// if(callback){callback("8a22ecb553c543220153cb6fbba100ac,8a22ecb55175206901517789c54c08d9,8a22ecb551752069015177790493088b,8a22ecb55678b61b015697341cc8016b,ff8080814f3eb9ed014f4f74cd04222c,ff8080814f3eb9ed014f4e90d4d11dfa,8a22ecb5517520690151773fb5f907af,8a22ecb55162140001516676e4a80b77".split(","))};
				// return;
				// return "ff8080814bee5fde014bfa12b1230114".split(',');
				// return "ff8080814bee5fde014bfa12b1230114,ff8080814b7c866a014b7cfbfcec0329,ff8080814bee5fde014bf772fa340062,ff8080814a7f5035014a951f4a632d5b,ff8080814a7f5035014a963deab62ffb".split(',');
				// return "8a22ecb553c543220153cb6fbba100ac,8a22ecb55175206901517789c54c08d9,8a22ecb551752069015177790493088b,8a22ecb55678b61b015697341cc8016b,ff8080814f3eb9ed014f4f74cd04222c,ff8080814f3eb9ed014f4e90d4d11dfa,8a22ecb5517520690151773fb5f907af,8a22ecb55162140001516676e4a80b77".split(",");

				var iframe=document.createElement("iframe");
				iframe.setAttribute("id", "knowledgeIds");
				if(process.env.NODE_ENV.includes('developZbgedu')){
					iframe.setAttribute("src", "http://static.zbgedu.com/exercisecache/"+src);
				}else{
					iframe.setAttribute("src", "http://static.caicui.com/upload/caicui_cache/exercise/"+src);
				}
				iframe.setAttribute("style", "display:none;");
				var body = document.getElementsByTagName("body");
				if(body.length){
				  body[0].appendChild(iframe);
				}else{
				  document.documentElement.appendChild(iframe);
				}
				let iframeData =[];
				document.getElementById('knowledgeIds').onload=function(){

					if(document.getElementById('knowledgeIds').contentWindow.document.body.innerHTML){
						let iframeObj = document.getElementById('knowledgeIds').contentWindow.document.body.innerHTML;
							iframeData = iframeObj.trim().split(",");
							// iframeData = "ff8080814bee5fde014bfa12b1230114,ff8080814b7c866a014b7cfbfcec0329,ff8080814bee5fde014bf772fa340062,ff8080814a7f5035014a951f4a632d5b,ff8080814a7f5035014a963deab62ffb".split(',')
							if(callback){callback(iframeData)};
							
					}
					

				};
				
			},

			exerciseChange (index){
				this.cardsPosition(index);
				let activeIndex = -1;
				let exerciseId = this.exam.examBaseInfo[index].id;
				let exerciseOptionIndex = this.exam.exerciseOptionsActiveIndex;
				if(exerciseOptionIndex !== -1){
					let num = Math.abs(this.exam.exerciseActiveIndex - index);
					let action = '';
					if(num != 1){
						action = 'seektest';
					}else{
						action = 'test';
					}
					

					this.getExerciseStatus();
					this.exerciseSaveCache(exerciseId);
					this.exerciseSave((action) => {
						this.actionTaskProgress(action);
					});

				}
				this.update({
					exerciseId : exerciseId,
					exerciseActiveIndex : index,
					exerciseShowAnalysis : false,
					exerciseAnalysisText : '展开解析',
					exerciseOptionsActiveIndex : activeIndex,
					exerciseStatus : '-1',
					exerciseContext : []
				})
				this.exerciseGetDetail(exerciseId, index);
			},
			exerciseGetDetail (exerciseId, exerciseIndex){
				let context = '';
				let exerciseIsCache = this.exerciseIsCache();
				if(exerciseIsCache.isCacheContext){
					context = this.exam.exerciseListCache[exerciseIsCache.indexCacheContext].context;
				}
				let exerciseListRequest = '';
				this.exam.exerciseListRequest.forEach((item, index)=>{
					if(item.count == exerciseIndex){
						exerciseListRequest = item;
					}
				})
				if(exerciseListRequest){
					this.update({
						"exerciseDetail" : exerciseListRequest.detail,
						"exerciseType" : exerciseListRequest.detail.questionTypes,
						"exerciseContext" : context ? context : exerciseListRequest.detail.context,
						// "exerciseTitle" : exerciseListRequest.detail.title,
					})
					this.getExerciseTitle({
						"exerciseTitle" : exerciseListRequest.detail.title,
						"exerciseType" : exerciseListRequest.detail.questionTypes
					})
				}else{
					Request.exerciseDetail({
						'exerciseId' : this.exam.exerciseId
					}).then((res) =>{
						this.exam.exerciseListRequest.push({
							"count" : exerciseIndex,
							"detail" : res.data[0]
						})
						this.update({
							"exerciseDetail" : res.data[0],
							"exerciseType" : res.data[0].questionTypes,
							"exerciseContext" : context ? context : res.data[0].context,
							"exerciseTitle" : res.data[0].title
						})
						this.getExerciseTitle({
							"exerciseTitle" : res.data[0].title,
							"exerciseType" : res.data[0].questionTypes
						})
					})
				}
			},
			exercisePrev () {
				var index = this.exam.exerciseActiveIndex;
				index--;
				if(index>=0){
					this.exerciseChange(index);
				}else{
					if(this.exam.exerciseOptionsActiveIndex !== -1){
						this.update({
							exerciseOptionsActiveIndex : -1
						})
						this.getExerciseStatus();
						this.exerciseSaveCache();
						this.exerciseSave(() => {
							this.actionTaskProgress('test');
						});
					}
				}
			},
			exerciseNext () {
				var index = this.exam.exerciseActiveIndex;
				index++;
				if(index < this.exam.examNumTotal){
					this.exerciseChange(index);
				}else{
					if(this.exam.exerciseOptionsActiveIndex !== -1){
						this.update({
							exerciseOptionsActiveIndex : -1
						})
						this.getExerciseStatus();
						this.exerciseSaveCache();
						this.exerciseSave(() => {
							this.actionTaskProgress('test');
						});
					}
				}
			},
			actionTaskProgress(action) {
				let taskProgressData = {
			    action: action,
			    token: this.userInfo.token,
			    memberId: this.userInfo.memberId,
			    memberName: this.userInfo.nickName,
			    progress: this.exam.exerciseActiveIndex,
			    total: this.exam.examNumTotal,
			    state: this.exam.examIsFinish,

			    taskId: this.exam.taskId,
			    chapterId: this.exam.chapterId,
			    courseId: this.exam.courseId,
			    subjectId: this.exam.subjectId,
			    categoryId: this.exam.categoryId,

			    taskName: this.exam.examTitle,
			    chapterName: this.exam.chapterName,
			    courseName: this.exam.courseName,
			    subjectName: this.exam.subjectName,
			    categoryName: this.exam.categoryName,

			    isSupply: 0,
			    createDate: new Date().getTime()
				}

				Request.actionTaskProgress({
					'token': this.userInfo.token,
					'message': JSON.stringify(taskProgressData)
					// 'message' : '{"token":"'+this.userInfo.token+'","memberId":"'+this.userInfo.memberId+'","progress":77,"total":75,"taskId":"ff8080814dc1dc4e014dfb46c8e92129","chapterId":"ff8080814dc1dc4e014dfb46c8e32128","courseId":"ff8080814dc1dc4e014dfb46c66d209c","subjectId":"ff8080814d1db79b014d2d99d2c8029a","categoryId":"ff8080814c7e36d9014c9c3219fa01a8","taskName":"Introduction-1","chapterName":"Introduction","courseName":"CIMA Advanced Financial Reporting (F2)","subjectName":"F2","categoryName":"CIMA","state":0,"action":"stop","memberName":"Rainy","isSupply":0,"createDate":1509073356495}'
					// token:'6a8d85ae-8847-4442-b89d-b71e05578363',
					// message:'{"action":"test","token":"6a8d85ae-8847-4442-b89d-b71e05578363","memberId":"ac622d298d9311e7a63100163e022e38","progress":66,"total":2,"taskId":"ff8080814f607c24014f68a1246f1775","chapterId":"ff8080814f607c24014f6873934c1706","courseId":"ff8080814f607c24014f6866fdb716fd","subjectId":"ff808081473905e701476204cb6c006f","categoryId":"ff808081473905e701475cd3c2080001","taskName":"ACCA F1 Accountant in Business-CH2章节测评","chapterName":"Chapter 2 Types of Business Organisation [0] ","courseName":"ACCA F1 Accountant in Business(体验课)","subjectName":"F1","categoryName":"ACCA","state":0,"memberName":"candy","isSupply":0,"createDate":1509094504936}'
				}).then((res) =>{
					// Request.actionGetTasksProgress({
					// 	'token': this.userInfo.token,
					// 	'memberId' : this.userInfo.memberId,
					// 	'courseId' : 'ff8080814dc1dc4e014dfb46c66d209c'
					// })
				})
			},
			cardsPosition (index) {
				if(this.exam.examNumTotal >=9){

				
					let newWidth = (index-4)*this.exam.cardsItemWidth;
					if(index<4){
						newWidth = 0;
					}else if(index>(this.exam.examNumTotal-9)){
						newWidth = (this.exam.examNumTotal-9)*this.exam.cardsItemWidth;
					}
					this.update({
						"cardsPosLeft" : newWidth
					})
				}
			},
			exerciseSaveCache () {
				let exerciseIsCache = this.exerciseIsCache();
				if(exerciseIsCache.isCacheContext){
					this.exam.exerciseListCache[exerciseIsCache.indexCacheContext].context = "'" + JSON.stringify(this.exam.exerciseContext) + "'";
				}else{
					this.exam.exerciseListCache.push({
						"exercise_id" : this.exam.exerciseId,
						"context" : "'" + JSON.stringify(this.exam.exerciseContext) + "'"
					});
				}
			},
			exerciseSave (callback){
				let exerciseActiveIndex = this.exam.exerciseActiveIndex;
				let exerciseDoneCount = +this.exam.exerciseDoneCount+1;
				let exerciseErrorNum = 0;
				let exerciseRightCount = 0;
				let examIsFinish = 0;
				if(+this.exam.exerciseStatus){
					exerciseRightCount = this.exam.exerciseRightCount + 1;
				}else{
					exerciseErrorNum = this.exam.exerciseErrorNum + 1;
				}
				if(exerciseDoneCount >= this.exam.examNumTotal){
					examIsFinish = 1;
					exerciseDoneCount = this.exam.examNumTotal;
				}
				Request.setMemberExerciseLog({
					
					'memberId': this.memberId,
					
					'knowledgePointId': this.exam.examId,
					'examenNum': this.exam.examNum,
					'examenName': this.exam.examTitle,
					'examenTotalNum': this.exam.examNumTotal,
					'examenType': this.exam.examType,
					
					'exerciseId': this.exam.exerciseId,
					'exerciseTitle': this.exam.exerciseTitle,
					'context': "'" + JSON.stringify(this.exam.exerciseContext) + "'",
					'status': this.exam.exerciseStatus,
					'currentProgress': exerciseActiveIndex,

					'progress': exerciseDoneCount,
					'lastExerciseNid': exerciseActiveIndex,
					'errorNum': exerciseErrorNum,
					'correctNum': exerciseRightCount,
					'totalTime': this.exam.exerciseTotalTime,
					'isFinish': examIsFinish,
					'cacheKnowledgeLevel1Id': this.exam.cacheKnowledgeLevel1Id,
					'cacheKnowledgeLevel2Id': this.exam.cacheKnowledgeLevel2Id,
					'cacheKnowledgePath': this.exam.cacheKnowledgeLevel1Id+','+this.exam.cacheKnowledgeLevel2Id,

					'subjectId': this.exam.subjectId,
					'categoryId': this.exam.categoryId,
					'courseId': this.exam.courseId,
					'chapterId': this.exam.chapterId,
					'taskId': this.exam.taskId,
					
				}).then( (res) => {
					this.update({
						exerciseLastNid : exerciseActiveIndex,
						exerciseDoneCount : exerciseDoneCount,
						exerciseErrorNum : exerciseErrorNum,
						exerciseRightCount : exerciseRightCount,
						examIsFinish : examIsFinish
					})
					if(callback){callback()};
				})
			},
			exerciseAssignment (){
				// setMemberExamenFinish
				// setMemberErrorExercise
				
				Request.setMemberExamenFinish({
					"memberId":this.memberId,
					"examenid":this.exam.examId,
					"examenNum":this.exam.examNum
				}).then(res => {
					this.update({
						'examIsFinish' : 1
					})
					this.actionTaskProgress('submittest');
				});
				let memberErrorExerciseData = this.getMemberErrorExerciseData();
				Request.setMemberErrorExercise({
					'memberId' : this.memberId,
					'examenId': this.exam.examId,
					'examenName' : this.exam.examName,
					'errorexerciseids' : memberErrorExerciseData.errorexerciseids,
					'correctexerciseids' : memberErrorExerciseData.correctexerciseids,
					'errorexerciseRecords' : JSON.stringify(memberErrorExerciseData.errorexerciseRecords)
				}).then(res => {
					this.webApi.alert('试卷已提交，进入我的试卷查看试卷解析');
					// layer.msg('试卷已提交，进入我的试卷查看试卷解析', {time:2000}, function() {
					// });
				});

			},
			exerciseCorrection () {
				this.correctionShow = true;
				this.correctionData = {
					courseId : this.exam.courseId,
					courseName : this.exam.courseName,
					chapterId : this.exam.chapterId,
					chapterName : this.exam.chapterName,
					taskName : this.exam.taskName,
					taskId : this.exam.taskId,
					examName : this.exam.examTitle,
					examType : this.exam.examType,
					progress : this.exam.exerciseActiveIndex+1,
					exerciseId : this.exam.exerciseId,
					exerciseName : this.exam.exerciseTitle,
				}
			},
			isCorrectionShow (bool) {
				this.correctionShow = bool;
			},
			exerciseExchangeEdit () {
				this.exchangeEditShow = true;
				this.exchangeEditData = {
					subjectId : this.exam.subjectId,
					courseId : this.exam.courseId,
					chapterId : this.exam.chapterId,
					chapterName : this.exam.chapterName,
					taskId : this.exam.taskId,
					progress : this.exam.exerciseActiveIndex+1,
				 taskType : this.exam.examType
				}
				// this.exchangeEditData = {
				// 	subjectId : 'ff8080814d1db79b014d2d99d2c8029a',
				// 	courseId : 'ff8080814dc1dc4e014dfb46c66d209c',
				// 	chapterId : 'ff8080814dc1dc4e014dfb46c8e32128',
				// 	chapterName : 'Introduction',
				// 	taskId : 'ff8080814dc1dc4e014dfb46c8e92129',
				// 	progress : this.exam.exerciseActiveIndex+1,
				// 	taskType : this.exam.examType
				// }
			},
			isExchangeEditShow (bool) {
				this.exchangeEditShow = bool;
			},
			exerciseNoteEdit () {
				this.noteEditShow = true;
				this.noteEditData = {
					categoryId : this.exam.categoryId,
					categoryName : this.exam.categoryName,
					subjectId : this.exam.subjectId,
					subjectName : this.exam.subjectName,
					courseId : this.exam.courseId,
					chapterId : this.exam.chapterId,
					chapterName : this.exam.chapterName,
					courseName : this.exam.courseName,
					taskType : this.exam.examType,
					taskName : this.exam.taskName,
					taskId : this.exam.taskId,
					taskProgress : this.exam.exerciseActiveIndex+1,
					type : 'new'
				}
				// this.noteEditData = {
				// 	categoryId : 'ff8080814c7e36d9014c9c3219fa01a8',
				// 	categoryName : 'CIMA',
				// 	subjectId : 'ff8080814d1db79b014d2d99d2c8029a',
				// 	subjectName : 'F2',
				// 	courseId : 'ff8080814dc1dc4e014dfb46c66d209c',
				// 	courseName : 'CIMA Advanced Financial Reporting (F2)',
				// 	chapterId : 'ff8080814dc1dc4e014dfb46c8e32128',
				// 	chapterName : 'Introduction',
				// 	taskType : 'video',
				// 	taskName : 'Introduction-1',
				// 	taskId : 'ff8080814dc1dc4e014dfb46c8e92129',
				// 	taskProgress : this.exam.exerciseActiveIndex+1,
				// 	type : 'new'
				// }
			},
			isNoteEditShow (bool) {
				this.noteEditShow = bool;
			},
			getMemberErrorExerciseData (){
				let errorexerciseids = '';
				let correctexerciseids = '';
				let errorexerciseRecords = [];
				this.exam.examBaseInfo.forEach((item, index) =>{
					if(item.status == "1"){
						correctexerciseids += item.id + ','
					}else{
						let title = this.getExerciseTitleStr(item.title,item.questionTypes);
						errorexerciseids += item.id + ','
						errorexerciseRecords.push({
							"sort" : index.toString(),
							"exerciseid" : item.id,
							"exerciseTitle" : title
						})
					}
				})
				return {
					"errorexerciseids" : errorexerciseids,
					"correctexerciseids" : correctexerciseids,
					"errorexerciseRecords" : errorexerciseRecords
				}
			},
			getExerciseTitleStr (titles,types) {
				let title = '';
				if(titles){
					title = titles.replace(/<[^>]+>/g,"").replace(/(^\s+)|(\s+$)/g,"").replace(/(\r)|(\n)|(\t)/g,'')
				}else{
					switch(types){
						case 'radio' :
							title = '单选题';
							break;
						case 'checkbox' :
							title = '复选题';
							break;
						case 'blank' :
							title = '填空题';
							break;
						case 'question' :
							title = '简答题';
							break;
						case 'matrixRadio' :
							title = '矩阵单选题';
							break;
						case 'matrixCheckbox' :
							title = '矩阵复选题';
							break;
						case 'matrixBlank' :
							title = '矩阵填空题';
							break;
						case 'multiTask' :
							title = '多任务题';
							break;
					}
				}
				return title;
			},

			// exerciseSaveContext (){
			// 	this.exerciseContextSave = [];
			// 	this.exam.exerciseContext.forEach((item, index) => {
			// 		let checked = false;
			// 		this.exerciseContextSave.push({
			// 			"title" : item.title,
			// 			"isChecked" : item.isChecked,
			// 			"myChecked" : checked
			// 		})
			// 	});
			// },
			exerciseIsCache(){
				let context = '';
				let isCacheContext = false;
				let indexCacheContext = '';
				this.exam.exerciseListCache.forEach( (item, index) => {
					if(item.exercise_id == this.exam.exerciseId || item.exerciseId == this.exam.exerciseId){
						isCacheContext = true;
						indexCacheContext = index;
						context = item.context;
					}
				})
				return {
					"cacheContext" : context,
					"isCacheContext" : isCacheContext,
					"indexCacheContext" : indexCacheContext
				}
			},
			
			analysisEvent () {
				let exerciseOptionIndex = this.exam.exerciseOptionsActiveIndex;
				this.getExerciseStatus();
				if(exerciseOptionIndex !== -1){

					this.exerciseSaveCache();
					this.exerciseSave( () => {
						this.actionTaskProgress('analysis');
					});

				}
			},
			getExerciseStatus () {
				let question = '';
				let statusNum = 0;
				let type = this.exam.exerciseDetail.questionTypes;
				this.arrEntities();
				let context = this.exam.exerciseContext;
				switch (type){
					case "radio":
						question = this.exerciseStatusRadio(context);
						break;
					case "checkbox":
						question = this.exerciseStatusCheckbox(context);
						break;
					case "blank":
						question = this.exerciseStatusBlank(context);
						break;
					case "question":
						question = this.exerciseStatusQuestions(context);
						break;
					case "matrixRadio":
						question = this.exerciseStatusMatrixRadio(context);
						break;
					case "matrixCheckbox":
						question = this.exerciseStatusMatrixCheckbox(context);
						break;
					case "matrixBlank":
						question = this.exerciseStatusMatrixBlank(context);
						break;
					case "multiTask":
						question = this.exerciseStatusMatrixTask(context);
						break;
				}
				statusNum = question.status ? '1' : '2';
				this.$set(this.exam.examBaseInfo[this.exam.exerciseActiveIndex],'status',statusNum);
				this.update({
					"exerciseStatus" : statusNum,
					"exerciseStatusText": question.text
				})

			},
			exerciseStatusRadio (data) {
				let status = true;
				let text = '';
				data.forEach((element, index) => {
					if(element.isChecked){
						if(element.myChecked){
							status = true;
							text = "正确答案是"+this.exam.exerciseOptionsArray[index]+"，回答正确";
						}else{
							status = false;
							text = "正确答案是"+this.exam.exerciseOptionsArray[index]+"，回答错误";
						}
					}
				})
				return {
					"status" : status,
					"text" : text
				};
			},
			exerciseStatusMatrixRadio (data) {
				let status = true;
				let text = '';
				let isCheckedNum = 0;
				let myCheckedNum = 0;
				let isCheckedTotal = 0;
				let myCheckedTotal = 0;
				let rights = '';
				let context = data[0];
				context.items.forEach((element, index) => {
					if(element.isChecked && element.myChecked){
						myCheckedNum++;
					}
					if(element.isChecked){
						isCheckedTotal++;
						rights+= context.items[parseInt(index/context.cols)*context.cols].title + ':' + context.items[index%context.cols].title + ';';
					}
					if(element.myChecked){
						myCheckedTotal++;
					}
				})
				if(myCheckedTotal == isCheckedTotal){
					if(isCheckedTotal && myCheckedNum && isCheckedTotal == myCheckedNum){
						status = true;
						text = "正确答案是"+rights+"，回答正确";
					}else{
						status = false;
						text = "正确答案是"+rights+"，回答错误";
					}
				}else{
					status = false;
					text = "正确答案是"+rights+"，回答错误";
				}
				return {
					"status" : status,
					"text" : text
				};
			},
			exerciseStatusCheckbox (data) {
				let status = true;
				let text = '';
				let isCheckedNum = 0;
				let myCheckedNum = 0;
				let isCheckedTotal = 0;
				let myCheckedTotal = 0;
				let rights = '';
				data.forEach((element, index) => {
					if(element.isChecked && element.myChecked){
						myCheckedNum++;
					}
					if(element.isChecked){
						isCheckedTotal++;
						rights+= this.exam.exerciseOptionsArray[index]
					}
					if(element.myChecked){
						myCheckedTotal++;
					}
				})
				if(myCheckedTotal == isCheckedTotal){
					if(isCheckedTotal && myCheckedNum && isCheckedTotal == myCheckedNum){
						status = true;
						text = "正确答案是"+rights+"，回答正确";
					}else{
						status = false;
						text = "正确答案是"+rights+"，回答错误";
					}
				}else{
					status = false;
					text = "正确答案是"+rights+"，回答错误";
				}
				return {
					"status" : status,
					"text" : text
				};
			},
			exerciseStatusMatrixCheckbox (data) {
				let status = true;
				let text = '';
				let isCheckedNum = 0;
				let myCheckedNum = 0;
				let isCheckedTotal = 0;
				let myCheckedTotal = 0;
				let rights = '';
				let context = data[0];
				context.items.forEach((element, index) => {
					if(element.isChecked && element.myChecked){
						myCheckedNum++;
					}
					if(element.isChecked){
						isCheckedTotal++;
						rights+= context.items[parseInt(index/context.cols)*context.cols].title + ':' + context.items[index%context.cols].title + ';';
					}
					if(element.myChecked){
						myCheckedTotal++;
					}
				})
				if(myCheckedTotal == isCheckedTotal){
					if(isCheckedTotal && myCheckedNum && isCheckedTotal == myCheckedNum){
						status = true;
						text = "正确答案是"+rights+"，回答正确";
					}else{
						status = false;
						text = "正确答案是"+rights+"，回答错误";
					}
				}else{
					status = false;
					text = "正确答案是"+rights+"，回答错误";
				}
				return {
					"status" : status,
					"text" : text
				};
			},
			exerciseStatusBlank (data) {
				let status = false;
				let text = '';
				let context = data[0];
				if(context.blank && context.myBlank && context.blank.trim() == context.myBlank.trim()){
					status = true;
					text = "正确答案是"+context.blank+"，回答正确";
				}else{
					status = false;
					text = "正确答案是"+context.blank+"，回答错误";
				}
				return {
					"status" : status,
					"text" : text
				};
			},
			exerciseStatusMatrixBlank (data) {
				let status = true;
				let text = '';
				let isCheckedNum = 0;
				let myCheckedNum = 0;
				let isCheckedTotal = 0;
				let myCheckedTotal = 0;
				let rights = '';
				let context = data[0];
				context.items.forEach((element, index) => {
					if(element.blank && element.myBlank && element.blank.trim() == element.myBlank.trim()){
						myCheckedNum++;
					}
					if(element.blank){
						isCheckedTotal++;
						rights+= context.items[parseInt(index/context.cols)*context.cols].title + ':' + context.items[index].blank + ';';
					}
					if(element.myBlank){
						myCheckedTotal++;
					}
				})
				if(myCheckedTotal == isCheckedTotal){
					if(isCheckedTotal && myCheckedNum && isCheckedTotal == myCheckedNum){
						status = true;
						text = "正确答案是"+rights+"，回答正确";
					}else{
						status = false;
						text = "正确答案是"+rights+"，回答错误";
					}
				}else{
					status = false;
					text = "正确答案是"+rights+"，回答错误";
				}
				return {
					"status" : status,
					"text" : text
				};
			},
			exerciseStatusQuestions (data) {
				let status = false;
				let text = '';
				let context = data[0];
				if(context.blank && context.myBlank && context.blank.trim() == context.myBlank.trim()){
					status = true;
					text = "正确答案是"+context.blank+"，回答正确";
				}else{
					status = false;
					text = "正确答案是"+context.blank+"，回答错误";
				}
				return {
					"status" : status,
					"text" : text
				};
			},
			exerciseStatusMatrixTask (data) {
				let status = false;
				let statusRightTotal = 0;
				let text = '';
				data.forEach((element, index) => {
					let context = element.data;
					let type = element.type;
					let question = '';
					switch (type){
						case "radio":
							question = this.exerciseStatusRadio(context);
							break;
						case "checkbox":
							question = this.exerciseStatusCheckbox(context);
							break;
						case "blank":
							question = this.exerciseStatusBlank(context);
							break;
						case "question":
							question = this.exerciseStatusQuestions(context);
							break;
						case "matrixRadio":
							question = this.exerciseStatusMatrixRadio(context);
							break;
						case "matrixCheckbox":
							question = this.exerciseStatusMatrixCheckbox(context);
							break;
						case "matrixBlank":
							question = this.exerciseStatusMatrixBlank(context);
							break;
					}
					if(question.status){
						statusRightTotal++;
					}
					text+= 'Task ' + (index+1) + '<br/>'+question.text+';<br/>'
				})
				if(statusRightTotal == data.length){
					status = true;
				}


				return {
					"status" : status,
					"text" : text
				};
			},
			getLocalStorage (key) {
				return JSON.parse(window.localStorage.getItem(key));
			}
		}
	}
</script>
<style lang="scss">
	@import "../../assets/style/exam";
</style>