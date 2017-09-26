<template lang="html">

  <div class="course-content course-pic-list learning" ref="courseContentover">
  <SlideRefresh @top-status-change="topStatusChange">
    <div class="learning-navL">
        <p :class="[(activeBtn==index)?'active':'']" @touchend="learningNav(index)" v-for="(value,index) in overdueData">{{ value.categoryName ? value.categoryName : "&nbsp;&nbsp;&nbsp;" }}</p>
      </div>

      <div class="stydys" v-for="(value,key) in overdueData" v-if="activeBtn===key">
        <template v-for="val in value.children">
          <h2>{{ val.subjectName }}</h2>
          <li class="learnLi" data-coursename="" data-chaptername="" v-for="item in val.courseLists">
            <div :style="setBackground(item.courseBkImage)" class="cpl-head">
              <h4 class="exam_time none"></h4>
              <h4 class="course_due">课程到期：{{ formatDate(item.expirationTime,"Y")+'-'+formatDate(item.expirationTime,'M')+'-'+formatDate(item.expirationTime,'D') }}</h4>
            </div>
            <div class="cpl-main">
              <div class="li">
                <h3>{{ item.courseName }}</h3>
              </div>
              <div class="li cpl-fool">
                <div @click="renew(item.isU)" class="btn btn-o">
                  <span>申请重听</span>
                </div>
              </div>
            </div>
          </li>
        </template>
      </div>
      <img class="no-data" v-show="this.sectionList && this.sectionList.length === 0" src="../../../assets/img/404.svg"/>
      </SlideRefresh>
  </div>

</template>

<script>

import { getOverdueCourse } from '../../../api/port';
import SlideRefresh from '../../../components/Comm/SlideRefresh';

export default {

  components: {
      SlideRefresh
    },

  data() {
      return {
      isIpad: false,
      isMobile: false,
      overdueData: {}, // 在学课程列表
      activeBtn: "",
      sectionList:[],
      }
  },

  created() {

    this.getDate()

  },

methods: {
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
    getOverdueCourse(courseParams)

    .then(res =>{

      if(res && res.state == 'success'){

          if(res.data.courselist.length < 1){
              return false;
          }

          this.overdueData = this.webApi.outCourseList(res);

          this.sectionList.push(this.overdueData);

          let str = JSON.stringify(this.overdueData);

          this.activeBtn = str.substr(2, str.indexOf(':')-3);

      }

    })
  },
  learningNav(ind) {
      this.activeBtn = ind;
  },
  formatDate(now, t) {
      let date = new Date(parseInt(now * 1000));
      let Y,M,D,h,m,s;
      if (t == 'Y') {
          Y = date.getFullYear();
          return Y;
      }
      if (t == 'M') {
          M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
          return M;
      }
      if (t == 'D') {
          D = date.getDate();
          return this.extra(D);
      }
      if (t == 'h') {
          h = date.getHours();
          return this.extra(h);
      }
      if (t == 'm') {
          m = date.getMinutes();
          return this.extra(m);
      }
      if (t == 's') {
          s = date.getSeconds();
          return this.extra(s);
      }
    },
     //补位函数。
    extra(x) {
        //如果传入数字小于10，数字前补一位0。
        if (parseInt(x) < 10) {
          return "0" + parseInt(x);
        } else {
          return x;
        }
    },
    setBackground(url) {
      return `background-image:url(${this.webApi.cdnImgUrl}${url})`
    },
    renew(isU) {

        if(isU == true){

            g.torenew('http://www.caicui.com/mc/examReport/add?token='+this.webApi.getCookie('token'))
           
        }else{

            this.webApi.alert("只有U+课程可以免费申请重听！")

        }

    }
  },
  updated() {

  },
  mounted () {

  }
}

</script>

<style lang="scss" scoped>
@import "../../../assets/style/mixin";
.course-content{
    padding-top:1.4rem;
    min-height: 15rem;
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
  min-height: fill-available;
  min-height: -webkit-fill-available;
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
  background: #ff366d;
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
  border: 1px solid #ff366d;
  background: #ff366d;
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
  color: #ff366d;
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
