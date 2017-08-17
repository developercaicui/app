<template lang="html">

	<main class="content-padding-left course-wrap-ipad">

		<ul class="course-navBar">
			<li class="active" data-type="learning" @click="changeCourse">在学课程</li>
			<li data-type="noactive" @click="changeCourse">未激活课程</li>
			<li data-type="overdue"  @click="changeCourse">已过期课程</li>
		</ul>
		
		<Courselearning v-show="currmodule=='learning'"></Courselearning>
		<Coursenoactive v-show="currmodule=='noactive'"></Coursenoactive>
		<Courseoverdue v-show="currmodule=='overdue'"></Courseoverdue>

		
	</main>

</template>

<script>

import Courselearning from './learning';
import Coursenoactive from './noactive';
import Courseoverdue from './overdue';

export default {

  	created() {
  		// console.log(this.learningData)
  	},

	updated() {

		
	},

	components: {
	   Courselearning,
	   Coursenoactive,
	   Courseoverdue
	},


  data() {
    return {
    	currmodule:"learning",
    }
  },
  mounted () {

  },
  methods: {
  	 changeCourse(ev) {

  	 	for(let obj of ev.target.parentNode.querySelectorAll('li')) obj.classList.remove('active')

  	 	ev.target.classList.add('active');

  	 	this.currmodule = ev.target.dataset.type;

  	 }
  	 
  }

}

</script>

<style lang="scss" scoped>

@import "../../../assets/style/mixin";
	    
.course-wrap-ipad{
	background-color:#fff;
}
.course-navBar{
	height: 1.4rem;
    background-color: #f5f5f5;
    font-size: 0.32rem;
    color: #999999;
    padding-top: 0.5rem;
    position: fixed;
    z-index: 11;
    left: 1.6rem;
    right: 0;
    display: flex;
	li{
	    display: inline-block;
	    text-align: center;
	    flex: 1;
	    font-weight: bold;
	    line-height: 1rem;
	    border: 1px solid #d2d2d2;
	    border-top: none;
	    border-left: none;
	}

	.active{
    	color: #3d4e64;
	    background: #fff;
	    border-bottom: none;
    }
}




</style>
