<template lang="html">

  <main class="course-list-wrap">

    <div class="title">
      <h1>在学课程</h1>
      <router-link to="/course/learning" class="iconfont text-move">MORE&nbsp;</router-link>
    </div>

    <section @click="handleSendCouseInfo" class="list" v-for="item, index in list" :data-data="JSON.stringify(item)" v-if="index < 2">

			<div class="info">
				<h1>{{ item.courseName }}</h1>
				<time><span>有效期至：</span>{{ item.expirationTime }}</time>
			</div>
			<div class="process-text">
				<div class="num"><span :data-num="item.studyProportion">{{ item.studyProportion }}</span>%</div>
				<aside>学习进度</aside>
			</div>
      <div class="progress"><span :data-process="item.studyProportion"></span></div>

    </section>

    <section class="list-no-data" v-show="list.length === 0 && isRequest">
      <h1>您还没有课程</h1>
      <router-link to="/course/learning">开始新课程</router-link>
    </section>

  </main>

</template>

<script type="text/ecmascript-6">

import { mapGetters, mapActions } from 'vuex';

export default {

  props: {
    isUpdateList: {
       type: Boolean,
       default: false
    }
  },

  data() {
    return {
      list: [],
      isRequest: false,
    }
  },

  computed: {

    ...mapGetters([
      'getCourseList'
    ]),

  },

  watch: {

    isUpdateList(flag) {
      flag && this.fetchCourseList({isLoad: true});
    },

    getCourseList(arr) {

      this.list = arr;
      this.isRequest = true;

      setTimeout(() =>{

        const DIFF_NUM =  document.querySelectorAll('.progress')[0].offsetWidth / 100;
        let oSpan =  document.querySelectorAll('.progress span');

        oSpan.forEach(obj =>{
          obj.style.width = `${ obj.dataset.process * DIFF_NUM }px`;
        });

      },300);

    }

  },

  created() {
    this.getCourseList.length != 0 ? this.list = this.getCourseList : this.fetchCourseList({isLoad: false}) ;
  },

  methods: {

    ...mapActions([
      'fetchCourseList'
    ]),

    handleSendCouseInfo(ev) {

      let oSection = this.webApi.recursiveParentNode(ev.target, 'section');
			let data = JSON.parse(oSection.dataset.data);

			if(data.lockStatus && data.lockStatus != 0 ){
				this.webApi.alert('当前的课程已锁定,续费后即可解锁！');
				return false;
			}

			g.targetLearningCourses(oA.dataset.data);
    },

  }


}
</script>

<style lang="scss" scoped>

@import "../../../assets/style/mixin";

.course-list-wrap{

   @extend .relative;
   transition: .3s;

  .title{
    position: relative;
    @include fc(.3rem, #333);
    border-left: .05rem solid $themeColor;
    margin: .3rem;
    padding-left: .16rem; height: .3rem; line-height: 1;
    a{
      @extend .ab; right: 0; top: 0;
      @include fc(.24rem, #999);
      &:after{
        content: "\e66e";
      }
    }
  }


  .list, .list-no-data{

    @extend .relative;
    @extend .show;
    height: 3rem; padding: .35rem;
    @extend .borderBox;
    background-color: #4a90e2;

  }

  .list{
    margin-bottom: .1rem;
    &:nth-of-type(1){
      background: url('../../../assets/img/index_course_back1.jpg') no-repeat center center;
      background-size: 100% 3rem;
    }
    &:nth-of-type(2){
      background: url('../../../assets/img/index_course_back2.jpg') no-repeat center center;
      background-size: 100% 3rem;
      margin-bottom: .2rem;
    }
  }

  .list-no-data{

    height: 1.6rem;
    background: url('../../../assets/img/index_course_no_data.jpg') no-repeat center center;
    background-size: 100% 2.3rem;

    h1{
      @include fc(.28rem, #666);
      text-align: center;
      transform: translate3d(0,-.18rem,0);
    }

    a{
      @include wh(2.7rem, .6rem);
      @include fc(.32rem, #fff);
      @extend .flexCenter;
      margin-left: 50%;
      transform: translate3d(-50%,0,0);
      border-top-left-radius: .2rem;
      border-bottom-right-radius: .2rem;
      background-color: $themeColor;
    }
  }

  .info{

    h1{
      @include fc(.32rem, #fff);
      padding-right: 1rem; line-height: 1.5;
      margin-bottom: .3rem
    }

    time{
      @include fc(.26rem, #fff);
    }

  }

  .process-text{

    @extend .ab;
    right: .7rem; bottom: .9rem;

    .num{
      @include fc(.3rem, #fff);
      text-align: center; margin-bottom: .1rem;
      span {
        font-size: .6rem;
      }
    }

    aside{
      @include fc(.28rem, #fff);
    }

  }

  .progress{
    @extend .ab;
    @include wh(6.5rem, .06rem);
    background-color: rgba(255, 255, 255, .8);
    left: .4rem; bottom: .6rem;
    span{
      @extend .show;
      @include wh(0px, .06rem);
      background-color: $themeColor;
      transition: .5s;
    }
  }


}

</style>
