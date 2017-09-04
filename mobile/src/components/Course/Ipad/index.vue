<template lang="html">

    <div class="course-content course-pic-list learning">

      <div class="learning-navL">
        <p @click="learningNav(index)" v-for="(value,index) in learningData">{{ value.categoryName ? value.categoryName : "&nbsp;&nbsp;&nbsp;" }}</p>
      </div>

      <div class="stydys" v-for="(value,key) in learningData" v-if="index===key">
        <template v-for="val in value.children">
        <h2>{{ val.subjectName }}</h2>
        <li class="learnLi" data-coursename="" data-chaptername="" @click="openCourse(this,item.courseId,item.chapterId,item.subjectID,item.categoryId,item.subjectName,item.categoryName,item.versionId)" v-for="item in val.courseLists">
          <div style="background-image:url(http://cdnimg.caicui.com/upload/201604/92da0abdac4a45f5b46f9546ade771ac.jpg)" class="cpl-head">
            <h4 class="exam_time none"></h4>
            <h4 class="course_due">课程到期：{{ formatDate(item.expirationTime,"Y")+'-'+formatDate(item.expirationTime,'M')+'-'+formatDate(item.expirationTime,'D') }}</h4>
          </div>
          <div class="cpl-main">
            <div class="li">
              <h3>{{ item.courseName }}</h3>
            </div>
            <div class="li pro-li">
              <div class="progress-box">进度： 
                <div class="progress">
                  <div min="0" max="21" class="progress-bar"></div>
                </div>
                <div class="progress-val">{{ item.taskTotal }}%</div>
              </div>
            </div>
            <div class="li cpl-fool">
              <div onclick="openActivate('CMA Part I 中文 前导','QiQi Wu','吴奇奇','undefined','undefined','/upload/201606/09c9342818e24393a970aa93d25b9a4d.png','1','8a22ecb553eab1280153f36f380a007f','/upload/201604/92da0abdac4a45f5b46f9546ade771ac.jpg',this)" class="btn btn-o" style="display:none;">
                <span>马上激活</span>
                <div class="hide data"></div>
              </div>
              <div tapmode onclick="renew()" class="btn btn-o" style="display:none;">
                <span>申请重听</span>
              </div>
            </div>
          </div>
        </li>
        </template>
      </div>

    </div>
</template>

<script>
export default {
  props: {
    learningData: {
      type: Object,
      default: {}
    }
  },
  created() {
    console.log(this.learningData)
  },
  data() {
    return {
      index: 0
    }
  },

  methods: {
      learningNav(ind) {
        this.index = ind;
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
      }
  }

}
</script>

<style lang="scss" scoped>

 @import "../../../assets/style/mixin";
  .course-content{
    padding-top:1.6rem;
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
      width: 6.8rem;
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
          height: 0.95rem;
          overflow: hidden;
        }
        h3{
          color: #212121;
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
      .learnLi:before{
        content: "";
        position: absolute;
        z-index: 3;
        background: #eee;
        width: 44%;
        height: 0.03rem;
        bottom: 0.75rem;
        right: 0.7rem;
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
  background: #00a185;
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
  border: 1px solid #00a185;
  background: #00a185;
  color: #fff;
  margin: auto 0.2rem;
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
  color: #00a185;
  background: none;
  margin:0 0.5rem;
  position:absolute;
}
</style>
