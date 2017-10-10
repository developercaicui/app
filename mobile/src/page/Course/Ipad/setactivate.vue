<template lang="html">
  <div style="width: 100%;height: 100%;font-size: 0.24rem;margin: 0;">
    <div @click.stop="closeAlert" class="backdrop"></div>
    <div type="1" class="tc_box">
      <div class="noactivate_box">
        <div class="acca_box cl">
          <div :style="setBackground(noactiveCourse.courseBkImage)" class="left_box courseImg"></div>
          <div class="right_box">
            <h2 id="courseName">您正在激活的课程</h2>
            <dl class="avatar-dl"><img :src="noactiveCourse.teacherImage ? this.webApi.cdnImgUrl+noactiveCourse.teacherImage : this.webApi.cdnImgUrl+'upload/teacherImage.png'" class="avatar">
              <dt>{{ noactiveCourse.teacherName }}</dt>
              <dd>{{ noactiveCourse.teacherHonor }}</dd>
            </dl>
            <ul class="cotime">
              <li>{{ noactiveCourse.subjectName }}</li>
              <li>有效时间：{{ noactiveCourse.expirationDate }}天</li>
            </ul>
            <div @click="closeAlert" class="btn btn-o btn-back"><i class="icon-back">&#xe600;</i><span>暂不激活</span></div>
            <div @click="nextActive()" class="btn btn-o btn-go"><span>激活课程</span><i class="icon-back">&#xe600;</i></div>
          </div>
        </div>
        <div class="course_tab">
          <div class="btn-group btn-success">
            <div @click="openTab(0)" class="btn active">课程介绍</div>
            <div @click="openTab(1)" class="btn">课程详情</div>
            <div @click="openTab(2)" class="btn">课程动态</div>
          </div>
        </div>
        <div class="course_con">
          <div id="tb0" class="course_box" v-html="extendInfo.intro"></div>
          <div id="tb1" class="course_box none" v-html="extendInfo.metaDescription"></div>
          <div id="tb2" class="course_box none" v-html="extendInfo.availability"></div>
        </div>
        <div class="form_box">
          <select id="setTime" name="setTime">
            <option selected value="选择考试时间">选择考试时间</option>
            <option v-if="timeList" v-for="item in timeList" :value="item.time/1000"> {{(formatDate(item.time/1000,'Y')+'-'+formatDate(item.time/1000,'M')+'-'+formatDate(item.time/1000,'D'))}}</option>
          </select>

          <label>
            <input type="checkbox" name="agree">同意激活
          </label>
          <div class="intro">激活课程后即可正常学习，请注意，激活动作无法撤销，此课程一旦激活将在190天后失效，失效后将无法继续学习。请在有效期内合理安排学习进度。</div>
          <div @click="sure()" class="btn active_ok">激活</div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>

import $ from 'jquery';

import { getExtendInfo,timeList,courseActive } from '../../../api/port';


