<template>
	<ul class="exam-cards-ul">
		<li class="exam-cards-li" @click="cardsBtnPrev"><a href="javascript:;" class="exam-cards-prev triangle"></a></li>
		<div class="exam-cards-scroll">
			<div class="exam-cards-box" :style="{ width: cardsBoxWidth + 'px' }">
				<template v-for="(list, index) of cardsArra">
					<!-- <li class="exam-cards-li" :class="exam.exerciseActiveIndex == index ? 'exam-cards-active' : ''" :class="exerciseStatus(index)" @click="cardsBtn(index, $event)"><a href="javascript:;" class="exam-cards-a">{{index+1}}</a></li> -->
					<li class="exam-cards-li"  :class="list.status=='1' ? 'exam-cards-success' : 'exam-cards-error'" @click="cardsBtn(index, $event)"><a href="javascript:;" class="exam-cards-a">{{index+1}}</a></li>
				</template>
			</div>
		</div>
		<li class="exam-cards-li" @click="cardsBtnNext"><a href="javascript:;" class="exam-cards-next triangle"></a></li>
	</ul>
	
</template>
<script>
	import { mapState,mapMutations,mapActions } from 'vuex';
	export default{
		data (){
			return {
				"statusClass" : ''
			}
		},
		computed : {
			...mapState(['exam']),
			cardsBoxWidth () {
				return this.exam.examBaseInfo.length*36;
			},
			cardsArra (){
				if(this.exam.exerciseListCache && this.exam.exerciseListCache.length){
					this.exam.examBaseInfo.forEach((item1, index1)=>{
						this.exam.exerciseListCache.forEach((item2, index2)=>{
							if(this.exam.examBaseInfo[index1].id == item2.exercise_id){
								this.exam.examBaseInfo[index1].status = item2.status;
							}
						})
					});
					return this.exam.examBaseInfo;
				}
			}
		},
		methods : {
			cardsBtn (index, event) {
				const thatLi = event.currentTarget.parentNode;
				const thatLiArr = thatLi.childNodes;
				thatLiArr[this.exam.exerciseActiveIndex].className = 'exam-cards-li';
				event.target.parentNode.className = 'exam-cards-li exam-cards-active';
				this.$emit("clickExamCards",index);
			},
			cardsBtnPrev (){
				this.$emit("cardsPrev");
			},
			cardsBtnNext (){
				this.$emit("cardsNext");
			},
			exerciseStatus (thisIndex) {
				if(this.exam.exerciseListCache && this.exam.exerciseListCache.length){
					let status = '';
					this.exam.exerciseListCache.forEach((item, index)=>{
						if(this.exam.examBaseInfo[thisIndex].id == item.exercise_id){
							status = item.status;
						}
					})
					console.log(status)
					if(status){
						this.statusClass = 'exam-cards-success';
					}else{
						this.statusClass = 'exam-cards-error';
					}
					return this.statusClass;
				}
				
			}
		}
	}
</script>

<style lang="scss">
</style>
