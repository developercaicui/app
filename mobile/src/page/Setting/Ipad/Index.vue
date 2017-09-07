<template lang="html">
	<div class="set-info-modal" v-if="isShow">
		<div class="backdrop"></div>
	      <div id="mask0" class="modal">
	        <div @click="guanbi" class="set_tit">设置<i class="icon-close icon-guanbi">&#xe642;</i></div>
	        <ul @click="modify" class="user-info">
	          <li>
	            <div class="left"><img class="avatar"><span class="user_nick"></span></div>
	            <div class="right"><i class="icon-jiantou icon-arrow-right">&#xe619;</i></div>
	          </li>
	        </ul>
	        <ul>
	          <li>
	            <div class="left">学习提醒</div>
	            <div class="right">
	              <div class="on-off public_box"></div>
	            </div>
	          </li>
	          <li id="setTime" @click="setTime">
              <div class="left">提醒时间</div>
              <div id="timeArea" class="right">19:30</div>
            </li>
	          <li class="cl chekquality" @click="chekquality">
	            <div class="left">视频质量</div>
	            <div class="right quality">普通</div>
	          </li>
	          <!--li.cl,onclick="clearCache()")
	          //.left 清理杂项缓存
	          //.right.cache
	          -->
	        </ul>
	        <ul>
	          <li @click="feedback">
	            <div class="left">意见反馈</div>
	            <div class="right"><i class="icon-jiantou icon-arrow-right">&#xe619;</i></div>
	          </li>
	          <li @click="showAbout">
	            <div class="left">关于财萃</div>
	            <div class="right"><i class="icon-jiantou icon-arrow-right">&#xe619;</i></div>
	          </li>
	        </ul>
	        <ul class="logout" @click="logout">
	          <li>
	            <div class="left">退出登录</div>
	          </li>
	        </ul>
	        <div class="exit hide">
	          <div class="exit_choice">
	            <div class="exit_cur">你确定要退出吗？</div>
	            <div class="ok_cancel cl">
	              <div class="cancel" @click="cancel">取消</div>
	              <div @click="out" class="ok">确定</div>
	            </div>
	          </div>
	        </div>
	      </div>
	      <div id="mask" class="modal">
	        <!--头部-->
	        <div class="set_tit">
	          <div @click="closeIndex" class="icon-jiantou2 icon-arrow-left">&#xe669;</div><span>您的意见我会虚心接受的</span>
	          <div class="right">
	            <div @click="sub" class="send_btn">发送</div>
	          </div>
	        </div>
	        <div id="pop-radios" class="pop-radios">
	        	<a href="javascript:;" class="pop-radio-label active"><span class="pop-radio"><span class="pop-radio-round"></span></span><span class="pop-radio-span">视频课程问题</span></a>          
	        	<a href="javascript:;" class="pop-radio-label"><span class="pop-radio"><span class="pop-radio-round"></span></span><span class="pop-radio-span">学习中心问题</span></a>          
	        	<a href="javascript:;" class="pop-radio-label"><span class="pop-radio"><span class="pop-radio-round"></span></span><span class="pop-radio-span">试题报错</span></a>          
	        	<a href="javascript:;" class="pop-radio-label"><span class="pop-radio"><span class="pop-radio-round"></span></span><span class="pop-radio-span">新版建议</span></a>          
	        	<a href="javascript:;" class="pop-radio-label"><span class="pop-radio"><span class="pop-radio-round"></span></span><span class="pop-radio-span">投诉学服</span></a>
	        </div>
	        <ul>
	          <textarea id="textarea" name="content" placeholder="亲爱的同学：小财非常欢迎你向小财反馈产品的意见建议和体验感受。我们一定会认真调整，及时反馈。根据你的建议，不断完善和优化我们的产品，为你提供更舒适的学习体验。"></textarea>
	        </ul>
	        <div class="pop-tel">联系方式
	          <input type="text" class="pop-input-tel">
	        </div>
	      </div>
	      <div id="mask2" class="modal">
	        <!--头部-->
	        <div class="set_tit">
	          <div id="mask2-back" @click="closeIndex" class="icon-jiantou2 icon-arrow-left">&#xe669;</div><span>关于财萃课堂</span>
	        </div>
	        <div class="erweima">
	          <div class="bb"><img src="../../../assets/img/logocircle.png">
	            <p class="about_title">财萃课堂</p>
	            <p class="about_words">版本号：<span id="vers">3.1.1</span>copyright@caicui.com</p>

	          </div>
	          <div class="wx none"><img src="../../../assets/img/erweima.jpg">
	            <p class="about_title">财萃课堂</p>
	            <p class="about_words">微信号：caicuiacca</p>
	          </div>
	        </div>
	        <ul class="list">
	          <!--li,onclick = 'openurl("http://www.caicui.com/")')-->
	          <!--    span 官方网站-->
	          <li @click="togWx"><span>微信公众号</span></li>
	          <li onclick="openurl(&quot;http://weibo.com/icaicui&quot;)"><span>官方微博</span></li>
	          <li onclick="update()" class="update none"><span>在线升级</span></li>
	          <li onclick="praise()" class="none"><span>给财萃课堂好评</span></li>
	        </ul>
	      </div>
	      <div id="mask3" class="modal">
	        <!--头部-->
	        <div class="set_tit">
	          <div @click="closeIndex" class="icon-jiantou2 icon-arrow-left">&#xe669;</div><span>视频质量</span>
	        </div>
	        <ul class="list sel_quality">
	          <li class="active" @click="selquality">
	            <div class="left">标清</div>
	            <div class="right"><i class="icon-duigou4 icon-check">&#xe654;</i></div>
	          </li>
	          <li @click="selquality">
	            <div class="left">高清</div>
	            <div class="right"><i class="icon-duigou4 icon-check">&#xe654;</i></div>
	          </li>
	        </ul>
	      </div>
        <template>
          <mt-datetime-picker
            ref="picker"
            type="time"
            v-model="pickerValue" @confirm="handleConfirm">
          </mt-datetime-picker>
        </template>
	</div>

