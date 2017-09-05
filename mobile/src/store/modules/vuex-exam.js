import axios from 'axios';
import Request from '../../api/request';
import COMMON from '../../api/common';
export default {
	state : {
		exam : '',
		examType : '', // chapter,imitate,real,knowledge
		examId : '',
		examCache : [],
		examState : [],
		examBaseInfo : [],
		examNum : 0,
		examIsFinish : 0,
		examProgress : 0,

		exerciseType : '',
		exerciseListRequest : [],
		exerciseListStatus : [],
		exerciseListCache : [],
		exerciseId : '',
		exerciseDetail : {},
		exerciseContext : [],
		exerciseOptionsArray : ["A","B","C","D","E","F"],
		exerciseTitle : '',
		exerciseStatus : -1,
		exerciseStatusText : '',
		exerciseActiveIndex : 0,
		exerciseShowAnalysis : false,
		exerciseOptionsActiveIndex : -1,
		exerciseTotalTime : 0,
		exerciseDoneCount : 0,
		exerciseLastNid : 0,
		exerciseErrorNum : 0,
		exerciseRightCount : 0,
		exerciseAnalysis : '',

	},
	getters : {
		getExamId : state => {

		},
		setExercise : (state, exerciseData) => {
			// state.exam.exerciseListCache.forEach((element, index) => {
			// 	console.log(element)
			// })

		}
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
				try{
					newContent = JSON.parse(JSON.parse(JSON.stringify(state.exerciseContext)));
				}catch(e){
					if(state.exerciseContext.substring(0,3) == "'[{"){
						newContent = state.exerciseContext.substring(1,state.exerciseContext.length-1);
						newContent = JSON.parse(newContent);
					}else{
						let arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"', '#39': "'" };
						newContent = state.exerciseContext.replace(/&(lt|gt|nbsp|amp|quot|#39);/ig, function(all, t) { return arrEntities[t]; });
						newContent = newContent.substring(1,newContent.length-1);
						newContent = JSON.parse(JSON.parse(JSON.stringify(newContent)));
					}
				}
				state.exerciseContext = newContent;
			}
		}
	},
	actions : {
		requestListDetail ({state, commit}){
			axios.all([Request.exerciseList({
				"knowledge_point_id":state.examId,
				"member_id":COMMON.User.memberId,
				"examenNum":state.examNum
			}),Request.exerciseDetail({
				'exerciseId' : state.exerciseId
			})]).then(axios.spread((exerciseList, exerciseDetail) => {
				
				commit('update',{
					"exerciseListRequest" : [{
						"count" : state.exerciseLastNid,
						"detail" : exerciseDetail.data[0]
					}],
					"exerciseListCache" : exerciseList.data,
					"exerciseDetail" : exerciseDetail.data[0],
					"exerciseType" : exerciseDetail.data[0].questionTypes
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
		requestExerciseList ({state, commit, getters}){
			Request.exerciseList({
				"knowledge_point_id":state.examId,
				"member_id":COMMON.User.memberId,
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