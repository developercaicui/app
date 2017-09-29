<template lang="html">

	<div class="exchange-wrap-ipad-details">

		<header class="one-top">
			<a href="javascript:;" @click.stop="closeMe">&#xe67f;</a>
			<h1 ref="reply">讨论详情（未回复）</h1>
			<div class="state-edit" @touchend="removeDetails">
				<a href="javascript:;"></a>
				<a href="javascript:;" v-show="isRemoveMsg">&#xe618;</a>
			</div>
		</header>

		<div id="content1">
			<dl class="cont-list">
          <dt><img :src="data.headImg" class="avatar"></dt>
          <dd>
            <div class="name"><span>{{ data.nikeName }}</span>
              <div onclick="addAnswer(this)" isadd="yes" class="add-answer" v-if='data.memberId == JSON.parse(this.webApi.getCookie("userInfo")).memberId'><i>...</i><span>问题补充</span></div>
            </div>
            <div class="title">{{ data.title }}</div>
            <div class="describe">{{ data.content ? data.content : '' }}</div>
            <ul class="pic-group" :data-allimg="data.imgPath.toString()" v-if="data.imgPath">
              <li v-for="(imgPath, index) in setImgPath(data.imgPath)" v-if="index <= 2" :style="setBackground(imgPath)" @touchend="handleOpenBigPic"></li>
              <b v-if="setImgPath(data.imgPath).length >= 3">共{{ setImgPath(data.imgPath).length }}张</b>
            </ul>
            <div class="add_question" v-if="data.supply" v-for="item in data.supply">
            		<span>问题补充:</span><span>{{ item.content }}<span>{{this.webApi.formatDate(item.updateTime,'M')+'-'+this.webApi.formatDate(item.updateTime,'D')}}</span></span>
              <ul class="pic-group" :data-allimg="item.imgPath.toString()" v-if="item.imgPath">
               	<li v-for="(imgPath,index) in setImgPath(item.imgPath)" v-if="index <= 2" :style="setBackground(imgPath)" @touchend="handleOpenBigPic"></li>
              	<b v-if="setImgPath(item.imgPath).length>=3">共{{ setImgPath(item.imgPath).length }}张</b>
              </ul>
            </div>
            <div class="footer">
              <div class="count"><i class="icon-liuyan icon-replys">&#xe632;</i><span>{{ data.replyCount ? data.replyCount : 0 }}</span></div>
              <div class="time"><span>{{ data.updateTime }}</span></div>
              <div class="course-name">
                <div class="tag-video-time" @click="jump_task(data)" v-if="data.taskprogress"><i class="icon-play-o icon-video">&#xe63f;</i><span>{{ data.taskprogress }}</span></div>
                <span class="course-tit" v-if="data.coursename">{{ data.coursename }}</span>
              </div>
            </div>
          </dd>
        </dl>
		</div>
		<div id="content2" class="reply-list">
			<dl class="cont-list" v-for="item in replys">
	       <dt><img :src="item.headImg" class="avatar"></dt>
          <dd>
            <div class="name"><span>{{ item.nikeName }}</span>
              <div class="time"><span>{{ item.updateTime }}</span><span></span></div>
            </div>
	          <div class="describe">{{ item.content ? item.content : '' }}</div>

	            <ul class="pic-group" :data-allimg="item.imgPath.toString()" v-if="item.imgPath">
                <li v-for="(imgPath, index) in setImgPath(item.imgPath)" v-if="index <= 2" :style="setBackground(imgPath)" @touchend="handleOpenBigPic"></li>
                <b v-if="setImgPath(item.imgPath).length>=3">共{{ setImgPath(item.imgPath).length }}张</b>
              </ul>

							<ul class="pic-group" :data-allimg="getreolyImg(item.contentHtml).toString()" v-else-if="item.contentHtml && getreolyImg(item.contentHtml).length>0">
                <li v-for="(imgPath,index) in getreolyImg(item.contentHtml)" v-if="index <= 2" :style="setBackground(imgPath)" @touchend="handleOpenBigPic"></li>
                <b v-if="getreolyImg(item.contentHtml).length>=3">共{{ getreolyImg(item.contentHtml).length }}张</b>
              </ul>

					</dd>
	     </dl>
		</div>


		<footer class="leave-msg">
			<div class="nav">
				<a href="javascript:;" class="upload-pic-btn" @touchend="handleIsUpload">&#xe6ab;</a>
				<input type="text" name="" v-model="textDetails" placeholder="评论...">
				<a href="javascript:;" class="add-msg" @touchend="handleSubPublish">发布</a>
			</div>
			<div class="upload-details" v-show="isFileOpen">
				<h1>最多可添加五张图片</h1>
				<a href="javascript:;" class="upload-btn" @touchend="handleUploadBtn"><span>+</span></a>
				<ul class="show-list-pic">
					<li v-for="(item, index) in allUploadPic" >
						<img :src="item.src" />
						<a href="javascript:;" :data-index="index" @touchend="handleRemovePic">&#xe642;</a>
					</li>
				</ul>
			</div>
		</footer>

		<input type="file" accept="image/*" @change="handleUploadPic" ref="iptFile" class="ipt-file">

		<photoAlbum :pic-list="picList" v-show="isShowList" @closeBigPic="closeBigPic"></photoAlbum>

	</div>

