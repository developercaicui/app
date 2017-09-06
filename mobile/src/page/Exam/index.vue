<template>
	<div class="exam">
		<div class="exam-header">
			<a class="exam-return triangle" href="javascript:;"></a>
			<h3 class="exam-title">试卷标题: 试卷类型:{{exam.examType}}</h3>
			<!-- <a class="exam-menu" href="javascript:;">菜单</a> -->
		</div>
		<div class="exam-body">
			<a href="javascript:;" class="triangle exercises-prev" @click="exercisePrev"></a>
			<a href="javascript:;" class="triangle exercises-next" @click="exerciseNext"></a>
				<questions @analysisstatus="analysisEvent"></questions>
			
		</div>
		<div class="exam-footer" v-if="exam.exerciseListCache.length">
			<exam-cards @cardsPrev="exercisePrev" @cardsNext="exerciseNext" @clickExamCards="exerciseChange"></exam-cards>
			<ul class="exam-button-ul">
				<li class="exam-button-li"><a href="javascript:;" class="exam-button-a">交卷</a></li>
				<li class="exam-button-li"><a href="javascript:;" class="exam-button-a">笔记</a></li>
				<li class="exam-button-li"><a href="javascript:;" class="exam-button-a">提问</a></li>
			</ul>
		</div>
	</div>
