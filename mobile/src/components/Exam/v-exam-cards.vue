<template>
	<ul class="exam-cards-ul">
		<li class="exam-cards-li" @click="cardsBtnPrev"><a href="javascript:;" :class="exam.exerciseActiveIndex != 0?'exam-cards-prev triangle' : ''"></a></li>
		<v-touch class="exam-cards-scroll" :style="{ width: cardsScrollWidth + 'px',maxWidth: cardsScrollWidth + 'px'}" @panstart="touchStart" @panmove="touchMove" @panend="touchEnd">
			<div class="exam-cards-box" :style="{ width: cardsBoxWidth + 'px',transform: 'translateX(' + -exam.cardsPosLeft + 'px)' }"  :key="exam.exerciseStatus">
			<!-- <div class="exam-cards-box" :style="{ width: cardsBoxWidth + 'px' }"  :key="exam.exerciseStatus"> -->
				<template v-for="(list, index) of exam.examBaseInfo" >
					<!-- <li class="exam-cards-li" :class="exam.exerciseActiveIndex == index ? 'exam-cards-active' : ''" :class="exerciseStatus(index)" @click="cardsBtn(index, $event)"><a href="javascript:;" class="exam-cards-a">{{index+1}}</a></li> -->
					<li class="exam-cards-li"  :class="[list.status=='1' ? 'exam-cards-success' : 'exam-cards-error',exam.exerciseActiveIndex == index ? 'exam-cards-active' : '']"  @click="cardsBtn(index, $event)"><a href="javascript:;" class="exam-cards-a">{{index+1}}</a></li>
				</template>
			</div>
		</v-touch>
		<li class="exam-cards-li" @click="cardsBtnNext"><a href="javascript:;" :class="exam.exerciseActiveIndex != (exam.examBaseInfo.length-1)?'exam-cards-next triangle':''"></a></li>
	</ul>
	
</template>
<script>
	import { mapState,mapMutations,mapActions } from 'vuex';
	export default{
		data (){
			return {
				"statusClass" : '',
				"startX" : 0
			}
		},

		computed : {
			...mapState(['exam']),
			cardsBoxWidth () {
				this.$emit("cardsPosLeft",this.exam.exerciseActiveIndex);
				return this.exam.examNumTotal*this.exam.cardsItemWidth;
			},
			cardsScrollWidth () {
				if(this.exam.examBaseInfo.length){
					let cardsScrollWidth = 0;
					if(this.exam.examNumTotal >= 9){
						cardsScrollWidth = 9*this.exam.cardsItemWidth;
					}else{
						cardsScrollWidth = this.exam.examNumTotal*this.exam.cardsItemWidth;
					}
					return cardsScrollWidth;
				}
			}
		},
		methods : {
			...mapMutations([
				'update',
				'getExerciseTitle',
				'setExamId',
				'arrEntities'
			]),
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
			cardsTouch (e){
				console.log(e)
			},
			touchStart (e){
				this.startX = e.deltaX;
			},
			touchMove (e){
				var newPosLeft = this.exam.cardsPosLeft-(e.deltaX-this.startX);
				if(newPosLeft<0){
					this.update({
						"cardsPosLeft" : 0
					})
				}else if(newPosLeft > (this.exam.examNumTotal-9)*this.exam.cardsItemWidth){
					this.update({
						"cardsPosLeft" : (this.exam.examNumTotal-9)*this.exam.cardsItemWidth
					})
				}else{
					this.update({
						"cardsPosLeft" : newPosLeft
					})
				}
				this.startX = e.deltaX;
				
			},
			touchEnd (e){
				// this.update({
				// 	"cardsPosLeft" : this.exam.cardsPosLeft-e.deltaX
				// })
			}
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
