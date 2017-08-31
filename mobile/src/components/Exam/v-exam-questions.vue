<template>
	<div class="exercises">
		<div class="exercises-title" v-html="exam.exerciseDetail.title"></div>
		<component :is="exam.exerciseType" :options-context-json="exerciseContextJson"></component>
		<a class="analysis-button" href="javascript:;" @click="analysisBtn($event)">{{ this.analysisText }}<span class="triangle"></span></a>
		<analysls></analysls>
	</div>
</template>
<script>
	import { mapState,mapMutations,mapActions } from 'vuex';
	import analysls from './v-questions-analysis';
	import radio from './v-questions-radio';
	import checkbox from './v-questions-checkbox';
	import blank from './v-questions-blank';
	import question from './v-questions-question';
	export default{
		components : {
			analysls,
			radio,
			blank,
			checkbox,
			question
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
					this.arrEntities()
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
						exerciseShowAnalysis : false
					})
				}else{
					this.analysisText = "收起解析";
					this.update({
						exerciseShowAnalysis : true
					})
				}
			}
		}
	}
</script>
<style lang="scss">
</style>