<template lang="html">


	<div class="node-ipad-list">

		<main class="list-wrap">

			<div class="s-head">
		      <div class="center">
		        <div class="btn-group btn-success">
		          <div @click="set_index(index)" class="btn" :class="index==defaultAct ? 'active' : '' " v-for="(item,index) in navList">{{ item.name }}</div>
		        </div>
		      </div>
		      <ul class="right">
		        <li @click="showSearchBar"><i class="icon-sousuo icon-search2 icon-new-srarch">&#xe651;</i></li>
		        <li @click="new_answer"><span class="head-r-text">新建+</span></li>
		      </ul>
		      <div class="search-bar">
		        <input type="text" name="input-lx" placeholder="搜索" class="input-txt" ref="searchWord">
		        <div class="right"><i class="icon-sousuo icon-search2">&#xe651;</i><span @click="goSearch()" class="submit">搜索</span><span @click="hideSearchBar" class="cancel">取消</span></div>
		      </div>
      </div>

			<div class="all" v-show="defaultAct==0" ref="all">

				<SlideRefresh @top-status-change="topStatusChange">

				<template>

          <h1 :data-id="sectionAllList.id">{{sectionAllList.courseName}}</h1>

          <template v-for="twoItem in sectionAllList.children">

            <section class="list" :data-id="twoItem.id" v-if="twoItem.nodeNum!=0">
              <div>
                <span></span>
                <h1>{{twoItem.chapterTitle}}</h1>
              </div>

              <template v-for="threeItem in twoItem.children">

              <section class="list" :data-course="JSON.stringify(sectionAllList)" :data-chapter="JSON.stringify(twoItem)" :data-chaptertwo="JSON.stringify(threeItem)" @click="openNoteDetails" :data-id="threeItem.id" v-if="threeItem.nodeNum!=0">
                <div>
                  <h1>{{threeItem.chapterTitle}}</h1>
                  <i>{{threeItem.nodeNum}}</i>
                </div>

              </section>

              </template>

            </section>

           </template>

        </template>
        <img class="no-data" v-show="this.sectionAllList && this.sectionAllList.length === 0 || this.sectionAllList.nodeNum == 0" src="../../../assets/img/404.svg"/>

			 </SlideRefresh>
			</div>

			<div class="me" v-show="defaultAct==1" ref="me">

				<template v-for="item in sectionList">

          <h1 :data-id="item.id">{{item.courseName}}</h1>

          <template v-for="twoItem in item.children">

            <section class="list" :data-id="twoItem.id" v-if="twoItem.nodeNum!=0">
              <div>
                <span></span>
                <h1>{{twoItem.chapterTitle}}</h1>
              </div>

              <template v-for="threeItem in twoItem.children">

              <section class="list" :data-course="JSON.stringify(item)" :data-chapter="JSON.stringify(twoItem)" :data-chaptertwo="JSON.stringify(threeItem)" @click="openNoteDetails" :data-id="threeItem.id" v-if="threeItem.nodeNum!=0">
                <div>
                  <h1>{{threeItem.chapterTitle}}</h1>
                  <i>{{threeItem.nodeNum}}</i>
                </div>

              </section>

              </template>

            </section>

           </template>

        </template>
        <img class="no-data" v-show="this.sectionList && this.sectionList.length === 0 || this.sectionList.nodeNum == 0" src="../../../assets/img/404.svg"/>
			</div>

		</main>

		<photoAlbum :pic-list="picList" v-show="isShowList" @closeBigPic="closeBigPic"></photoAlbum>

	</div>

</template>

<script>

import SlideRefresh from '../../../components/Comm/SlideRefresh';
import photoAlbum from '../../../components/Comm/photoAlbum';
import {
	getCourseNoteList,
	getNoteList,
	getNoteDetails,
	searchhNote
} from '../../../api/port';

