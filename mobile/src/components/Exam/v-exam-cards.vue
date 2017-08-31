<template>
	<ul class="exam-cards-ul">
		<li class="exam-cards-li" @click="cardsBtnPrev"><a href="javascript:;" class="exam-cards-prev triangle"></a></li>
		<div>
			<template v-for="(list, index) of exam.examBaseInfo">
				<li class="exam-cards-li" :class="exam.exerciseActiveIndex == index ? 'exam-cards-active' : ''" @click="cardsBtn(index, $event)"><a href="javascript:;" class="exam-cards-a">{{index+1}}</a></li>
			</template>
		</div>
		<li class="exam-cards-li" @click="cardsBtnNext"><a href="javascript:;" class="exam-cards-next triangle"></a></li>
	</ul>
	
</template>
<script>
	import { mapState,mapMutations,mapActions } from 'vuex';
	export default{
		computed : mapState(['exam']),
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
			}
		}
	}
</script>

<style lang="scss">
</style>
