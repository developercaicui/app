<template>
	<div class="exercises-content">
		<div class="exercises-title" v-html="exercisesTitle"></div>
		<table class="exercises-table exercises-matrix " :class="exam.exerciseType ? 'exercises-matrix-'+exam.exerciseType : ''" v-if="optionsContextJson">
			<tr class="exercises-tr" v-for="(listRows, indexRows) in optionsContextJson[0].rows">
				<td class="exercises-td" v-for="(listCols, indexCols) in optionsContextJson[0].cols" :class="optionsContextJson[0].items[indexCols+(indexRows*optionsContextJson[0].cols)].myChecked ? 'active': ''">
					<div class="exercises-title" v-if="optionsContextJson[0].items[indexCols+(indexRows*optionsContextJson[0].cols)].isLable">{{optionsContextJson[0].items[indexCols+(indexRows*optionsContextJson[0].cols)].title}}</div>
					<input class="exercises-radio"  @click="seleteOptions(indexCols+(indexRows*optionsContextJson[0].cols),$event)" type="radio" name="" v-else>
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
		seleteOptions (index, event) {
			let that = event.currentTarget;
			let thatSiblings = that.parentNode.parentNode.getElementsByClassName('exercises-td');
			let content = '';
			let items = '';

			if(this.exam.exerciseType == "multiTask"){
				content = this.exam.exerciseContext[this.multiTaskIndex];
				items = content.data[0].items;
			}else{
				content = this.exam.exerciseContext[0];
				items = content.items;
			}
			
			for(let i in thatSiblings){
				if(thatSiblings[i].nodeType && thatSiblings[i].getElementsByTagName('input')){
					thatSiblings[i].className = "exercises-td";
				}
			}
			let min = items[index].x*(+content.cols);
			let max = (+items[index].x+1)*(+content.cols);
			for(let i=min;i<max;i++){
				items[i].myChecked = false;
			}
			that.parentNode.className = "exercises-td active";
			items[index].myChecked = true;
			this.update({
				"exerciseOptionsActiveIndex" : index
			})
		}
	}
}

</script>
<style>
</style>