</template>

<script>

import jquery  from 'jquery';
import { getUserInfo,loginout,complaintOpinion} from '../../../api/port';


export default {

	data() {
	    return {
	    	isShow: true,
	    	is_ok: true
	    }
	},

	created() {
    $('body').css("background","rgba(0,0,0,0)");
		$('body').attr('show', 'index');

		getUserInfo({'token':this.webApi.getCookie('token')})

		.then(res =>{

	      if(res && res.state == 'success'){
	            
	          if(res.data.mobile){
                  $(".pop-input-tel").val(res.data.mobile)
              }else{
                  $(".pop-input-tel").val(res.data.email)
              } 
	            
	      }

	    })

	     
          // $('#pop-radios .pop-radio-label').on('click', function () {
          //     $(this).addClass('active').siblings().removeClass('active');
          // });
	},

	updated() {


	},

	components: {
    
  	},

	methods: {
		modify() {
          alert("打开基本信息页")
      	},
      	//投诉类型
      	selecType(ev) {
      		ev.target.classList.add("active")
      	},
      	//视频质量
      	chekquality() {
      		$('body').attr('show', 'video');
      	},
      	selquality(ev) {
      		let quality = ev.target.innerText;
          	$('.chekquality').find('.quality').html(quality);
          	$('body').attr('show','index');
      	},
      	//意见反馈
      	feedback() {
      		$('body').attr('show','feedback');
      	},
      	//关于财萃
      	showAbout() {
      		$('body').attr('show','about');
          	$('.erweima').removeClass('xswx');
      	},
      	//微信公众号
      	togWx() {
          $('.erweima').toggleClass('xswx');
      	},
      	//退出登录
      	logout() {
           $('.exit').removeClass('hide');
      	},
      	//取消退出登录
      	cancel() {
           $('.exit').addClass('hide');
      	},
        closeIndex() {
          $('body').attr('show','index');
        },
      	out() {//退出登录

      		loginout({"token":this.webApi.getCookie('token')})

      		.then(res =>{

	            set.clickLoginLaunch("out")

	        })
      	},
        guanbi() {
          console.log("111")
           // this.isShow = !this.isShow;
           set.clickSetBack("lll");
        },
        setTime() {//选择时间提醒

          this.$refs.picker.open();

        },
        handleConfirm(time) {
          $('#timeArea').html(time);
        },
      	sub() {
	        let content = $.trim($('textarea[name=content]').val());
	        if (content == '') {
	            this.webApi.alert('意见内容不能为空');
	            return false;
	        }
	        //let title=content.substr(0,20);
	        let nickName = JSON.parse(this.webApi.getCookie("userInfo")).nickName;
	        let param = {};
	        let systype = "ios";
	        param.memberId = JSON.parse(this.webApi.getCookie("userInfo")).memberId;//投诉人id
	        param.memberName = nickName;//投诉人昵称
	        param.cmptType = $(".pop-radio-label.active").find(".pop-radio-span").text();//投诉类型
	        param.cmptContent = content;//投诉内容
	        param.contactWay = $(".pop-input-tel").val();//联系方式
	        param.deviceDesc = systype;//设备描述
	        // api.showProgress({
	        //     title: '发表中',
	        //     modal: true
	        // });
	        this.webApi.loadingData();

	        if (this.is_ok) {
	            this.is_ok = false;
	            complaintOpinion(param)

	            .then(res =>{

	               this.webApi.closeLoadingData();

		           if (res && res.state == 'success') {

	                    this.webApi.alert('发表成功');

	                    setTimeout(function () {
	                        this.isShow = !this.isShow
	                    }, 600);

	                } else {
	                    this.is_ok = true;
	                    // this.webApi.alert('发表失败，请重试！');
	                    this.webApi.alert(res.msg);
	                }

		        })
	          
	        }
	      }
	},
	mounted() {

  	  	let that = this;
	  	let is_notice;
	  	let nickName = JSON.parse(this.webApi.getCookie("userInfo")).nickName;
      	let avatar = this.webApi.cdnImgUrl + JSON.parse(this.webApi.getCookie("userInfo")).avatar;
  
      	$('.user_nick').html(nickName);
      	$('.avatar').attr('src', avatar+'?s='+Math.random());
  
      	let notice = this.webApi.isEmpty(this.webApi.getCookie('open_notice')) ? 0 : this.webApi.getCookie('open_notice');
     	// $(this).addClass('private_box').removeClass('public_box');
      	if (notice == 1) {
          	$('.on-off').addClass('public_box').removeClass('private_box');
          	let newTimer = this.webApi.getCookie('notice_time');
          	let val = this.webApi.isEmpty(newTimer) ? '19:30' : newTimer;
          	// clearInterval(push_timer);
          	$('#setTime').removeClass('none');
          	$('#timeArea').html(val);
	
          	// init_push();

          	is_notice = 1;
      	} else {
          	$('#timeArea').html('19:30');
          	$('#setTime').addClass('none');
          	$('.on-off').addClass('private_box').removeClass('public_box');
          	// clearInterval(push_timer);
          	is_notice = 0;
      	}


		//投诉类型
      	$('#pop-radios .pop-radio-label').on('click', function () {
          	$(this).addClass('active').siblings().removeClass('active');
      	});

      	//学习提醒开关
      	$('.on-off').on('click', function () {
          if ($(this).hasClass('public_box')) {//关闭
              $(this).addClass('private_box').removeClass('public_box');
              // clearInterval(push_timer);
              $('#timeArea').parent().addClass('none');
              $('#setTime').addClass('none');
              is_notice = 0;
              that.webApi.setCookie('open_notice',0);
              that.webApi.setCookie('notice_time','');
          }
          else {//开启
              let newTimer = that.webApi.getCookie('notice_time');
              let val = that.webApi.isEmpty(newTimer) ? '19:30' : newTimer;
              $(this).addClass('public_box').removeClass('private_box');
              // clearInterval(push_timer);
              $('#setTime').removeClass('none');
              $('#timeArea').html(val).parent().removeClass('none');
              that.webApi.setCookie('open_notice', 1);

              // init_push();

              is_notice = 1;
          }
          that.webApi.setCookie('is_notice', is_notice);
      	});

      	let chekquality;
      
        $('#mask3 li').on('click', function () {
	          let quality = $(this).find('.left').html();
	          that.webApi.setCookie('quality', quality);
	          $('.chekquality').find('.quality').html(quality);
	          $('body').attr('show','index');
	          $(this).addClass('active').siblings().removeClass('active');
        });


	}

}

