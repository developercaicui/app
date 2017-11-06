<template lang="html">

  <div class="course-content course-pic-list learning" ref="courseContentnoact">
  <SlideRefresh @top-status-change="topStatusChange" :distanceTop="styleTop">
      <div class="learning-navL">
        <p :class="[(activeBtn==index)?'active':'']" @touchend="learningNav(index)" v-for="(value,index) in noactiveData">{{ value.categoryName ? value.categoryName : "&nbsp;&nbsp;&nbsp;" }}</p>
      </div>

      <div class="stydys" v-for="(value,key) in noactiveData" v-if="activeBtn===key">
        <template v-for="val in value.children">
        <h2>{{ val.subjectName }}</h2>
        <li class="learnLi" v-for="item in val.courseLists">
          <div :style="setBackground(item.courseBkImage)" class="cpl-head">
            <h4 class="exam_time none"></h4>
          </div>
          <div class="cpl-main">
            <div class="li">
              <h3>{{ item.courseName }}</h3>
            </div>
            <div class="li cpl-fool">
              <div @click="openActivate(item)" class="btn btn-o">
                <span>马上激活</span>
                <div class="hide data"></div>
              </div>
            </div>
          </div>
        </li>
        </template>
      </div>
      <img class="no-data" v-show="this.sectionList && this.sectionList.length === 0 && dataState" src="../../../assets/img/404.svg"/>
	</SlideRefresh>
      <Setactivate @updateCourseState="updateCourseState" v-if="activeCour" :noactive-course="noactiveCourse" @close-me="closeMe"></Setactivate>

  </div>

</template>

<script>

import { getNoactiveCourse } from '../../../api/port';

import Setactivate from './setactivate';
import SlideRefresh from '../../../components/Comm/SlideRefresh';

export default {

  components: {
    Setactivate,
    SlideRefresh
  },

  props: [ 'courseState' ],


  data() {
      return {
	      isIpad: false,
	      isMobile: false,
	      noactiveData: {}, // 未激活课程列表
        dataState: false,
	      noactiveCourse: {},
	      activeBtn: "",
	      activeCour: false,
	      sectionList:[],
	      styleTop: 0,
      }
  },

  watch: {
   	
   	courseState(state) {

   		if(!state) {
   		  this.getDate();
   	   		console.log('noactive', state);
   		    this.$emit('changeCourseState', false);
   		}

   	},

  },

  created() {

    this.getDate();

    let fSize = parseInt(document.documentElement.style.fontSize) || 0;

		this.styleTop = fSize * 1.4;

  },


  methods: {

  	updateCourseState(state) {
  	  this.$emit('changeCourseState', state)
  	},

    // 课程的实时状态
	topStatusChange(status) {

		if(status == 'loading') {

			this.getDate();

		}

	},
	getDate() {
		let courseParams = {
	      pageNo: 1,
	      pageSize: 1000,
	      token: this.webApi.getCookie('token')
	    };
	    // 获取过期课程列表
	    getNoactiveCourse(courseParams)

	    .then(res =>{

	      if(res && res.state == 'success'){

	        if(res.data.courselist.length < 1){
            this.dataState = true;
			      return false;
			}

	        this.noactiveData = this.webApi.outCourseList(res);

	        this.sectionList.push(this.noactiveData);

	        let str = JSON.stringify(this.noactiveData);

	        this.activeBtn = str.substr(2, str.indexOf(':')-3);

          this.dataState = true;
	      }

	    })
	},
    learningNav(ind) {
      this.activeBtn = ind;
  	},
    setBackground(url) {
      return `background-image:url(${this.webApi.cdnImgUrl}${url})`
    },
    openActivate(item) {

      if(item.lock_status != 0){
          this.webApi.alert('当前的课程已锁定,续费后即可解锁！');
          return false;
      }
    	this.activeCour = true;
    	this.noactiveCourse = item;
    	document.body.style.overflow = 'hidden';
    },
    closeMe() {
    	this.activeCour = false;
    	document.body.style.overflow = 'auto';
    }
  },
  updated() {

  },
  mounted () {
     // this.topStyle = this.$refs.courseContentnoact.getBoundingClientRect().top;
  }
}