export default {

  props: {
    'noactive-course': {
        type: Object,
        default: {}
    }
  },

  components: {

  },

  data() {
     return {
        extendInfo: {},
        timeList: ""
     }
  },

  created() {

      let params = {
        courseId: this.noactiveCourse.courseId
      }

      getExtendInfo(params)

      .then(res =>{

        if(res && res.state == 'success'){

            this.extendInfo = res.data[0];

        }

      })

      params.token = this.webApi.getCookie('token')

      timeList(params)

      .then(res =>{

        if(res && res.state == 'success'){

            this.timeList = res.data;

        }

      })

  },

  methods: {

    openTab(a){
        $('#tb'+a).show().siblings().hide();
        $('.btn-group .btn').removeClass('active').eq(a).addClass('active');
    },
    setBackground(url) {
      return `background-image:url(${this.webApi.cdnImgUrl}${url})`
    },
    nextActive() {
        $('.tc_box').attr('type',2);
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
      //激活
      sure() {

          let data = this.noactiveCourse;

          if(!$('input[name=agree]').prop('checked')){

              this.webApi.alert('请先同意激活');

              return false;
          }

          if(!this.webApi.isEmpty(this.timeList)){

              if ($.trim($('select[name=setTime]').val()) == '选择考试时间'){

                  this.webApi.alert("选择考试时间");

              }else{

                  this.do_active(data);

              }

          }else{

              this.do_active(data);

          }

      },
      do_active(data) {

          let param = {};
          param.courseId = data.courseId;
          param.token = this.webApi.getCookie('token');
          if(data.isU == "2"){
            param.isU = true;
          }else{
            param.isU = false;
          }
          param.orderItemId = data.orderID_item_id;
          let Ttime = $.trim($("#setTime")[0].value);
          param.examTime = this.formatDate(Ttime,'Y')+'-'+this.formatDate(Ttime,'M')+'-'+this.formatDate(Ttime,'D')+' '+this.formatDate(Ttime,'h')+':'+this.formatDate(Ttime,'m')+':'+this.formatDate(Ttime,'s');

          this.webApi.loadingData('激活中');

          courseActive(param)

          .then(res =>{

            if(res && res.state == 'success'){

                this.webApi.closeLoadingData();

                this.webApi.alert('课程激活成功!');

                setTimeout(() => {
                    location.reload();
                },2000)


            }else{
                this.webApi.alert('激活失败，请重试！')
            }

          })

      },
      closeAlert(ev) {
          this.$emit('close-me');
      }
  },
  updated() {

  },
  mounted () {
  // console.log(JSON.stringify(this.noactiveCourse))


  }
}

</script>

<style lang="scss" scoped>

  @import "../../../assets/style/mixin";

.icon-back{
  font-family:"iconfont";
  font-size:0.26rem;
  font-weight: 700;
  color: $themeColor;
  speak: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 100%;
  vertical-align: middle;
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  z-index: 11;
}
.backdrop.opacity {
  background: rgba(0,0,0,0);
}
.backdrop.video-bg {
  background: rgba(50,50,50,0.2);
}
.backdrop.whitedrop {
  background: #fff;
}

.avatar-dl {
  position: relative;
  padding-left: 1rem;
  margin: 0.2rem 0;
  height: 0.7rem;
}
.avatar-dl .avatar {
  position: absolute;
  left: 0;
  width: 0.7rem;
  height: 0.7rem;
}
.avatar-dl dt {
  margin-bottom: 0.1rem;
}
.avatar-dl dd {
  opacity: 0.7;
  color: #999;
}
.cotime li {
  font-size: 0.25rem;
  font-weight: normal;
  color: #999;
}
.form_box {
  padding: 0.3rem;
  margin-top: 0.5rem;
  border-top: 1px solid #ddd;
}
.form_box select {
  margin: 0.3rem 0;
  width: 100%;
  height: 0.8rem;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 0;
  font-size: 0.28rem;
  -webkit-appearance: menulist;
}
.form_box label {
  display: block;
  margin: 0.4rem 0;
}
.form_box label input {
  margin-right: 0.1rem;
  appearance: checkbox;
}
.form_box .intro {
  font-size: 0.28rem;
  line-height: 0.4rem;
  color: #999;
  text-align: center;
  margin: 2.5rem 3rem 0 3rem;
}
.form_box .active_ok {
  position: absolute;
  bottom: 0;
  left: -0.2rem;
  width: 100%;
  border-radius: 0 0 0.1rem 0.1rem;
  height: 1rem;
  padding-top: 0.2rem;
}

.tc_box {
  position: absolute;
  width: 14rem;
  height: 12rem;
  left: 50%;
  top: 50%;
  background: #fff;
  border-radius: 0.15rem;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  z-index:12
}
.tc_box[type="1"] .form_box,
.tc_box[type="1"] .btn-back {
  display: none;
}
.tc_box[type="2"] .course_tab,
.tc_box[type="2"] .course_con,
.tc_box[type="2"] .btn-go {
  display: none;
}
.tc_box .icon-back {
  margin: 0 0.2rem 0 0;
}
.tc_box .btn-go i {
  display: inline-block;
  margin: 0 0 0.1rem 0.2rem;
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
}
.noactivate_box {
  background: #fff;
  border-radius: 0.15rem;
}
.noactivate_box .acca_box {
  height: 3.4rem;
  margin: 0.27rem 0.27rem 0 0.27rem;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
}
.noactivate_box .acca_box .left_box {
  width: 5rem;
  height: 3.4rem;
  background-size: 100% 100%;
}
.noactivate_box .acca_box .right_box {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  padding-left: 0.25rem;
}
.noactivate_box .acca_box .right_box .grey_box {
  color: #999;
}
.noactivate_box .acca_box .right_box h2 {
  font-size: 0.32rem;
  height: 0.7rem;
  overflow: hidden;
  line-height: 0.35rem;
}
.noactivate_box .acca_box .right_box ul {
  margin: 0.2rem 0;
}
.noactivate_box .acca_box .right_box .btn {
  margin: 0.2rem 0 0 0;
}
.noactivate_box .course_con {
  font-size: 0.28rem;
  color: #000;
  border-top: 1px solid #bcbaba;
  position: relative;
  line-height: 2;

}
.noactivate_box .course_con .course_box {
  height: 6.1rem;
  overflow: auto;
  padding: 0 0.45rem 0 0.27rem;
  margin: 0.32rem 0.07rem 0 0;
}
.noactivate_box .course_con .course_box p {
  margin: 0.5rem 0;
  line-height: 140%;
}
.course_tab {
  text-align: center;
  padding: 0.4rem;
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
.cl {
  clear: both;
}
li {
  list-style-type: none;
}
.hide,
.none {
  display: none;
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
}
.btn-group {
  display: inline-table;
}
.btn-group .btn {
  display: table-cell;
  color: #9b9b9b;
  border: 1px solid #9b9b9b;
  background: none;
  font-size: 0.3rem;
  height: 0.64rem;
  line-height: 0.64rem;
  /* padding: 0 0.5rem; */
  /* margin: 0; */
  border-radius: 0;
}
.btn-group .btn.active {
  color: #fff !important;
  background: #9b9b9b;
}
.btn-group .btn:first-child {
  border-radius: 0.1rem 0 0 0.1rem;
}
.btn-group .btn:last-child {
  border-radius: 0 0.1rem 0.1rem 0;
}
.btn-group .btn:not(:last-child) {
  border-right: 0;
}
.btn-group.btn-success .btn {
  color: $themeColor;
  border: 1px solid $themeColor;
}
.btn-group.btn-success .btn.active {
  background: $themeColor;
}

</style>
