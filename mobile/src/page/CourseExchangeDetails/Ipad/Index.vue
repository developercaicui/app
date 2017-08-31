<template lang="html">


	<div class="exchange-wrap-ipad">

		<main>

			<!--头部-->
		    <div class="s-head">
		      <div @click="closeMe()" class="left"><i class="icon-back">&#xe600;</i></div>
		      <div class="center">交流详情（未回复）</div>
		      <div class="right"><i id="del" onclick="del();" class="icon-trash icon-icon_delete">&#xe618;</i></div>
		    </div>
			<div id="content1">
				<dl class="cont-list">
		            <dt><img :src="data.headImg" class="avatar"></dt>
		            <dd>
		              <div class="name"><span>{{ data.nikeName }}</span>
		                <div onclick="addAnswer(this)" isadd="yes" class="add-answer" v-if='data.memberId == JSON.parse(this.webApi.getCookie("userInfo")).memberId'><i>...</i><span>问题补充</span></div>
		              </div>
		              <div class="title">{{ data.title }}</div>
		              <div class="describe">{{ data.content ? data.content : '' }}</div>
		              <!-- <div tapmode url="" onclick="playAudio(this)" bg time="" class="voice-player"></div> -->
		              <ul class="pic-group" v-if="data.imgPath">
		                <li v-for="(imgPath,index) in setImgPath(data.imgPath)" v-if="index <= 2" :style="setBackground(imgPath)" onclick="openImageBrower('','')"></li>
		                <b v-if="setImgPath(data.imgPath).length>=3">共{{ setImgPath(data.imgPath).length }}张</b>
		              </ul>
		              <div class="add_question" v-if="data.supply" v-for="item in data.supply">
		              		<span>问题补充:</span><span>{{ item.content }}<span>{{this.webApi.formatDate(item.updateTime,'M')+'-'+this.webApi.formatDate(item.updateTime,'D')}}</span></span>
		              <!-- <div url="static_url+it.supply[p].soundPath" onclick="playAudio(this)" bg time="it.supply[p].soundlen" class="voice-player"></div> -->
			              <ul class="pic-group"  v-if="item.imgPath">
			               	<li v-for="(imgPath,index) in setImgPath(item.imgPath)" v-if="index <= 2" :style="setBackground(imgPath)" onclick="openImageBrower('','')"></li>
		                	<b v-if="setImgPath(item.imgPath).length>=3">共{{ setImgPath(item.imgPath).length }}张</b>
			              </ul>
		              </div>
		              <div class="footer">
		                <div class="count"><i class="icon-liuyan icon-replys">&#xe632;</i><span>{{ data.replyCount ? data.replyCount : 0 }}</span></div>
		                <div class="time"><span>{{ data.updateTime }}</span></div>
		                <div class="course-name">
		                  <div class="tag-video-time" v-if="data.taskprogress"><i class="icon-play-o"></i><span>{{ data.taskprogress }}</span></div>
		                  <span class="course-tit" v-if="data.coursename">{{ data.coursename }}</span>
		                </div>
		              </div>
		            </dd>
		          </dl>
			</div>
			<div id="content2">
				<dl class="cont-list">
		            <dt><img src="http://cdnimg.caicui.com/upload/avatar/big_8a22ecb55474935701547591f52d044e.jpg" class="avatar"></dt>
		            <dd>
		              <div class="name"><span>it[t].nikeName</span>
		                <div class="time"><span></span><span></span></div>
		              </div>
		              <div class="describe">!isEmpty(it[t].content)?it[t].content:''</div>
		              <div tapmode url="static_url+it[t].soundPath" onclick="playAudio(this)" bg time="it[t].soundlen" class="voice-player"></div>
		              <ul class="pic-group">
		               
		                <li style="background-image:url(static_url + imgPath[i])" tapmode onclick="openImageBrower('it[t].imgPath','i')"></li><b>共 5 张</b>
		              </ul>
		                <ul class="pic-group">
		                <li style="background-image:url(imgPath[i])" tapmode onclick="openImageBrower('imgPath[i]','i')"></li><b>共 5 张</b>
		                </ul>

		            </dd>
		          </dl>
			</div>
		</main>


	</div>

</template>

<script>

