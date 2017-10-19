import axios from 'axios';
import Request from '../../api/request';
export default {
	state : {
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
		cacheKnowledgeLevel1Id : '',
		cacheKnowledgeLevel2Id : '',

		exam : '',
		examType : '', // chapter,realImitate,knowledge,testSite
		examFindType : 4,
		examId : '',
		examTitle : '',
		examCache : [],
		examState : [],
		examBaseInfo : [],
		examNum : '',
		examNumTotal : 0,
		examIsFinish : 0,
		examProgress : 0,

		exerciseType : '',
		exerciseListRequest : [],
		exerciseListStatus : [],
		exerciseListCache : [],
		exerciseId : '',
		exerciseDetail : {},
		exerciseContext : [],
		exerciseOptionsArray : ["A","B","C","D","E","F","G","H","I","J","K"],
		exerciseTitle : '',
		exerciseStatus : -1,
		exerciseStatusText : '',
		exerciseActiveIndex : 0,
		exerciseShowAnalysis : false,
		exerciseAnalysisText : '展开解析',
		exerciseOptionsActiveIndex : -1,
		exerciseTotalTime : 0,
		exerciseDoneCount : 0,
		exerciseLastNid : 0,
		exerciseErrorNum : 0,
		exerciseRightCount : 0,
		exerciseAnalysis : '',

		isAnalysis : true,
		cardsItemWidth : 48,
		cardsPosLeft : 0
	},
	getters : {
		getExamId : state => {

		},
		setExercise : (state, exerciseData) => {
			// state.exam.exerciseListCache.forEach((element, index) => {
			// 	console.log(element)
			// })

		},
		
	},
	mutations : {
		update (state, obj){
			for(var i in obj){
				state[i] = obj[i];
			}
		},
		setExamId (state, examId){
			state.examId =  examId;
		},
		arrEntities (state){
			let newContent = '';

			if(typeof state.exerciseContext == 'string'){
				// console.log(state.exerciseContext)
				let context = state.exerciseContext.replace(/<[^>]+>/g,"").replace(/(^\s+)|(\s+$)/g,"").replace(/(\r)|(\n)|(\t)/g,'')
				// console.log(context)
				try{
					newContent = JSON.parse(JSON.parse(JSON.stringify(context)));
				}catch(e){
					if(context.substring(0,3) == "'[{"){
						newContent = context.substring(1,context.length-1);
						newContent = JSON.parse(newContent);
					}else{
						let arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"', '#39': "'" };
						newContent = context.replace(/&(lt|gt|nbsp|amp|quot|#39);/ig, function(all, t) { return arrEntities[t]; });
						try{
							let newContentTry = newContent;
							newContentTry.substring(1,newContentTry.length-1);
							newContent = JSON.parse(JSON.parse(JSON.stringify(newContentTry)));
						}catch(e){
							try{
								newContent = JSON.parse(JSON.parse(JSON.stringify(newContent)));
							}catch(e){
								newContent = JSON.parse(JSON.stringify(newContent));
							}
						}
					}
				}
				state.exerciseContext = newContent;
			}
		},
		getExerciseTitle (state, obj) {
				let title = '';
				if(obj.exerciseTitle){
					title = obj.exerciseTitle.replace(/<[^>]+>/g,"").replace(/(^\s+)|(\s+$)/g,"").replace(/(\r)|(\n)|(\t)/g,'')
				}else{
					switch(obj.exerciseType){
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
				// console.log(title)
				state.exerciseTitle = title;
				// return title;
			}
	},
	actions : {
		requestListDetail ({state, commit}, args){
			axios.all([Request.exerciseList({
				"knowledge_point_id":state.examId,
				"member_id":args.memberId,
				"examenNum":state.examNum
			}),Request.exerciseDetail({
				'exerciseId' : state.exerciseId
			})]).then(axios.spread((exerciseList, exerciseDetail) => {
				// if(state.exerciseListCache && state.exerciseListCache.length){
					state.examBaseInfo.forEach((item1, index1)=>{
						exerciseList.data.forEach((item2, index2)=>{
							if(state.examBaseInfo[index1].id == item2.exercise_id){
								state.examBaseInfo[index1].status = item2.status;
							}
						})
					});
				// }
				commit('getExerciseTitle',{
					"exerciseTitle" : exerciseDetail.data[0].title,
					"exerciseType" : exerciseDetail.data[0].questionTypes
				})
				commit('update',{
					"exerciseListRequest" : [{
						"count" : state.exerciseLastNid,
						"detail" : exerciseDetail.data[0]
					}],
					"exerciseListCache" : exerciseList.data,
					"exerciseListStatus" : state.examBaseInfo,
					"exerciseDetail" : exerciseDetail.data[0],
					"exerciseType" : exerciseDetail.data[0].questionTypes,
					// "exerciseTitle" : exerciseDetail.data[0].title
				});
				let cacheIndexContext = '';
				exerciseList.data.forEach((item, index) => {
					if(item.exercise_id == state.exerciseId || item.exerciseId == state.exerciseId){
						cacheIndexContext = exerciseList.data[index].context;
					}
				})
				if(cacheIndexContext){
					commit('update',{
						"exerciseContext" : cacheIndexContext
					})
				}else{
					commit('update',{
						"exerciseContext" : exerciseDetail.data[0].context
					})
				}

			}))
		},
		requestExerciseList ({state, commit, getters}, args){
			Request.exerciseList({
				"knowledge_point_id":state.examId,
				"member_id":args.memberId,
				"examenNum":state.examNum
			}).then(res => {
				commit('update',{
					"exerciseListCache" : res.data
				});
				let cacheIndexContext = '';
				res.data.forEach((item, index) => {
					if(item.exercise_id == state.exerciseId || item.exerciseId == state.exerciseId){
						cacheIndexContext = res.data[index];
						cacheIndexContext.title = state.examBaseInfo[state.exerciseActiveIndex].title;
					}
				})
				if(cacheIndexContext){
					commit('update',{
						"exerciseDetail" : cacheIndexContext
					})
				}
			});
		},
		requestExerciseDetail ({state, commit}){
			Request.exerciseDetail({
				'exerciseId' : state.exerciseId
			}).then(exerciseDetail =>{
				commit('update',{
					"exerciseDetail" : exerciseDetail.data[0],
					"exerciseListRequest" : {
						exerciseIndex : res.data[0]
					}
				});
				let cacheIndexContext = '';
				state.exerciseListCache.forEach((item, index) => {
					if(item.exercise_id == state.exerciseId || item.exerciseId == state.exerciseId){
						cacheIndexContext = state.exerciseListCache[index].context;
					}
				})
				if(cacheIndexContext){
					commit('update',{
						"exerciseContext" : cacheIndexContext
					})
				}else{
					commit('update',{
						"exerciseContext" : exerciseDetail.data[0].context
					})
				}
			});
		}
	}
}