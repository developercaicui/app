<template>
	<transition-group class="exercises-box" name="exercises" mode="out-in" tag="div">
	<div class="exercises" :key="exam.exerciseId">
		
		<component :is="exam.exerciseType" :exercises-title="exam.exerciseDetail.title" :options-context-json="exerciseContextJson"></component>
		
		<a class="analysis-button" href="javascript:;" @click="analysisBtn($event)">{{ this.analysisText }}<span class="triangle"></span></a>
		<analysls></analysls>
	</div>
	</transition-group>
</template>
<script>
	import { mapState,mapMutations,mapActions } from 'vuex';
	import analysls from './v-questions-analysis';
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
			analysls,
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
					this.arrEntities();
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
				this.$emit("getexercisestatus");
				
				if(this.exam.exerciseShowAnalysis){
					this.analysisText = "展开解析";
					this.update({
						"exerciseShowAnalysis" : false,
						"exerciseOptionsActiveIndex" : 1
					})
				}else{
					this.analysisText = "收起解析";
					this.update({
						"exerciseShowAnalysis" : true,
						"exerciseOptionsActiveIndex" : 1
					})
				}
			}
		}
	}
</script>
<style lang="scss">
</style>