// import { getExchangeDetails } from '../../../api/port';

export default {

	data() {
	    return {
			data: []
	    }
	},

	mounted() {
		this.data = JSON.parse(this.$route.params.data);
		this.data = {"categoryId":"ff808081473905e701475cd3c2080001","subjectId":"ff808081473905e701476204cb6c006f","courseId":"ff8080814dad5062014db32051b801a2","chapterId":"ff8080814dad5062014db32051d501a7","categoryName":"ACCA","subjectName":"F1","courseName":"ACCA F1 Accountant in Business","chapterName":"Chapter 1 Organisation and Types of Organisation","taskId":"ff8080814dad5062014db333f30d0255","taskType":"video","taskprogress":"4","favoriteCount":"0","replyCount":"4","clickCount":"21","title":"\u6d4b\u8bd5\u7ed3\u679c","denyReply":"false","toporder":"0","bestorder":"0","adpic":null,"fid":"10","taskCount":"0","taskCurrent":"0","uid":"19277","soundPath":" ","soundlen":"0","updateTime":"1500020083","clientType":"iphone","content":"\u6d4b\u8bd5\u7ed3\u679c\u770b\u663e\u793a\u662f\u5426\u6b63\u5e38","bbstype":"1","praiseCount":"0","replaytype":"0","imgPath":"","is_control":"0","userlevel":1,"userlevelid":"101","nikeName":"Rainy02","is_avatar":"1","avatar_default":"0","memberId":"8a22ecb55474935701547591f52d044e","isdelete":0,"id":"43028","levelimg":"\/upload\/usrlevel.png","headImg":"\/upload\/avatar\/big_8a22ecb55474935701547591f52d044e.jpg","contentHtml":"\u6d4b\u8bd5\u7ed3\u679c\u770b\u663e\u793a\u662f\u5426\u6b63\u5e38","isdisplay":true,"contentSummary":"\u6d4b\u8bd5\u7ed3\u679c\u770b\u663e\u793a\u662f\u5426\u6b63\u5e38","replys":[{"taskId":"ff8080814dad5062014db333f30d0255","taskType":"video","taskprogress":"4","favoriteCount":"0","replyCount":"4","clickCount":"21","denyReply":"false","toporder":"0","bestorder":"0","adpic":null,"fid":"10","taskCount":"0","taskCurrent":"0","pid":"59948","uid":"16838","soundPath":" ","soundlen":"0","updateTime":"1500083546","clientType":"aphone","content":"\u6b63\u5e38","bbstype":"1","praiseCount":"0","replaytype":"0","imgPath":"","is_control":"0","userlevel":1,"userlevelid":"101","nikeName":"cc69v6","is_avatar":"1","avatar_default":"7","memberId":"8a22ecb5532c7c88015331f559cf1a0a","isdelete":0,"id":"59948","levelimg":"\/upload\/usrlevel.png","headImg":"\/upload\/avatar\/big_8a22ecb5532c7c88015331f559cf1a0a.jpg","contentHtml":"\u6b63\u5e38","isdisplay":true,"contentSummary":"\u6b63\u5e38","del_permission":0},{"taskId":"ff8080814dad5062014db333f30d0255","taskType":"video","taskprogress":"4","favoriteCount":"0","replyCount":"4","clickCount":"21","denyReply":"false","toporder":"0","bestorder":"0","adpic":null,"fid":"10","taskCount":"0","taskCurrent":"0","pid":"61999","uid":"19277","soundPath":" ","soundlen":"0","updateTime":"1501143158","clientType":"pc","content":"\u6b63\u5e38\uff0b1","bbstype":"1","praiseCount":"0","replaytype":"0","imgPath":"","is_control":"0","userlevel":1,"userlevelid":"101","nikeName":"Rainy02","is_avatar":"1","avatar_default":"0","memberId":"8a22ecb55474935701547591f52d044e","isdelete":0,"id":"61999","levelimg":"\/upload\/usrlevel.png","headImg":"\/upload\/avatar\/big_8a22ecb55474935701547591f52d044e.jpg","contentHtml":"<p>\u6b63\u5e38\uff0b1<\/p><br>","isdisplay":true,"contentSummary":"\u6b63\u5e38\uff0b1","del_permission":1},{"taskId":"ff8080814dad5062014db333f30d0255","taskType":"video","taskprogress":"4","favoriteCount":"0","replyCount":"4","clickCount":"21","denyReply":"false","toporder":"0","bestorder":"0","adpic":null,"fid":"10","taskCount":"0","taskCurrent":"0","pid":"62001","uid":"19277","soundPath":" ","soundlen":"0","updateTime":"1501143358","clientType":"pc","content":"\u56fe\u7247\u4e0a\u4f20\u6d4b\u8bd5","bbstype":"1","praiseCount":"0","replaytype":"0","imgPath":"","is_control":"0","userlevel":1,"userlevelid":"101","nikeName":"Rainy02","is_avatar":"1","avatar_default":"0","memberId":"8a22ecb55474935701547591f52d044e","isdelete":0,"id":"62001","levelimg":"\/upload\/usrlevel.png","headImg":"\/upload\/avatar\/big_8a22ecb55474935701547591f52d044e.jpg","contentHtml":"<p>\u56fe\u7247\u4e0a\u4f20\u6d4b\u8bd5<\/p><br><img src=\"http:\/\/cdnstatic.caicui.com\/\/\/upload\/2017\/07\/27\/E1C2334DC40A48E1A13689ECD2CDF3E2.jpg\"><br>","isdisplay":true,"contentSummary":"\u56fe\u7247\u4e0a\u4f20\u6d4b\u8bd5","del_permission":1},{"taskId":"ff8080814dad5062014db333f30d0255","taskType":"video","taskprogress":"4","favoriteCount":"0","replyCount":"4","clickCount":"21","denyReply":"false","toporder":"0","bestorder":"0","adpic":null,"fid":"10","taskCount":"0","taskCurrent":"0","pid":"62002","uid":"19277","soundPath":" ","soundlen":"0","updateTime":"1501143489","clientType":"pc","content":"\u56de\u590d\u56fe\u7247\u6d4b\u8bd5","bbstype":"1","praiseCount":"0","replaytype":"0","imgPath":"","is_control":"0","userlevel":1,"userlevelid":"101","nikeName":"Rainy02","is_avatar":"1","avatar_default":"0","memberId":"8a22ecb55474935701547591f52d044e","isdelete":0,"id":"62002","levelimg":"\/upload\/usrlevel.png","headImg":"\/upload\/avatar\/big_8a22ecb55474935701547591f52d044e.jpg","contentHtml":"<p>\u56de\u590d\u56fe\u7247\u6d4b\u8bd5<\/p><br><img src=\"http:\/\/cdnstatic.caicui.com\/\/upload\/2017\/07\/27\/B894A79A5BCF4059BDDB0C46715EE53B.jpg\"><br>","isdisplay":true,"contentSummary":"\u56de\u590d\u56fe\u7247\u6d4b\u8bd5","del_permission":1}]}
		

		this.setListData(this.data)
	},

  
  	methods: {

		closeMe() {
			this.$router.go(-1);
		},
        setListData(list) {
          	list.headImg = `${this.webApi.cdnImgUrl}${list.headImg}`;
          	list.title = `${list.bbstype=='0'?"【讨论】":"【问答】"}${list.title}`;
          	list.imgPath = `${this.webApi.isEmpty(list.imgPath)?'':list.imgPath}`;
          	list.updateTime = `${this.webApi.isEmpty(list.updateTime)?'':this.webApi.formatDate(list.updateTime,'Y')}-${this.webApi.formatDate(list.updateTime,'M')}-${this.webApi.formatDate(list.updateTime,'D')}   ${this.webApi.formatDate(list.updateTime,'h')}:${this.webApi.formatDate(list.updateTime,'m')}`;
          	list.taskprogress = `${list.taskprogress != '-1' && list.taskType != ' ' && list.courseId && list.courseId != ' ' && list.chapterId && list.chapterId != ' ' && list.taskId && list.taskId != ' '?this.webApi.formatType(list.taskType,list.taskprogress):''}`;
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
		}
	},


}

</script>

<style lang="scss" scoped>
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
/**é€šç”¨å›¾ç‰‡ç»„**/
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
  z-index: 9999;
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
  background: #00a185;
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
