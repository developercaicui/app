<template>
	<div class="analysis" v-show="exam.exerciseShowAnalysis">
		<div class="analysis-answer" :class="exam.exerciseStatus=='1' ? 'analysis-answer-success' : 'analysis-answer-error'" v-html="exam.exerciseStatusText"></div>
		<p>解析：</p>
		<div class="analysis-content" v-html="answerResolutionData"></div>
	</div>
</template>
<script>
	import { mapState,mapMutations,mapActions } from 'vuex';
	export default{
		props : [
			"answerResolution",
			"showAnalysis"
		],
		data (){
			return {
			}
		},
		computed : {
			...mapState(['exam']),
			answerResolutionData (){
				if(this.exam.exerciseDetail.answerResolution){
					let answerResolution = this.exam.exerciseDetail.answerResolution ? this.arrEntitiesAnalysis(this.exam.exerciseDetail.answerResolution) : '暂无解析';
					return answerResolution;
				}
			},
			analysisShow () {
				if(this.exam.exerciseStatus === -1){
					return false;
				}else{
					return true;
				}

			},
			analysisClass (){
				if(this.exam.exerciseStatus == 0){

				}else if(this.exam.exerciseStatus == 1){

				}
			}
		},
		methods : {
			...mapMutations([
				'update'
			]),
			arrEntitiesAnalysis (context){
				let newContent = '';
				if(context.substring(0,1) == '&'){
					let arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"', '#39': "'" };
					newContent = context.replace(/&(lt|gt|nbsp|amp|quot|#39);/ig, function(all, t) { return arrEntities[t]; });
					context = newContent;
				}
				return context;
			}
		}
	}
</script>
<style>
</style>