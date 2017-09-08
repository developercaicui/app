<template>
	<div class="exercises-content">
		<div class="exercises-title" v-html="exercisesTitle"></div>
		<ul class="exercises-ul" v-if="optionsContextJson">
			<template v-for="(list, index) in optionsContextJson" >
				<li :class="list.myChecked ? 'exercises-li active' : 'exercises-li'" v-if="list.title" @click="seleteOptions(index, $event)" :key="list.title">
					<a href="javascript:;" class="exercises-a">
						{{ exam.exerciseOptionsArray[index] }}&nbsp;&nbsp;<span v-html="list.title"></span>
					</a>
				</li>
			</template>
		</ul>
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
			var that = event.currentTarget;
			var thatSiblings = that.parentNode.childNodes;

			let items = '';
			
			if(this.exam.exerciseType == "multiTask"){
				items = this.exam.exerciseContext[this.multiTaskIndex].data;
			}else{
				items = this.exam.exerciseContext;
			}

			items.forEach((item, index)=>{
				items[index].myChecked = false;
			})
			items[index].myChecked = true;

			thatSiblings.forEach((item, index)=>{
				item.className = "exercises-li";
			})
			that.className = "exercises-li active";
			
			this.update({
				"exerciseOptionsActiveIndex" : 1
			})
		}
	}
}

</script>
<style>
</style>