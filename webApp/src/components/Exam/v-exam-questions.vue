<template>
	<transition-group class="exercises-box" name="exercises" mode="out-in" tag="div">
	<div class="exercises" :key="exam.exerciseId">
		<template v-if="exam.exerciseContext.length">
			<component :is="exam.exerciseType" :exercises-title="exam.exerciseDetail.title" :options-context-json="exerciseContextJson"></component>
			
			<a v-if="exam.isAnalysis" class="analysis-button" href="javascript:;" @click="analysisBtn($event)">{{ exam.exerciseAnalysisText }}<span class="triangle"></span></a>
			<analysis></analysis>
		</template>
		
		<div class="g-data-loading" v-else>
		  <div class="showbox">
		    <div class="loader">
		      <svg class="circular" viewBox="25 25 50 50">
		        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
		      </svg>
		    </div>
		  </div>
		  <h1>加载中...</h1>
		</div>
		
	</div>
	</transition-group>
</template>
<script>
	import { mapState,mapMutations,mapActions } from 'vuex';
	import analysis from './v-questions-analysis';
	import radio from './v-questions-radio';
	import checkbox from './v-questions-checkbox';
	import blank from './v-questions-blank';
	import question from './v-questions-question';
	import matrixRadio from './v-questions-matrixRadio';
	import matrixCheckbox from './v-questions-matrixCheckbox';
	import matrixBlank from './v-questions-matrixBlank';
	import multiTask from './v-questions-multiTask';
	export default{
		components : {
			analysis,
			radio,
			blank,
			checkbox,
			question,
			matrixRadio,
			matrixCheckbox,
			matrixBlank,
			multiTask
		},
		props : [
			"contextOptions"
		],
		data () {
			return {
				"optionsContext" : '',
				"analysisText" : "展开解析"
			}
		},
		computed : {
			...mapState(['exam']),
			exerciseContextJson (){
				if(this.exam.exerciseContext && this.exam.exerciseContext.length){
					console.log(this.exam.exerciseContext)
					this.arrEntities();
					console.log(this.exam.exerciseContext)
					return this.exam.exerciseContext;
				}
				
			}
		},
		created (){
		},
		methods : {
			...mapMutations([
				'update',
				'arrEntities'
			]),
			analysisBtn (event){
				
				
				if(this.exam.exerciseShowAnalysis){
					// this.analysisText = "展开解析";
					this.update({
						"exerciseShowAnalysis" : false,
						"exerciseAnalysisText" : '展开解析'
					})

				}else{
					this.$emit("analysisstatus");
					// this.analysisText = "收起解析";
					this.update({
						"exerciseShowAnalysis" : true,
						"exerciseAnalysisText" : '收起解析',
						"exerciseOptionsActiveIndex" : -1
					})
				}
			}
		}
	}
</script>
<style lang="scss">
</style>