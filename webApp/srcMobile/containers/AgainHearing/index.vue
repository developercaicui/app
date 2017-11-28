<template lang="html">

  <div class="again-hearing-wrap">

    <header class="head">
      <a href="javascript:;" class="iconfont icon-article-back"></a>
      <span>申请重听</span>
    </header>

    <div class="form-data">

      <label @click="openSelectExamState">
        <span>考试状态</span>
        <input type="text" readonly="readonly" data-type="examState" v-model="examState" placeholder="请选择考试状态">
        <a href="javascript:;" class="iconfont icon-jiantou-copy-copy"></a>
      </label>

      <label @click="handleSelectTime('notPass', $event)">
        <span>未通过考试时间</span>
        <input type="text" data-type="notPass" readonly="readonly" v-model="notPass" placeholder="请选择未通过考试时间">
        <a href="javascript:;" class="iconfont icon-jiantou-copy-copy"></a>
      </label>

      <label>
        <span>分数</span>
        <input type="number" placeholder="点击输入" value="">
      </label>

      <label @click="handleSelectTime('nextTime', $event)">
        <span>下次考试时间</span>
        <input type="text" data-type="nextTime" readonly="readonly" v-model="nextTime" placeholder="请选择下次考试时间">
        <a href="javascript:;" class="iconfont icon-jiantou-copy-copy"></a>
      </label>

    </div>

    <article class="info">

      <div class="upload-pic">
        <a href="javascript:;" @click="handleUploadBtn">+</a>
        <h1>添加附件</h1>
        <h2>上传图片请小于5M</h2>
        <div class="pic-show" v-show="isShowPic">
          <img src="" ref="picShow" />
          <a href="javascript:;"class="iconfont icon-guanbi" @click="handleCancelUpload"></a>
        </div>
      </div>

      <section class="help-info">
        <h1>扫描件上传须知:</h1>
        <p>
1、请务必上传原始考试成绩截图或文件，不得涂改。<br/>
2、ACCA证书请务必上传ACCA官网成绩查询页面截图或官方发的短信、邮件截图；需要能显示姓名，ACCA会员号，科目，分数或缺考信息。<br/>
3、CFA证书、CMA证书、CIMA证书、FRM证书CPA证书请务必上传官方下载的截图或官方发的短信、邮件截图。
        </p>
      </section>

      <a href="javascript:;" class="reset-primary">提交申请</a>

    </article>


    <mt-actionsheet
      :actions="examStateList"
      v-model="iSstateVisible">
    </mt-actionsheet>

    <mt-datetime-picker
      ref="mtDatetimePicker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleChooseGood">
    </mt-datetime-picker>

    <input type="file" accept="image/*" @change="changeLoadPicture" ref="iptFile" class="ipt-file">

  </div>


</template>

<script type="text/ecmascript-6">

import { fileUpload } from 'IpadApi/port';

export default {

  components: {
  },

  data() {
    return {
      selectTimeType: '',
      nextTime: '',
      notPass: '',
      iSstateVisible: false,
      examStateList: [],
      examState: '',
      isShowPic: false
    }
  },

  created() {

  },

  mounted() {

    let SelectExamState = ({name: name}, index) =>{
      this.examState = name;
    }

    this.examStateList = [{
      name: '报名未考试',
      method: SelectExamState
    },{
      name: '考试未通过',
      method: SelectExamState
    }];

  },

  methods: {

    handleUploadBtn() {
    	this.$refs.iptFile.click();
		},

    handleCancelUpload() {
      this.isShowPic = false;
    },

    changeLoadPicture(ev) {

      let file = this.$refs.iptFile.files;

      if(file.length > 1) {
        this.webApi.alert('抱歉，图片最多只可上传1张！');
        return;
      }


      let fileData = file[0];
      let reader = new FileReader();

      reader.readAsDataURL(fileData);

      reader.onload = (evt) =>{

        this.$refs.picShow.setAttribute('src', evt.target.result);
        this.isShowPic = true;

      }


    },

    handleSelectTime(type) {
      this.selectTimeType = type;
      this.$refs.mtDatetimePicker.open();
    },

    openSelectExamState() {
      this.iSstateVisible = true;
    },

    handleChooseGood(time) {

      let _date = new Date(time);

      this.$refs.mtDatetimePicker.close();
      this.$el.querySelectorAll(`input[data-type='${this.selectTimeType}']`)[0].dataset.time= time;
      this[this.selectTimeType] = `${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate()}`;

    }

  }

}
</script>

<style lang="scss" scoped>

 @import "../../assets/style/mixin";

 .ipt-file{
   @extend .ab;
   left: 1rem; top: 5rem;
   @include wh(0, 0);
   overflow: hidden;
   left: -99rem; top: -99rem;
 }

 .pic-show{
   @extend .ab;
   @include wh(3.3rem, 1.9rem);
   left: 50%;
   transform: translate3d(-50%, -1.85rem, 0);
   z-index: 11;
   img{
     width: 100%; height: 100%;
   }
   a{
     @extend .ab;
     @include wh(.5rem, .5rem);
     @extend .flexCenter;
     top: 0; right: 0;
     background-color: rgba(0,0,0, .6);
     border-top-left-radius: 4px;
     border-bottom-left-radius: 4px;
     &:before{
       @include fc(.28rem, #fff);
     }
   }
 }

 .again-hearing-wrap{
   font-size: 0; line-height: 1;
 }

 .info{
   border-top: 10px solid #f2f2f2;
 }

 .help-info{
   margin: .4rem .3rem;
   line-height: 1.6;
   h1{
     margin-bottom: .1rem;
   }
   h1, p{
     @include fc(.26rem, #666);
   }
 }

 .upload-pic{
   border: 1px dashed #B7B7B7;
   margin: .3rem .46rem;
   height: 2.3rem;
   color: #999;
   h1, h2{
     text-align: center;
   }
   > a{
     @extend .show;
     @include fc(.6rem, #999);
     @include wh(.9rem, .9rem);
     margin: .2rem auto 0; line-height: .8rem;
     text-align: center;
     border-radius: 100%;
     border: 1px dashed #B7B7B7;
   }

   h1{
     font-size: .3rem;
     margin-top: .22rem;
     margin-bottom: .12rem;
   }
   h2{
     font-size: .24rem;
   }
 }

 .form-data{

    label{
      @include fc(.3rem, #666);
      display: flex; height: 1rem;
      border-bottom: 1px solid #EDEDED;
      justify-content: center;
      align-items: center;
      span{
        width: 2.5rem;
        display: inline-block;
      }
      input{
        @include wh(4rem, 100%);
        display: inline-block;
        background-color: rgba(0,0,0,0);
      }
      a{
        display: inline-block;
        @include fc(.28rem, #CECECE);
      }
      &:nth-of-type(3){
        input{
          width: 4.2rem;
        }
      }
    }

 }

 .head{

   text-align: center;
   height: .9rem;
   @extend .flexCenter;
   border-bottom: 1px solid #f3f3f3;

   span{
     @include fc($headerSize, #202020);
   }
   a{
     @extend .ab;
     @include wh(.9rem, .9rem);
     @include fc(.36rem, $themeColor);
     @extend .flexCenter;
     &:nth-of-type(1){
       left: 0;
     }
     &:nth-of-type(2){
       right: 0;
     }
   }

 }

 .reset-primary{
   height: .9rem;
   @extend .flexCenter;
   @include fc(.34rem, #fff);
   background-color: $themeColor;
   margin: .3rem; border-radius: 4px;
 }

</style>
