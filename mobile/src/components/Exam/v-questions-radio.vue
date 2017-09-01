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
		...mapState(['exam']),
		setActiveIndex (){

			let activeIndex = -1;
			this.optionsContextJson.forEach((item, index)=>{
				if(item.myChecked){
					this.update({
						"exerciseOptionsActiveIndex" : index
					})
					activeIndex =  index;
				}
			})
			return activeIndex;
		},
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