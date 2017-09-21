<template lang="html">

	<main class="course-wrap-ipad">

		<ul class="course-navBar">
			<li class="active" data-type="learning" @touchend="changeCourse">在学课程</li>
			<li data-type="noactive" @touchend="changeCourse">未激活课程</li>
			<li data-type="overdue"  @touchend="changeCourse">已过期课程</li>
		</ul>
		<transition-group name="drop">
			<Courselearning v-show="currmodule=='learning'" key="learning"></Courselearning>
			<Coursenoactive v-show="currmodule=='noactive'" key="noactive"></Coursenoactive>
			<Courseoverdue v-show="currmodule=='overdue'" key="overdue"></Courseoverdue>
		</transition-group>
		
	</main>

</template>

<script>

import Courselearning from './learning';
import Coursenoactive from './noactive';
import Courseoverdue from './overdue';

export default {

  	created() {
  		
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
    z-index: 10;
    left: 0;
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

.drop-enter-active, .drop-leave-active {
    transition: all 0.3s ease;
}

.drop-enter, .drop-leave-active {
    opacity: 0;
}


</style>
