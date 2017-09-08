<template>
	<div class="exercises-content">
		<div class="exercises-title" v-html="exercisesTitle"></div>
		<table class="exercises-table exercises-matrix " :class="exam.exerciseType ? 'exercises-matrix-'+exam.exerciseType : ''" v-if="optionsContextJson">
			<tr class="exercises-tr" v-for="(listRows, indexRows) in optionsContextJson[0].rows">
				<td class="exercises-td" v-for="(listCols, indexCols) in optionsContextJson[0].cols">
					<div class="exercises-title" v-if="optionsContextJson[0].items[indexCols+(indexRows*optionsContextJson[0].cols)].isLable" v-html="optionsContextJson[0].items[indexCols+(indexRows*optionsContextJson[0].cols)].title"></div>
					<input class="exercises-text" v-model="optionsContextJson[0].items[indexCols+(indexRows*optionsContextJson[0].cols)].myBlank" @keyup="changeVal(index, $event)" type="text" name="" v-else>
				</td>
			</tr>
		</table>
	</div>
</template>
<script>
import { mapState,mapMutations,mapActions } from 'vuex';
export default{
	props : [
		"multiTaskIndex",
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
		changeVal (index, even){
			let that = event.currentTarget;
			let content = '';
			let items = '';
			if(this.exam.exerciseType == "multiTask"){
				content = this.exam.exerciseContext[this.multiTaskIndex];
				items = content.data[0].items;
			}else{
				content = this.exam.exerciseContext[0];
				items = content.items;
			}
			items[index].myBlank = that.value;
			this.update({
				"exerciseOptionsActiveIndex" : 1
			})
		}
	}
}

</script>
<style>
</style>