</template>

<script>

import photoAlbum from '../../../components/Comm/photoAlbum';
import {
  removeExchangeDetails,
  getExchangeDetails
} from '../../../api/port';

export default {

	props: {
		userInfo: {
			type: Object,
			default: {}
		},
	},

	components: {
		photoAlbum,
	},

  data() {
    return {
			data: {},
      replys: [],
			isFileOpen: false, // 是否打开上传图片
			allUploadPic: [], // 所有上传的图片
			allPicPath: '', // 上传图片的内容
			isUploadSuccess: 0,
			textDetails: '', // 内容
			appendReplyHtml: '',
			isRemoveMsg: false, // 是否可以删除当前留言。默认可以
			isShowList: false, // 是否显示大图列表
			picList: [], // 图片列表
			progress: 0,
			dataParams: {}
    }
  },

	mounted() {

		this.dataParams = JSON.parse(this.$route.params.data || {});

		this.getDetails(this.dataParams.id);

	},

  methods: {

		// 获取笔记详情
		getDetails(id) {

			this.webApi.loadingData();

			getExchangeDetails({
				verTT: new Date().getTime(),
				token: this.userInfo.token,
				id: id,
				pageNo: 1,
				pageSize: 20,
			})

			.then(res =>{

				this.webApi.closeLoadingData();

				if(!res || res.state != 'success'){
					this.webApi.alert('详情获取失败，请稍后再试');
					return false;
				}

				this.data = res.data;

				this.dataInit();
			});

		},

		dataInit() {

			this.picList = this.data.imgPath.split(',').map(item => `${this.webApi.cdnImgUrl}${item}`);

			this.isRemoveMsg = this.userInfo.memberId === this.data.memberId ? true : false;

			this.replys = this.data.replys;

		  if(!this.webApi.isEmpty(this.replys) && this.replys.length>0) this.$refs.reply.innerHTML = '交流详情 (已回复)';

	    this.setListData(this.data)

			this.setReplysData(this.replys)

		},


		// 删除详情
		removeDetails() {

			this.$emit('remove-details', {
				id: this.data.id
			})

		},

		// 打开大图
		handleOpenBigPic(ev) {

			let oUl = this.webApi.recursiveParentNode(ev.target, 'ul')

			this.picList = oUl.dataset.allimg.split(',') || [];

			this.picList = this.picList.map(item =>{
				return item.includes('http') ? item : `${this.webApi.cdnImgUrl}${item}`;
			});

			this.isShowList = true;
		},

		// 关闭大图
		closeBigPic(off) {
			this.isShowList = off;
		},


		// 发布，先提交照图片
		handleSubPublish() {

			if(!this.textDetails){
				this.webApi.alert('评论内容不能为空');
				return false;
			}

			if(this.allUploadPic.length < 1){
				this.subForm();
				return false;
			}

			this.isUploadSuccess = 0;

			this.allUploadPic.map((item, index) =>{

				let formData = new FormData();

				formData.append(`file`, item.file);
				formData.append('token', this.webApi.getCookie('token'));

				this.$emit('upload-pic', formData, res =>{

					this.allPicPath =  `${this.allPicPath}<img src="${this.webApi.cdnImgUrl}${res.storeFileUrl}"/>`;
					this.isUploadSuccess++;

					// 成功以后提交表单内容
					if(this.allUploadPic.length == this.isUploadSuccess) this.subForm();

				});

			});

		},

		// 数据全部提交
		subForm() {


			this.$emit('reply', {
				id: this.data.id,
				content: `<p>${this.textDetails}</p><br>${this.allPicPath}`,
				replaytype: 0,
				pageSize: 20,
				token: this.webApi.getCookie('token'),
				pageNo: 1,
			});

		},

		// 上传图片
		handleUploadPic(ev) {

			let file = this.$refs.iptFile.files[0];
			let reader = new FileReader();

			reader.readAsDataURL(file);

			reader.onload = (evt) =>{

				this.allUploadPic.push({
					src: evt.target.result,
					file: file
				});

      }

		},

		// 触发上传
		handleUploadBtn() {
			this.$refs.iptFile.click();
		},

		// 是否打卡上传图片
		handleIsUpload() {
			this.isFileOpen = this.isFileOpen ? false : true;
		},

		// 删除这个照片
		handleRemovePic(ev) {

			let removeIndex = ev.target.dataset.index;

			this.allUploadPic = this.allUploadPic.filter((item, index) => index != removeIndex && item);

		},
		closeMe() {
			this.$router.go(-1);
		},
        setListData(list) {
        	this.taskprogress = list.taskprogress;
          	list.headImg = `${this.webApi.cdnImgUrl}${list.headImg}`;
          	list.title = `${list.bbstype=='0'?"【讨论】":"【问答】"}${list.title}`;
          	list.imgPath = `${this.webApi.isEmpty(list.imgPath)?'':list.imgPath}`;
          	list.updateTime = `${this.webApi.isEmpty(list.updateTime)?'':this.webApi.formatDate(list.updateTime,'Y')}-${this.webApi.formatDate(list.updateTime,'M')}-${this.webApi.formatDate(list.updateTime,'D')}   ${this.webApi.formatDate(list.updateTime,'h')}:${this.webApi.formatDate(list.updateTime,'m')}`;
          	list.taskprogress = `${list.taskprogress != '-1' && list.taskType != ' ' && list.courseId && list.courseId != ' ' && list.chapterId && list.chapterId != ' ' && list.taskId && list.taskId != ' '?this.webApi.formatType(list.taskType,list.taskprogress):''}`;
        },
        setReplysData(list) {
          list.map(item =>{
              item.headImg = `${this.webApi.cdnImgUrl}${item.headImg}`;
              item.imgPath = `${this.webApi.isEmpty(item.imgPath)?'':item.imgPath}`;
              item.contentHtml = `${this.webApi.isEmpty(item.contentHtml)?'':item.contentHtml}`;
              item.updateTime = `${this.webApi.isEmpty(item.updateTime)?'':this.webApi.formatDate(item.updateTime,'Y')}-${this.webApi.formatDate(item.updateTime,'M')}-${this.webApi.formatDate(item.updateTime,'D')}   ${this.webApi.formatDate(item.updateTime,'h')}:${this.webApi.formatDate(item.updateTime,'m')}`;
              item.taskprogress = `${item.taskprogress != '-1' && item.taskType != ' ' && item.courseId && item.courseId != ' ' && item.chapterId && item.chapterId != ' ' && item.taskId && item.taskId != ' '?this.webApi.formatType(item.taskType,item.taskprogress):''}`;
          });
        },
        jump_task(data) {//点击跳转任务（播放视频）

        	if(data.taskType == "video"){

        		data.progress = this.taskprogress;
        		console.log(JSON.stringify(data))
        		g.clickToPlayVido(JSON.stringify(data))

        	}

        },
		setBackground(url) {
			return `background-image:url(${this.getImgPath(url)})`
		},

		setImgPath(imgPaths) {
			let imgPath=imgPaths.split(',');
			let imgPathArr=[];
            for(let i in imgPath) {
              if(!this.webApi.isEmpty(imgPath[i])) {
                imgPathArr.push(imgPath[i]);
              }
            }
            return imgPathArr;
		},

		getImgPath(imgPath) {//处理图片路径
			if(imgPath.length>0){
				  if(imgPath.substr(0,4)!="http"){
				     return this.webApi.cdnImgUrl+imgPath;
				  }else{
				  	return imgPath;
				  }
			 }else{
			 	return imgPath;
			 }
		},

    getreolyImg(html) {
     //创建一个div
       let divHtml = document.createElement("div");
       divHtml.innerHTML = html;
       let divHtmlimg = divHtml.getElementsByTagName("img");
       if(divHtmlimg.length<1){
            return '';
       }
       let divHtmlimgArr = [];
       for(let i=0;i<divHtmlimg.length;i++){
          divHtmlimgArr.push(divHtmlimg[i].getAttribute("src"));
       }
       return divHtmlimgArr;
    }
  }

}

