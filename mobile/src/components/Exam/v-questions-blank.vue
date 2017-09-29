<template>
	<div class="exercises-content">
		<div class="exercises-title" v-html="exercisesTitle"></div>
		<div class="exercises-blank" v-if="optionsContextJson">
			<template v-for="(list, index) in optionsContextJson" >
				<input class="exercises-input" type="text" :value="list.myBlank" @keyup="changeVal(index, $event)">
			</template>
		</div>
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
			var that = event.currentTarget;
			if(this.exam.exerciseType == "multiTask"){
				this.exam.exerciseContext[this.multiTaskIndex].data[index].myBlank = that.value;
			}else{
				this.exam.exerciseContext[index].myBlank = that.value;
			}
			
			this.update({
				"exerciseOptionsActiveIndex" : 1
			})
		}
	}
}

</script>
<style>
.exercises-input{
	display: inline-block;
	outline: 0;
  width: 196px;
  height: 40px;
  border: 1px solid #fc3a6f;
  padding: 0 10px;
}
</style>