<template>
	<div class="exercises-blank" v-if="optionsContextJson">
		<template v-for="(list, index) in optionsContextJson">
			<textarea class="exercises-textarea" type="text"  @keyup="changeVal(index, $event)">{{list.myBlank}}</textarea> 
		</template>
	</div>
</template>
<script>
import { mapState,mapMutations,mapActions } from 'vuex';
export default{
	props : [
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
			this.exam.exerciseContext[index].myBlank = that.value;
			if(that.value){
				this.update({
					"exerciseOptionsActiveIndex" : 1
				})
			}else{
				this.update({
					"exerciseOptionsActiveIndex" : -1
				})
			}
		}
	}
}

</script>
<style>
.exercises-textarea{
  width: 100%;
  height: 110px;
  outline: 0;
  border: 1px solid #3e9677;
  padding: 10px;
  margin-top: 20px;
  resize: none;
  box-sizing: border-box;
}
</style>