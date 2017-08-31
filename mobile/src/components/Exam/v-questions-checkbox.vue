<template>
	<ul class="exercises-ul" v-if="optionsContextJson">
		<template v-for="(list, index) in optionsContextJson" >
			<li :class="list.myChecked ? 'exercises-li active' : 'exercises-li'" v-if="list.title" @click="seleteOptions(index, $event)" :key="list.title">
				<a href="javascript:;" class="exercises-a">
					{{ exam.exerciseOptionsArray[index] }}&nbsp;&nbsp;<span v-html="list.title"></span>
				</a>
			</li>
		</template>
	</ul>
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
		seleteOptions (index, event) {
			var that = event.currentTarget;
			var thatSiblings = that.parentNode.childNodes;
			
			this.exam.exerciseContext[index].myChecked = !this.exam.exerciseContext[index].myChecked;
			if(this.exam.exerciseContext[index].myChecked){
				that.className = "exercises-li active";
			}else{
				that.className = "exercises-li";
			}
			this.update({
				"exerciseOptionsActiveIndex" : index
			})
		}
	}
}

</script>
<style>
</style>