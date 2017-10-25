<template>
	<div class="exercises-content">
		<div class="exercises-title" v-html="exercisesTitle"></div>
		<div v-for="(list, index) in optionsContextJson">
			<p class="exercises-task">Task {{index+1}}</p>
			<component :is="list.type" :multi-task-index="index" :exercises-title="list.title" :options-context-json="list.data"></component>
		</div>
	</div>
</template>
<script>
import { mapState,mapMutations,mapActions } from 'vuex';
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
		"exercisesTitle",
		"optionsContextJson"
	],
	data () {
		return {
			index : 0,
			activeIndex : -1
		}
	},
	computed : {
		...mapState(['exam'])
	},
	watch : {
		
	},
	created (){
		
	},
	methods : {
		...mapMutations([
			'update'
		]),
		seleteOptions (index, event) {
			var that = event.currentTarget;
			var thatSiblings = that.parentNode.childNodes;

			thatSiblings.forEach((item, index)=>{
				item.className = "exercises-li";

			})
			this.exam.exerciseContext.forEach((item, index)=>{
				this.exam.exerciseContext[index].myChecked = false;
			})
			that.className = "exercises-li active";
			this.exam.exerciseContext[index].myChecked = true;
			this.update({
				"exerciseOptionsActiveIndex" : index
			})
		}
	}
}

</script>
<style>
</style>