</script>

<style lang="scss" scoped>

@import "../../../assets/style/mixin";

.icon-guanbi{
  font-family:"iconfont";
  font-size:0.26rem;
  font-weight: 700;
  speak: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 100%;
  vertical-align: middle;
}
.icon-jiantou,.icon-jiantou2{
  font-family:"iconfont";
  font-size:0.3rem;
  font-weight: 700;
  speak: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 100%;
  vertical-align: middle;
}
.icon-duigou4{
  font-family:"iconfont";
  font-size:0.3rem;
  font-weight: 700;
  speak: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 100%;
  vertical-align: middle;
}
.none{display:none;}
.left{float: left;}
.right {float: right;}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  z-index: 2;
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
body[show='index'] {
  overflow-x: hidden;
}
body[show='index'] #mask0 {
  opacity: 1;
  -webkit-transform: translate(-50%, -50%);
}
body[show='video'] {
  overflow-x: hidden;
}
body[show='video'] #mask0 {
  -webkit-transform: translate(-250%, -50%);
}
body[show='video'] #mask3 {
  opacity: 1;
  -webkit-transform: translate(-50%, -50%);
}
body[show='feedback'] {
  overflow-x: hidden;
}
body[show='feedback'] #mask0 {
  -webkit-transform: translate(-250%, -50%);
}
body[show='feedback'] #mask {
  opacity: 1;
  -webkit-transform: translate(-50%, -50%);
}
body[show='about'] {
  overflow-x: hidden;
}
body[show='about'] #mask0 {
  -webkit-transform: translate(-250%, -50%);
}
body[show='about'] #mask2 {
  opacity: 1;
  -webkit-transform: translate(-50%, -50%);
}
.set-info-modal {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.modal {
  width: 13rem;
  height: 11rem;
  font-size: 0.3rem;
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 0;
  -webkit-transform: translate(50%, -50%);
  z-index: 3;
  border-radius: 7px;
  background: #f3f3f3;
  overflow: hidden;
}
.modal .avatar {
  width: 0.7rem;
  height: 0.7rem;
  vertical-align: middle;
  margin-right: 0.4rem;
}
.modal .user_nick {
  color: #494949;
  font-size: 0.34rem;
  font-weight: bold;
}
.modal ul {
  margin: 0.25rem;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 0.12rem;
  line-height: 0.9rem;
}
.modal ul.user-info {
  line-height: 1.1rem;
}
.modal ul li {
  padding: 0 0.3rem;
}
.modal ul li:not(:last-child) {
  border-bottom: 1px solid #ddd;
}
.modal ul li:after {
  content: '';
  display: table;
  clear: both;
}
.modal ul li .right {
  font-size: 0.26rem;
  color: #494949;
}
.modal ul li .icon-check {
  color: #01a185;
  font-size: 0.4rem;
  display: none;
}
.modal ul li.active .icon-check {
  display: inline-block;
}
.modal .logout {
  color: #f00;
}
.modal input {
  margin-right: -0.55rem;
}
.modal .on-off {
  width: 1.3rem;
  height: 0.6rem;
  border-radius: 20px;
  margin: 0.12rem 0 0 0;
  position: relative;
  transition: all 0.3s;
}
.modal .on-off:before {
  content: '';
  position: absolute;
  top: 0.02rem;
  width: 0.56rem;
  height: 0.56rem;
  border-radius: 50%;
  background: #fff;
  box-shadow: 1px 1px #c0c0bc;
}
.modal .public_box {
  background: #00a185;
}
.modal .public_box::before {
  left: 0.02rem;
}
.modal .private_box {
  background: #e1e0db;
}
.modal .private_box::before {
  right: 0.02rem;
}
.modal .set_tit {
  height: 0.9rem;
  line-height: 0.9rem;
  font-size: 0.34rem;
  color: #494949;
  text-align: center;
  border-radius: 7px 7px 0 0;
  background: #fff;
  border-bottom: 1px solid #a8a8a8;
  position: relative;
}
.modal .set_tit .icon-close {
  position: absolute;
  top: 0.33rem;
  right: 0.3rem;
  color: #a4a4a4;
  font-weight: bold;
  font-size: 0.34rem;
}
.modal .set_tit .icon-arrow-left {
  position: absolute;
  top: 0.27rem;
  left: 0.32rem;
  color: #00a085;
  font-weight: bold;
  font-size: 0.4rem;
}
.modal .set_tit .send_btn {
  font-size: 0.28rem;
  color: #494949;
  font-weigth: bold;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  border-radius: 0.1rem;
  padding: 0 0.24rem;
  background: #f2f0f0;
  position: absolute;
  top: 0.15rem;
  right: 0.24rem;
}
.modal .exit {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.2);
}
.modal .exit_choice {
  width: 5.41rem;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 5;
  -webkit-transform: translate(-50%, -50%);
  border-radius: 10px;
  background: #fff;
}
.modal .exit_choice .exit_cur {
  height: 1.28rem;
  line-height: 1.28rem;
  font-family: 'å¾®è½¯é›…é»‘';
  color: #4e4e4e;
  font-size: 0.32rem;
  text-align: center;
  border-bottom: 1px solid #acadac;
}
.modal .exit_choice .ok_cancel {
  height: 0.9rem;
  line-height: 0.9rem;
  font-size: 0.34rem;
}
.modal .exit_choice .ok_cancel .cancel {
  width: 50%;
  float: left;
  text-align: center;
  color: #4e4e4e;
  border-right: 1px solid #acadac;
}
.modal .exit_choice .ok_cancel .ok {
  width: 50%;
  float: left;
  text-align: center;
  color: #00a085;
}
.modal textarea {
  min-height: 2.5rem;
  line-height: 0.4rem;
  font-size: 0.3rem;
  color: #494949;
  padding: 0.2rem 0;
  border: 0;
  border-radius: 7px;
  background: #fff;
  width: 100%;
  outline: none;
}
/*å…³äºŽè´¢èƒè¯¾å ‚*/
.erweima {
  width: 100%;
  margin: 0.63rem 0;
}
.erweima.xswx .bb {
  display: none;
}
.erweima.xswx .wx {
  display: block;
}
.erweima img {
  display: block;
  width: 1.98rem;
  height: 1.98rem;
  margin: 0 auto;
}
.erweima .about_title {
  text-align: center;
  line-height: 0.55rem;
  font-size: 0.32rem;
  color: #00a085;
}
.erweima .about_words {
  text-align: center;
  line-height: 0.55rem;
  font-size: 0.22rem;
  color: #898989;
}
.erweima #vers {
  margin-right: 0.5rem;
}
.pop-radios {
  overflow: hidden;
  padding: 10px 0;
  margin-top: 20px;
}
.pop-radios .pop-radio-label {
  display: inline-block;
  float: left;
  margin-left: 30px
}
.pop-radios .pop-radio-label .pop-radio {
  display: inline-block;
  position: relative;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #979797;
}
.pop-radios .pop-radio-label .pop-radio .pop-radio-round {
  position: absolute;
  top: 2px;
  bottom: 0;
  left: 2px;
  right: 0;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fff
}
.pop-radios .pop-radio-label .pop-radio-span {
  display: inline-block;
  color: #4A4A4A;
  font-size: 16px;
  padding-left: 0.1rem;
}
.pop-radios .pop-radio-label.active .pop-radio .pop-radio-round {
background-color: #F5A623
}
.pop-textarea-content {
  width: initial;
  height: 195px;
  border: 1px solid #E4E4E4;
  padding: 20px;
  margin: 0 20px;
  background-color: #fff
}
.pop-tel {
  width: 50%;
  height: 100%;
  float: left;
  color: #3E4E63;
  margin-left: 0.25rem;
  margin-top:10px;
}
.pop-tel .pop-input-tel {
  width: 180px;
  height: 28px;
  border: 1px solid #E4E4E4;
  padding: 10px;
  outline: none;
  font-size: 12px;
  margin-left: 10px;
  background-color: #fff
}
</style>