</template>
<script>
	
	import axios from 'axios';
	import Request from '../../api/request';
	import COMMON from '../../api/common';
	import { mapState,mapMutations,mapActions } from 'vuex';

	import examCards from '../../components/Exam/v-exam-cards';
	import questions from '../../components/Exam/v-exam-questions';
	export default {
		components : {
			examCards,
			questions
		},
		data () {
			return {
				examType : this.$route.params.type,
				examId : this.$route.params.id,
				exerciseContextSave : []
			}
		},
		computed : {
			...mapState(['exam'])
		},

		created() {

			// 删除做题记录
			// Request.delMemberExercise({
			// 	"memberId" : 'ff8080815133db0d0151375bfdf30c0d',
			// 	"knowledgePointId" : '8a22ecb551f699b60151f83229be030f',
			// 	"examenNum" : 0
			// }).then((res)=>{
			// })
			this.update({
				"examType" : this.examType,
				"examId" : this.examId
			})
			if(this.examType == "chapter" || this.examType == "realImitate"){
				this.exerciseExam();
			}else if(this.examType == "knowledge" || this.examType == "testSite"){
				this.exerciseKnowledge();
			}
			
		},
		methods : {
			...mapMutations([
				'update',
				'setExamId',
				'arrEntities'
			]),
			...mapActions([
				'requestListDetail',
				'requestExerciseList',
				'requestExerciseDetail'
			]),
			exerciseExam (){
				axios.all([Request.examStatus({
					'knowledge_points' : this.examId,
					'type' : '4',
					'member_id' : COMMON.User.memberId,
					'examenNum' : ''
				}),Request.getExerciseBaseInfo({
					'examenId' : this.examId
				})]).then(axios.spread((status, baseInfo) => {
					let exerciseNid = 0;
					if(status.data && status.data.length){
						exerciseNid = +status.data[0].last_exercise_nid
					}
					this.update({
						"examNum" : status.data ? status.data.length : 0,
						"examState" : status.data[0],
						"examBaseInfo" : baseInfo.data,
						"exerciseLastNid" : exerciseNid,
						"exerciseActiveIndex" : exerciseNid,
						"exerciseId" : baseInfo.data[exerciseNid].id
					});
					this.requestListDetail();
					console.log(this.exam)
				}))
			},
			exerciseKnowledge (){
				axios.all([Request.examCache({
					'knowledge_points' : this.examId,
					'type' : '4'
				}),Request.examStatus({
					'knowledge_points' : this.examId,
					'type' : '4',
					'member_id' : COMMON.User.memberId,
					'examenNum' : ''
				})]).then(axios.spread((cache, status, baseInfo) => {

					let exerciseKnowledgeIds = this.exerciseKnowledgeIds(); //cache.data[0].exercise_filename
					let baseInfoData = [];
					exerciseKnowledgeIds.forEach((item)=>{
						baseInfoData.push({
							"id" : item
						})
					})
					let exerciseNid = 0;
					if(status.data && status.data.length){
						exerciseNid = +status.data[0].last_exercise_nid
					}
					this.update({
						"examCache" : cache.data,
						"examState" : status.data[0],
						"examBaseInfo" : baseInfoData,
						"exerciseLastNid" : exerciseNid,
						"exerciseActiveIndex" : exerciseNid,
						"exerciseId" : baseInfoData[exerciseNid].id
					});
					this.requestListDetail();
					console.log(this.exam)
				}))
			},
			exerciseKnowledgeIds (src){
				return "ff8080814bee5fde014bfa12b1230114".split(',');
				// return "ff8080814bee5fde014bfa12b1230114,ff8080814b7c866a014b7cfbfcec0329,ff8080814bee5fde014bf772fa340062,ff8080814a7f5035014a951f4a632d5b,ff8080814a7f5035014a963deab62ffb".split(',');
				// return "8a22ecb553c543220153cb6fbba100ac,8a22ecb55175206901517789c54c08d9,8a22ecb551752069015177790493088b,8a22ecb55678b61b015697341cc8016b,ff8080814f3eb9ed014f4f74cd04222c,ff8080814f3eb9ed014f4e90d4d11dfa,8a22ecb5517520690151773fb5f907af,8a22ecb55162140001516676e4a80b77".split(",");

				var iframe=document.createElement("iframe");
				iframe.setAttribute("id", "knowledgeIds");
				iframe.setAttribute("src", "http://www.caicui.com/upload/caicui_cache/exercise/"+src);
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
					}
				};
				return iframeData;
			},

			exerciseChange (index){

				let activeIndex = -1;
				let exerciseId = this.exam.examBaseInfo[index].id;
				let exerciseOptionIndex = this.exam.exerciseOptionsActiveIndex;
				if(exerciseOptionIndex !== -1){

					this.getExerciseStatus();

					// this.exerciseSaveContext();

					this.exerciseSaveCache(exerciseId);
					this.exerciseSave();

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
						"exerciseTitle" : exerciseListRequest.detail.title,
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
					})
				}
			},
			exercisePrev () {
				var index = this.exam.exerciseActiveIndex;
				index--;
				if(this.exam.exerciseActiveIndex){
					this.exerciseChange(index);
				}else{
					if(this.exam.exerciseOptionsActiveIndex !== -1){
						this.update({
							exerciseOptionsActiveIndex : -1
						})
						this.getExerciseStatus();
						this.exerciseSaveCache();
						this.exerciseSave();
					}
				}
			},
			exerciseNext () {
				var index = this.exam.exerciseActiveIndex;
				index++;
				if(index < this.exam.examBaseInfo.length){
					this.exerciseChange(index);
				}else{
					if(this.exam.exerciseOptionsActiveIndex !== -1){
						this.update({
							exerciseOptionsActiveIndex : -1
						})
						this.getExerciseStatus();
						this.exerciseSaveCache();
						this.exerciseSave();
					}
				}
			},
			exerciseSave (args){
				Request.setMemberExerciseLog({
					'status': this.exam.exerciseStatus,

					'knowledgePointId': this.exam.examId,
					'examenNum': this.exam.examNum,
					'examenName': this.exam.title,
					'examenTotalNum': this.exam.examBaseInfo.length,
					'examenType': this.exam.examType,
					'progress': this.exam.exerciseDoneCount,

					'exerciseId': this.exam.exerciseId,
					'memberId': COMMON.User.memberId,
					'context': "'" + JSON.stringify(this.exam.exerciseContext) + "'",
					'lastExerciseNid': this.exam.exerciseLastNid,
					'errorNum': this.exam.exerciseErrorNum,
					'correctNum': this.exam.exerciseRightCount,
					'totalTime': this.exam.exerciseTotalTime,
					'isFinish': this.exam.examIsFinish,
					'exerciseTitle': this.exam.exerciseTitle,
					'currentProgress': +this.exam.exerciseActiveIndex,

					'subjectId': this.exam.subjectId,
					'categoryId': this.exam.categoryId,
					'courseId': this.exam.courseId,
					'chapterId': this.exam.chapterId,
					'taskId': this.exam.taskId,
					'cacheKnowledgeLevel1Id': this.exam.cacheKnowledgeLevel1Id,
					'cacheKnowledgeLevel2Id': this.exam.cacheKnowledgeLevel2Id,
					'cacheKnowledgePath': this.exam.cacheKnowledgePath,
				}).then( (res) => {

				})
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
			analysisEvent () {
				let exerciseOptionIndex = this.exam.exerciseOptionsActiveIndex;
				this.getExerciseStatus();
				if(exerciseOptionIndex !== -1){

					this.exerciseSaveCache();
					this.exerciseSave();

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
				statusNum = question.status ? '1' : '0';
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
				if(element.blank && element.myBlank && context.blank.trim() == context.myBlank.trim()){
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
				if(element.blank && element.myBlank && context.blank.trim() == context.myBlank.trim()){
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
			}
		}
	}
</script>
<style lang="scss">
	@import "../../assets/style/exam";
</style>