<template>
	<div class="exercises-blank" v-if="optionsContextJson">
		<template v-for="(list, index) in optionsContextJson" >
			<input class="exercises-input" type="text" :value="list.myBlank" @keyup="changeVal(index, $event)">
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
.exercises-input{
	display: inline-block;
	outline: 0;
  width: 196px;
  height: 40px;
  border: 1px solid #3e9677;
  padding: 0 10px;
}
</style>