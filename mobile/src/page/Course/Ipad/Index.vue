<template lang="html">

	<main class="content-padding-left course-wrap-ipad">

		<ul class="course-navBar">
			<li class="active" @click="changeCourse('learning')">在学课程</li>
			<li @click="changeCourse('noactive')">未激活课程</li>
			<li @click="changeCourse('overdue')">已过期课程</li>
		</ul>
		
		<Course :learning-data='learningData'></Course>

		
	</main>

</template>

<script>

import Course from '../../../components/Course/Ipad';

export default {

	props: {
		learningData: {
			type: Object,
			default: {}
		}
  	},
  	created() {
  		// console.log(this.learningData)
  	},

	updated() {

		
	},

	components: {
	   Course
	},


  data() {
    return {
    	navBar: ["在学课程","未激活课程","已过期课程"],
		courseList: learningData
    }
  },
  mounted () {

  },
  methods: {
  	 changeCourse(courseStyle) {

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
	width: 100%;
	height: 1.4rem;
	background-color: #f5f5f5;
	@include fc(.32rem, #999999);
	display: table;
	padding-top: 0.5rem;
	position: fixed;
	z-index: 9999;
	li{
		width: 1.9rem;
	    display: inline-block;
	    text-align: center;
	    height: 0.6rem;
	    font-weight: bold;
	    display: table-cell;
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
