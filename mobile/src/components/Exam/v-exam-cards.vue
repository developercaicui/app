<template>
	<ul class="exam-cards-ul">
		<li class="exam-cards-li" @click="cardsBtnPrev"><a href="javascript:;" :class="exam.exerciseActiveIndex != 0?'exam-cards-prev triangle' : ''"></a></li>
		<div class="exam-cards-scroll" :style="{ width: cardsScrollWidth + 'px',maxWidth: cardsScrollWidth + 'px'}">
			<div class="exam-cards-box" :style="{ width: cardsBoxWidth + 'px',left: -exam.cardsPosLeft+'px' }"  :key="exam.exerciseStatus">
				<template v-for="(list, index) of exam.examBaseInfo" >
					<!-- <li class="exam-cards-li" :class="exam.exerciseActiveIndex == index ? 'exam-cards-active' : ''" :class="exerciseStatus(index)" @click="cardsBtn(index, $event)"><a href="javascript:;" class="exam-cards-a">{{index+1}}</a></li> -->
					<li class="exam-cards-li"  :class="[list.status=='1' ? 'exam-cards-success' : 'exam-cards-error',exam.exerciseActiveIndex == index ? 'exam-cards-active' : '']"  @click="cardsBtn(index, $event)"><a href="javascript:;" class="exam-cards-a">{{index+1}}</a></li>
				</template>
			</div>
		</div>
		<li class="exam-cards-li" @click="cardsBtnNext"><a href="javascript:;" :class="exam.exerciseActiveIndex != (exam.examBaseInfo.length-1)?'exam-cards-next triangle':''"></a></li>
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
				this.$emit("cardsPosLeft",this.exam.exerciseActiveIndex);
				return this.exam.examNumTotal*this.exam.cardsItemWidth;
			},
			cardsScrollWidth () {
				let cardsScrollWidth = 0;
				if(this.exam.examNumTotal >= 9){
					cardsScrollWidth = 9*this.exam.cardsItemWidth;
				}else{
					cardsScrollWidth = this.exam.examNumTotal*this.exam.cardsItemWidth;
				}
				return cardsScrollWidth;
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
			// exerciseStatus (thisIndex) {
			// 	if(this.exam.exerciseListCache && this.exam.exerciseListCache.length){
			// 		let status = '';
			// 		this.exam.exerciseListCache.forEach((item, index)=>{
			// 			if(this.exam.examBaseInfo[thisIndex].id == item.exercise_id){
			// 				status = item.status;
			// 			}
			// 		})
			// 		if(status){
			// 			this.statusClass = 'exam-cards-success';
			// 		}else{
			// 			this.statusClass = 'exam-cards-error';
			// 		}
			// 		return this.statusClass;
			// 	}
				
			// }
		}
	}
</script>

<style lang="scss">
</style>