export default {

	components: {
		photoAlbum,
		SlideRefresh
	},

	data() {
	    return {
			defaultAct: 0,
      courseInfo: {},//课程信息
      sectionList: [],//我的笔记列表
      sectionAllList: [],//全部笔记列表
			navList: [{
		    name: '全部笔记',
		   },{
		    name: '我的笔记',
		   }
		  ],
	    searchWord: '',
	    searchData:'',
	    page: 1,
	    params:{},
	    self: 0,
			isShowList: false, // 是否显示大图
			picList: [], // 图片列表
      meFlag: false,
    }
	},

	created() {

    this.courseInfo = this.$route.query;

		let allNoteList = this.$store.getters.getCourseNoteListAll;

		//获取全部笔记列表
		if(!allNoteList.children){
			this.getAllNote();
		}else{
			this.sectionAllList = allNoteList;
		}

	},

	mounted() {
		document.documentElement.scrollTop = this.webApi.getCookie('notePageTop');
		this.webApi.setCookie('notePageTop', 0)
	},

  methods: {

	 topStatusChange(status) {
		 if(status == 'loading') this.getAllNote();
	 },


	// 打开大图
	 handleOpenBigPic(ev) {

		 let oUl = ev.target.parentNode;

		 if(oUl.dataset.pic) this.picList = oUl.dataset.pic.split(',').map(item => `${this.webApi.cdnImgUrl}${item}`);
		 this.isShowList = true;

	 },

	 // 关闭大图
	 closeBigPic(off) {
		 this.isShowList = off;
	 },

   set_index(index) {

		 this.defaultAct = index;
		 this.self = index;

      if(!this.meFlag){
				this.meFlag = true;
				this.getMeNote();
      }

   },
  		showSearchBar() {
            this.$router.push({
            path: `/note/search`,
          });
        },
        hideSearchBar() {
            $('.search-bar').hide();
            window.location.reload();
        },//提问
        new_answer() {
        	this.$router.push({
    				path: `/note/selected`,
    			});
        },//搜索
        goSearch() {
        	this.params.keyWords = this.webApi.isEmpty(this.$refs.searchWord.value) ? '' : this.$refs.searchWord.value;

        	if(this.params.keyWords == ''){
        		this.webApi.alert('请输入搜索关键字');
        	}
        	this.get_dt(1,this.self)

        },
        get_dt(page,self) {
        	this.params.token = this.webApi.getCookie('token');
        	this.params.findType = 2;
        	this.params.pageNo = page;
        	this.params.pageSize = 10;
        	this.webApi.loadingData();
        	searchhNote(this.params)

    			.then(res =>{

						this.webApi.closeLoadingData();

    		      if(res && res.state == 'success'){


    		          this.searchData = {key1:res,page:page,keyword:this.params.keyWords}

    		          this.getDate(page,self)

    		      }else{
    						this.webApi.alert('网络异常，请稍后再试');
    					}

    		    })
        },

				// 获取全部课程笔记列表
        getAllNote(){

          //搜索判断,用于第一次搜索结果重新给模板页面赋值
          if(!this.webApi.isEmpty(this.searchData)){
            let data = this.searchData;
                let total = data.key1.totalCount;
                let keyword = data.keywords;

                if (this.webApi.isEmpty(data.key1.data)||total==0) {
                  this.webApi.alert("暂无数据")
                  // $('#content').html('');
                  // $('body').addClass('null');
                  return false;
                }
                this.exchangeList = data.key1.data;
                this.setListData(this.exchangeList);

                return false;
          }
          //获取课程信息
          // this.courseInfo = JSON.parse(this.webApi.getCookie('getCourseNoteInfo'));

          // alert(JSON.stringify(this.courseInfo))
          let param = {};
          param.self = 0;
					param.pageNo = this.page;
          param.courseid= this.courseInfo.courseId;
          param.categoryId= this.courseInfo.categoryId;
          param.subjectId= this.courseInfo.subjectId;
          //
          // param.courseid= "ff8080814dad5062014db32051b801a2";
          // param.categoryId= this.courseInfo.categoryId;
          // param.subjectId= this.courseInfo.subjectId;

          param.token = this.webApi.getCookie('token');

          this.webApi.loadingData();

          getCourseNoteList(param)

          .then(res =>{

						this.webApi.closeLoadingData();

            if(!res || res.state != 'success'){
							 this.webApi.alert('网络异常，请稍后再试');
							 return false;
            }

						this.sectionAllList = res.data;

						this.$store.commit('CHANGE_COURSE_NOTE_LIST_ALL', this.sectionAllList);

          })

        },

				//获取我的课程笔记列表
        getMeNote() {

        	//搜索判断,用于第一次搜索结果重新给模板页面赋值
        	if(!this.webApi.isEmpty(this.searchData)){
        		let data = this.searchData;
              	let total = data.key1.totalCount;
              	let keyword = data.keywords;

              	if (this.webApi.isEmpty(data.key1.data)||total==0) {
              	  this.webApi.alert("暂无数据")
                  // $('#content').html('');
                  // $('body').addClass('null');
                  return false;
              	}
              	this.exchangeList = data.key1.data;
		            this.setListData(this.exchangeList);

              	return false;
        	}

          //获取课程信息
          // this.courseInfo = JSON.parse(this.webApi.getCookie('getCourseNoteInfo'));
          // this.courseInfo = this.$route.query;

          console.log(JSON.stringify(this.courseInfo))
        	let param = {};
	        param.self = 1;
	        param.courseid= this.courseInfo.courseId;
          param.categoryId= this.courseInfo.categoryId;
          param.subjectId= this.courseInfo.subjectId;
          //
          // param.courseid= "ff8080814dad5062014db32051b801a2";
          // param.categoryId= this.courseInfo.categoryId;
          // param.subjectId= this.courseInfo.subjectId;
	        param.token = this.webApi.getCookie('token');

          this.webApi.loadingData();

    			getNoteList(param)

    			.then(res =>{

						this.webApi.closeLoadingData();

						if(!res || res.state != 'success') {
							this.webApi.alert('网络异常，请稍后再试')
							return false;
						}


    		    	this.sectionList = res.data.filter(item => item.courseId == this.courseInfo.courseId);

    		    })
        },
        openNoteDetails(ev) {// 打开详情

					this.webApi.setCookie('notePageTop', document.documentElement.scrollTop);

          let oSection = this.webApi.recursiveParentNode(ev.target, 'section');
          let course = JSON.parse(oSection.dataset.course);
          let chapter = JSON.parse(oSection.dataset.chapter);
          let chapterTwo = JSON.parse(oSection.dataset.chaptertwo);
          let data = {
            courseData:  Object.assign(course, chapter, chapterTwo),
            self: this.self
          }

          this.$router.push({
            path: `/note/detailslist/${encodeURIComponent(JSON.stringify(data))}`,
          });

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
 @import "../../../assets/style/mixin";
.all,.me{
	min-height: 15rem;
  margin-top: 1.4rem;
}
.icon-sousuo{
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
.hide,
.none {
  display: none;
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
  padding: 0 0.5rem;
  margin: 0;
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
  color: #ff366d;
  border: 1px solid #ff366d;
}
.btn-group.btn-success .btn.active {
  background: #ff366d;
}
.s-head {
  background: #fff;
  font-size: 0.32rem;
  height: 1.25rem;
  line-height: 1.25rem;
  position: fixed;
  border-bottom: 1px solid #ddd;
  top: 0;
  width: 100%;
  z-index: 3;
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
  color: #ff366d;
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
.header-home[head='6'] .header-index,
.header-home[head='0'] .header-index,
.header-home[head='1'] .header-course,
.header-home[head='2'] .header-note,
.header-home[head='3'] .header-answer,
.header-home[head='4'] .header-talk,
.header-home[head='5'] .header-cache {
  display: block;
}
.header-black {
  background: #21292b;
}
.header-black .left {
  border-right: 1px solid rgba(0,0,0,0.2);
  box-shadow: 1px 0 0 rgba(255,255,255,0.1);
}
.header-black .left,
.header-black .right {
  color: #fff;
}
.header-white {
  color: #585858;
  background: #fff;
  border-bottom: 1px solid #bbb;
}
.header-white .left-txt {
  left: 0.9rem;
}
.header-nav {
  font-size: 0.3rem;
  width: 100%;
  background: #fff;
}
.header-nav.active {
  display: table;
}
.header-nav.col-3 li {
  width: 33.33%;
}
.header-nav li {
  display: table-cell;
  text-align: center;
  color: #585858;
  width: 50%;
  white-space: nowrap;
}
.header-nav li.active {
  color: #ff366d;
  border-bottom: 3px solid #ff366d;
}
.search-bar {
  display: none;
  height: 1.24rem;
  width: 100%;
  position: absolute !important;
  background: #fff;
  bottom: 0;
  padding: 0.33rem 2.6rem 0 0.3rem;
}
.search-bar input {
  margin: 0;
  border-radius: 0.4rem;
}
.search-bar i,
.search-bar span {
  padding: 0 0.25rem;
}
.search-bar i,
.search-bar .cancel {
  color: #999;
}
input,
textarea {
  outline: none;
}
.input-txt,
.btn,
select {
  /* height: 0.6rem; */
  line-height: 0.6rem;
  border-radius: 0.08rem;
}
.input-txt {
  width: 97%;
  padding: 0 0.3rem;
  font-size: 0.28rem;
  background: transparent !important;
  box-shadow: inset 0 0 3rem 0 #fff;
  border: 1px solid #eee;
  display: block;
  margin: 0.2rem 0;
  color: #ff366d;
  outline: none;
  -webkit-appearance: none !important;
}
/**通用图片组**/
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
  color: #ff366d;
}
.cont-list dd .add-answer i {
  background: #ff366d;
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
.avatar {
  border-radius: 50%;
}
.icon-plus{
	font-size: .24rem;
}
@import "../../../assets/style/mixin";

  $green: #46C1AA;

  .node-ipad-list{

    font-size: 0; line-height: 1;

    .list{

      padding: 0 .75rem;
      border-bottom: 1px solid #f5f5f5;

      > section.list{
        padding-left: 0rem;
        padding-right: 0;
        > section.list{
          padding-left: 0;
          > div span{
            @extend .hide;
          }
          > div h1{
            font-size: .24rem;
          }
        }
      }

      > div{

        @include wh(100%, 1.2rem);
        position: relative; font-size: .26rem;

        span{
          @extend .ab;
          left: -.9rem; padding-left: .45rem;
          &:after{
            content: '\e669';
            @extend .show;
            font-family: 'iconfont';
            @include fc(.32rem, #969696);
            transition: .3s;
            transform: rotate(-90deg);
          }
          top: 50%; transform: translateY(-50%);
         }

         h1{
          color: #7d7d7d;
          display: flex;
          align-items: center;
          text-indent: .2rem;
          font-weight: 0;
          height: inherit;
        }

        i{
          @extend .ab;
          right: 0; top: 50%; transform: translateY(-50%);
          @include fc(.24rem, #969696);
          font-style: normal;
          &:before{
            content: '\e609';
            font-family: 'iconfont';
          }
        }

      }

    }

    .list-wrap{

      background-color: #fff;

      > h1{
        @include wh(100%, 1.2rem);
        @include fc(.32rem, $green);
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0 .75rem 0 .3rem;
        background-color:  #f7f7f7;
      }

    }

    header.head{

      position: relative;
      @include wh(100%, 1.05rem);
      border-bottom: 1px solid #B9B9B9;
      background-color: #fff;

      h1{
        @extend .flexCenter;
        @include fc(.3rem, #1D1D1D);
        height: inherit;
      }

     }

     .state-edit{
      @extend .ab;
      right: .35rem; top: 50%; transform: translateY(-50%);
      font-family: 'iconfont';
      a{
        color: $green;
        &:nth-of-type(1){
          font-size: .3rem;
          margin-right: .2rem;
          transform: translate3d(0,.2rem,0);
        }
        &:nth-of-type(2){
          font-size: .24rem;
        }
      }
    }

    .no-data{
      @extend .ab;
      @include wh(2.4rem, 2.4rem);
      left: 50%; top: 4rem;
      margin-left: -1.2rem;
    }


		.s-head{
			.right li i.icon-new-srarch{
				font-size: .48rem;
				position: relative;
				top: -.03rem; left: .35rem;
			}
			i.icon-search-f{
				margin-right: .4rem;
				top: -.1rem;
	    	position: relative;
			}
		}

		.right{
			span{
				font-size: .34rem;
			}
		}


 }

.no-data{
  @extend .ab;
  @include wh(2.4rem, 2.4rem);
  left: 50%; top: 4rem;
  margin-left: -1.2rem;
}
</style>