</script>

<style lang="scss">

	@import "../../../assets/style/mixin";
	.icon-video{
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
	.exchange-wrap-ipad-details{

		font-size: 0;
		padding-top: $commTop;
		background-color: $commTopWhite;

		// 底部留言
		.leave-msg{

			@extend .show;
			position: fixed;
			left: 0; bottom: 0; right: 0;
			border-top: 1px solid #eee;
			background-color: #F5F5F5;
			z-index: 9;

			.show-list-pic{
				@extend .ab;
				left: 3.61rem; top: 1.8rem;
				display: flex;
				li{
					@include wh(2.8rem, 2.2rem);
					flex: 1; margin-right: .3rem;
					img{
						@include wh(100%, 100%);
					}
					a{
						@extend .ab;
						@include wh(.4rem, .4rem);
						@include fc(.24rem, #fff);
						@extend .borderBox;
						text-align: center; line-height: 1.5;
						background-color: $commPink;
						top: -.1rem;
						transform: translate3d(-.26rem,0,0);
						border-radius: 100%;
						font-family: 'iconfont';
						border: 1px solid #fff;
					}
				}
			}

			.upload-details{
				height: 3.3rem;
				background-color: #f5f5f5;
				padding: .25rem;
				h1{
					@include fc(.26rem, #A5A5A5);
				}
			}
			.upload-btn{
				@extend .flexCenter;
				@include wh(2.8rem, 2.1rem);
				border: 2px dashed #ddd;
				border-radius: 2px;
				transform: translate3d(0,.2rem,0);
				span{
					@include wh(.8rem, .8rem);
					@include fc(.4rem, #fff);
					@extend .flexCenter;
					background-color: #ddd;
					border-radius: 100%;
				}
			}

			.nav{

				height: 1.02rem;

				input{
					@extend .ab;
					@include wh(17.6rem, .5rem);
					@include fc(.24rem, #999);
					@extend .borderBox;
					top: .25rem; left: 1.2rem;
					border: 1px solid #e0e0e0;
					border-radius: 3px;
					padding: 0 .2rem;
				}

			}
			.add-msg{
				@include wh(1.1rem, .5rem);
				@include fc(.26rem, #fff);
				@extend .flexCenter;
				@extend .ab;
				right: .3rem; top: .25rem;
				border-radius: 3px;
				background-color: $commPink;
			}
			.upload-pic-btn{
				@extend .ab;
				@include fc(.5rem, $commPink);
				top: .23rem; left: .3rem;
				font-family: 'iconfont';
			}
		}

		.user-head{
			@extend .ab;
			@include wh(.8rem, .8rem);
			left: .5rem;
			border-radius: 100%;
		}

		> main {
			@include wh(100%, 100%);
			padding-bottom: 4.32rem;
			background-color: #fff;
		}
		.list{
			@include fc(.24rem, #333);
			padding: .35rem .5rem .35rem 1.6rem; line-height: 1;
			border-bottom: 1px solid #E2E2E2;
			background-color: #f7f7f7;
			&:nth-of-type(1){
				background-color: #fff;
			}
			h1{
				font-size: .28rem;
				margin: .25rem 0;
			}
			time{
				@extend .show;
				color: #ACACAC;
				text-align: right;
				padding-bottom: .4rem;
				&.time{
					float: right;
				}
			}
			.msg-num{
				position: absolute;
				right: .5rem; width: .75rem;
				text-align: right; color: #ACACAC;
				&:before{
					content: '\e632';
					font-family: 'iconfont';
					@extend .ab;
					@include fc(.3rem, #ACACAC);
					left: 0;
				}
			}
		}


		.state-edit{
			@extend .ab;
			right: .35rem; top: 50%; transform: translateY(-50%);
			font-family: 'iconfont';
			a{
				color: $commPink;
				&:nth-of-type(1){
					font-size: .38rem;
					margin-right: .3rem;
				}
				&:nth-of-type(2){
					font-size: $headIconFont;
				}
			}
		}


	.one-top{
		position: relative;
		@include wh(100%, 1.05rem);
		border-bottom: 1px solid #B9B9B9;
		background-color: #fff;
		> a{
			@extend .ab;
			@include fc($commBackFont, $commPink);
			@include wh(1.5rem, 1.05rem);
			@extend .flexCenter;
			font-family: 'iconfont';
			left: 0; padding-left: .1rem; top: 0;
		}

		h1{
			@extend .flexCenter;
		  @include fc($headH1Font, #1D1D1D);
			height: inherit;
		}
		.type-list{
			@extend .ab;
			@include fc(.24rem, #fff);
			top: 1rem; left: .5rem;
			background-color: rgba(0,0,0,.7);
			border-radius: 5px;
			width: 2rem;
			&:after{
				content: '';
				@extend .show;
				@extend .ab;
				top: -.38rem;
				left: .85rem;
				border: .19rem solid rgba(0,0,0,0);
				border-bottom-color: rgba(0,0,0,.7);
			}
			li{
				padding: .15rem .2rem;
				text-align: center;
				border-bottom: 1px solid rgba(255,255,255,.7);
			}
		}
	}

	.reply-list{
		padding-bottom: .5rem;
		p{
			margin-top: .2rem;
		}

	}

	.ipt-file{
		@extend .ab;
		@include wh(0, 0);
		overflow: hidden;
		left: -99rem; top: -99rem;
	}

	.content-html{
		 img{
			display: inline-block;
			width: 1.5rem;
			margin-right: .2rem;
		}

	}

}
.icon-back{
  font-family:"iconfont";
  font-size:0.26rem;
  font-weight: 700;
  color: #00a185;
  speak: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 100%;
  vertical-align: middle;
}
.icon-icon_delete{
  font-family:"iconfont";
  font-size:0.26rem;
  font-weight: 700;
  color: #00a185;
  speak: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 100%;
  vertical-align: middle;
}
.icon-liuyan{
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
.s-head {
  background: #fff;
  font-size: 0.32rem;
  height: 1.25rem;
  line-height: 1.25rem;
  position: relative;
  border-bottom: 1px solid #ddd;
}
.s-head .left,
.header .left,
.s-head .right,
.header .right,
.s-head .left-txt,
.header .left-txt {
  position: absolute;
  padding: 0 0.3rem;
  bottom: 0;
}
.s-head .left,
.header .left,
.s-head .right,
.header .right {
  color: #00a185;
  font-size: 0.28rem;
}
.s-head .left .red,
.header .left .red,
.s-head .right .red,
.header .right .red {
  color: #f00;
  border: 1px #f00 solid;
}
.s-head .left i,
.header .left i,
.s-head .right i,
.header .right i {
  font-size: 0.36rem;
  margin: 0 0.1rem;
}
.s-head .left-txt,
.header .left-txt {
  left: 1.3rem;
}
.s-head .left,
.header .left {
  left: 0;
}
.s-head .left .icon-arrow-left,
.header .left .icon-arrow-left {
  color: #585858;
}
.s-head .right,
.header .right {
  right: 0;
}
.s-head .right li:not(.none),
.header .right li:not(.none) {
  display: inline-block;
  margin-left: 0.4rem;
}
.s-head .center,
.header .center {
  text-align: center;
  color: #000;
  width: 60%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.reply-body {
  background: #f5f5f5;
  padding-bottom: 1.5rem;
}

.pic-group-detail {
  padding: 0.2rem 0.3rem;
}
.pic-group-detail img {
  width: 100%;
  margin: 0.1rem 0;
}
.pic-group {
  margin: 0.3rem 0;
  font-size: 0;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  height: 2rem;
  display: table;
}
.pic-group li {
  width: 3rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  background: #eee no-repeat center;
  background-size: cover;
  float: left;
  z-index: 100;
}
.pic-group li:nth-child(2) {
  margin: 0 0.3rem;
}
.pic-group b:nth-child(4) {
  position: absolute;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  color: #fff;
  height: 0.4rem;
  width: 1rem;
  text-align: center;
  line-height: 0.4rem;
  font-size: 0.22rem;
  margin-left: -1rem;
}
.cont-list-body body {
  padding-bottom: 1.2rem;
}
.cont-list-body body:after {
  content: '';
  display: block;
  height: 1.2rem;
}
.cont-list {
  display: table;
  position: relative;
  width: 100%;
  background: #fff;
  font-size: 0.26rem;
  line-height: 0.4rem;
  color: #494949;
}
.cont-list:not(:last-child) {
  border-bottom: 1px solid #ddd;
}
.cont-list dt,
.cont-list dd {
  display: table-cell;
  vertical-align: top;
  padding: 0.3rem;
}
.cont-list dt {
  width: 1.3rem;
  text-align: right;
  padding-right: 0;
}
.cont-list dt img {
  width: 1rem;
  height: 1rem;
}
.avatar {
    border-radius: 50%;
}
.cont-list dd .link-box:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.cont-list dd .title {
  font-size: 0.3rem;
  font-weight: bold;
  margin: 0.1rem 0;
  max-height: 0.8rem;
  overflow: hidden;
}
.cont-list dd .describe {
  margin: 0.1rem 0;
  max-height: 1.2rem;
  overflow: hidden;
}
.cont-list dd .name {
  font-weight: bold;
}
.cont-list dd .name img {
  max-height: 0.3rem;
  vertical-align: middle;
  margin-left: 0.2rem;
}
.cont-list dd .name > * {
  display: inline-block;
}
.cont-list dd .name .time {
  font-weight: normal;
}
.cont-list dd .add-answer,
.cont-list dd .time {
  color: #999;
  margin-left: 0.6rem;
}
.cont-list dd .add-answer span,
.cont-list dd .time span {
  margin-left: 0.2rem;
}
.cont-list dd .add-answer[isadd="no"] {
  color: #00a185;
}
.cont-list dd .add-answer i {
  background-color: $commPink;
  padding: 0 0.3rem;
  border-radius: 0.3rem;
  color: #fff;
}
.cont-list dd .footer {
  color: #919191;
  height: 0.4rem;
  margin-top: 0.2rem;
}
.cont-list dd .footer .time,
.cont-list dd .footer .count {
  position: absolute;
  right: 0;
  padding: 0.2rem 0.3rem;
}
.cont-list dd .footer .time {
  bottom: 0;
}
.cont-list dd .footer .count {
  top: 0;
}
.cont-list dd .footer .count i {
  margin: 0 0.1rem 0 0.4rem;
}
.cont-list dd .course-name > * {
  vertical-align: middle;
}
.cont-list dd .course-tit {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 6rem;
  font-size: 0.24rem;
}
.cont-list dd .overt {
  font-size: 0.2rem;
  display: inline-block;
  padding: 0 0.15rem;
  height: 0.26rem;
  line-height: 0.3rem;
  color: #fff;
  border-radius: 2px;
  background: #8cc152;
}
.tag-video-time {
  display: inline-block;
  margin-right: 0.2rem;
  padding: 0.02rem 0.1rem;
  border: 1px solid #8cc152;
  color: #8cc152;
  border-radius: 0.3rem;
  min-width: 1.2rem;
}
.tag-video-time i,
.tag-video-time span {
  line-height: 0.3rem;
  vertical-align: middle;
  margin: 0 0.05rem;
  font-style: normal;
}
.reply-list {
  border-top: 1px solid #ddd;
}
.reply-list .cont-list {
  background: #f5f5f5;
}
.reply-list .cont-list dt img {
  width: 0.8rem;
  height: 0.8rem;
}
@media (max-width: 600px) {
  .pic-group {
    height: 1.6rem;
  }
  .pic-group li {
    width: 2.2rem;
    height: 1.6rem;
  }
  .pic-group li:nth-child(2) {
    margin: 0 0.2rem;
  }
  .cont-list dd .course-tit {
    max-width: 3rem;
  }
}
.bg-hasedit .cont-list .describe,
.detail-page .cont-list .describe,
.bg-hasedit .cont-list .title,
.detail-page .cont-list .title {
  white-space: pre-wrap;
  max-height: 1000rem;
}
.my-list .cont-list dt {
  display: none;
}
.note-detail .cont-list .footer {
  margin-bottom: 0.3rem;
}
.note-detail .cont-list .footer .time {
  top: 0.4rem;
  bottom: auto;
}

</style>