</script>

<style lang="scss" scoped>

 @import "../../../assets/style/mixin";

 .course-content{
   padding-top: 1.4rem;
 }

.learning-navL {
    line-height: 1rem;
    padding-left: 1.1rem;
    p{
      display: inline-block;
      border: 2px solid #3d4e64;
      line-height: 0.6rem;
      padding: 0 0.6rem;
      font-weight: bold;
      font-size: 0.3rem;
      color: #3d4e64;
      margin-right: 0.6rem;
    }
    .active{
      background: #3d4e64;
      color: #fff;
    }
}

.stydys{
  margin-left: 1.1rem;
  margin-top: 0.38rem;
  h2 {
      padding-bottom: 0.1rem;
      font-size: 0.26rem;
  }
}

.course-pic-list{
  li{
    margin: 0.2rem 0;
      height: 2rem;
      width: 6.9rem;
      background: #fff;
      border-bottom: 1px solid #ddd;
      position: relative;
      display: inline-block;
      border: 1px solid #d2d2d2;
      margin-right: 0.4rem;

      .cpl-head{
        background-size: 100% 100%;
        height: 100%;
        color: #fff;
        width: 2.8rem;
        float: left;
        h4{
          font-size: 0.2rem;
          padding: 0.8rem 0 0 0.16rem;
        }
      }
      .cpl-main{
        color: #606f77;
        float: left;
        width: 3.9rem;
        .li{
          padding: 0.3rem 0.3rem;
          height: 0.9rem;
          overflow: hidden;
        }
        h3{
          color: #3d4e64;
          font-size: 0.24rem;
        }
        p{
          margin: 0.05rem 0;
          font-size: 0.2rem;
        }

      }
      .cpl-main .li{
        padding: 0.3rem 0.3rem;
        height: 0.95rem;
        overflow: hidden;
      }

  }
}

.course-pic-list .progress-box {
  display: block;
  margin-top: 0.2rem;
  font-size: 0.3rem;
}
.course-pic-list .progress-box .progress {
  height: 0.07rem;
  width: 62%;
}
.course-pic-list .progress-box .progress .progress-bar {
  height: 0.07rem;
}
.progress-box {
  display: inline-block;
  white-space: nowrap;
  margin-right: 0.2rem;
}
.progress-box > * {
  display: inline-block;
  vertical-align: middle;
}
.progress-box .progress {
  height: 0.1rem;
  width: 100%;
  background: #ccc;
  border-radius: 0.05rem;
  overflow: hidden;
}
.progress-box .progress .progress-bar {
  width: 0;
  height: 0.1rem;
  background: $themeColor;
  border-radius: 0.05rem;
  transition: all 1.2s 0.8s;
}
.progress-box .progress-val {
  margin: 0 0.1rem;
  position: absolute;
}
.progress-box .progress-val ~ .progress {
  width: 75%;
}
.btn {
  font-size: 0.32rem;
  display: inline-block;
  text-align: center;
  padding: 0 0.5rem;
  border: 1px solid $themeColor;
  background: $themeColor;
  color: #fff;
  margin: auto 0.2rem;
  height: 0.6rem;
  line-height: 0.6rem;
  border-radius: 0.08rem;
}
.btn.btn-block {
  display: block;
  letter-spacing: 0.5rem;
  text-indent: 0.5rem;
}
.btn.btn-bind {
  background: #02aed9;
  letter-spacing: 0.05rem;
  text-indent: 0.05rem;
}
.btn.btn-o {
  color: $themeColor;
  background: none;
  margin:0 0.5rem;
  position:absolute;
}
.no-data{
	@extend .ab;
	@include wh(2.4rem, 2.4rem);
	left: 50%; top: 4rem;
	margin-left: -1.2rem;
}
</style>
