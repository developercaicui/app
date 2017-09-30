<template lang="html">

	<div class="note-wrap-ipad-edit">


		<header class="one-top">
			<a href="javascript:;" @touchend.stop="handleBackSection">&#xe67f;</a>
			<h1>{{ headerTitle }}</h1>
			<div class="state-edit" @touchend.stop="handleSaveNote">
				<a href="javascript:;">&#xe654;</a>
			</div>
		</header>

		<div class="edit">
			<div class="ban" @touchend.stop="handleBackSection">
				<input type="text" v-model="title" readonly="readonly" disabled="disabled" class="ban" ref="titleText">
				<span v-show="!isEdit"></span>
			</div>
			<textarea name="name" v-model="textDetails" placeholder="请输入内容"></textarea>
		</div>


		<footer class="leave-msg">
			<div class="nav">
				<a href="javascript:;" class="upload-pic-btn" @touchend="handleIsUploadPic">&#xe6ab;</a>
				<div class="" @touchend.stop="handleCutStatus" ref="isPublicDiv"><span>{{ isPublicText }}</span><i></i></div>
			</div>
			<div class="upload-details" v-show="isFileOpen">
				<h1>最多可添加五张图片</h1>
				<a href="javascript:;" class="upload-btn" @touchend.stop="handleUploadBtn"><span>+</span></a>
				<ul class="show-list-pic">
					<li v-for="(item, index) in allUploadPic" >
						<img :src="item.src" />
						<a href="javascript:;" :data-index="index" @touchend="handleRemovePic">&#xe642;</a>
					</li>
				</ul>
			</div>
		</footer>

		<input type="file" accept="image/*" @change="handleUploadPic" ref="iptFile" class="ipt-file">
	</div>

</template>

<script>

export default {

  data() {
    return {
			headerTitle: '',
			data: {},
			title: '', // 标题
			textDetails: '', // 内容详情
			allUploadPic: [], // 所有上传的图片
			isPublic: '0',
			allPicPath: '', // 上传图片的路径
			isUploadSuccess: 0,
			isFileOpen: false, // 是否打开上传
			isEdit: false, // 是否是编辑
			noteId: '', // 笔记ID，新建时为空
			subjectId: 'subjectId',
			subjectName: 'subjectName',
			categoryName: 'categoryName',
			categoryId: 'categoryId',
			chapterId: 'chapterId',
			type: '',
			isPublicText: '公开',
			clientType: 'ipad',
			videoType: '',
			taskName: '',
			taskId: '',
			courseName: '',
			taskProgress: 0,
    }
  },

	mounted() {

		this.data = JSON.parse(this.$route.params.data);

		try{

			this.taskName = this.data.taskName || 'taskName';
			this.taskId = this.data.taskId || '';
			this.videoType = this.data.videoType || '';
			this.courseName =  this.data.sectionData.courseName || 'courseName';
			this.taskProgress = this.data.taskProgress || 0;

		}catch(e) {

		}


		// 是否编辑
		if('detailsData' in this.data){
			this.textDetails = this.data.detailsData.content;
			this.title = this.data.detailsData.chaptername;
			this.noteId = this.data.detailsData.id;
			this.isEdit = true;
			this.subjectId = 'subjectId';
			this.subjectName = 'subjectName';
			this.categoryName = 'categoryName';
			this.categoryId = 'categoryId';
			this.chapterId = this.data.detailsData.charpterId;
			this.type = 'edit';
			this.isPublic = this.data.detailsDataisPublic;
			this.clientType = this.data.detailsData.clientType;

			this.data.detailsData.picAllPath.map(src =>{

				this.allUploadPic.push({
					src: `${this.webApi.cdnImgUrl}${src}`,
					path: src,
					file: null
				});

			});

		}else{
			this.title = this.data.sectionData.chapterTitle;
			this.noteId = '';
			this.isEdit = false;
			this.categoryName = this.data.courseData.categoryName;
			this.subjectId = this.data.courseData.subjectId;
			this.subjectName = this.data.courseData.subjectName;
			this.categoryId = this.data.courseData.categoryId;
			this.chapterId = this.data.sectionData.chapterId;
			this.type = 'new';
		}

		this.isPublicText = this.isPublic == 1 ? '私人' : '公开';
		this.$refs.isPublicDiv.className = this.isPublic == 1 ? 'select-btn select-btn-active' : 'select-btn';
		this.headerTitle = this.data.type == 'new' ? '新建笔记 ': '编辑笔记';

		if(this.videoType == 'video' || this.videoType == 'problem') {
			this.title = this.data.taskName;
		}
	},

  methods: {

		// 返回上一页重新选择文章
		handleBackSection() {
			this.videoType == 'video' ? g.closeNewNote() : this.$router.go(-1);
		},

		// 触发上传
		handleUploadBtn() {

			if(this.allUploadPic.length >= 5) {
				this.webApi.alert('最多可上传5张图片');
				return false;
			}

			this.$refs.iptFile.click();
		},

		// 是否打卡上传图片
		handleIsUploadPic() {
			this.isFileOpen = this.isFileOpen ? false : true;
		},

		// 是否公开
		handleCutStatus(ev) {

			let oDiv = this.webApi.recursiveParentNode(ev.target, 'div');

			if(oDiv.classList.contains('select-btn-active')){
				this.isPublicText = '公开';
				oDiv.classList.remove('select-btn-active');
				this.isPublic = '1';
			}else{
				this.isPublicText = '私人';
				oDiv.classList.add('select-btn-active');
				this.isPublic = '0';
			}

		},

		// 上传图片
		handleUploadPic(ev) {

			if(this.$refs.iptFile.files.length > 1) {
			 this.webApi.alert('抱歉，只能上传一张图片');
			 return false;
			}

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

		// 删除这个照片
		handleRemovePic(ev) {

			let removeIndex = ev.target.dataset.index;

			this.allUploadPic = this.allUploadPic.filter((item, index) => index != removeIndex && item);

		},

		// 保存笔记
		handleSaveNote() {

			if(!this.textDetails) {
				this.webApi.alert('标题不能为空')
				return false;
			}

			if(this.allUploadPic.length < 1){
				this.subForm();
				return false;
			}

			this.isUploadSuccess = 0;

			this.allUploadPic.map((item, index) =>{

				if(!item.file) {
					this.allPicPath =  `${this.allPicPath}${item.path},`;
					this.isUploadSuccess++;
					return false;
				}

				let formData = new FormData();

				formData.append(`file`, item.file);
				formData.append('token', this.webApi.getCookie('token'));

				this.$emit('upload-pic', formData, res =>{

					this.allPicPath =  `${this.allPicPath}${res.storeFileUrl},`;
					this.isUploadSuccess++;

					// 成功以后提交表单内容
					if(this.allUploadPic.length == this.isUploadSuccess) this.subForm();

				});

			});


		},

		subForm() {

			this.$emit('submit-data', {
				type: this.type,
				elseType: this.videoType || '',
				data: {
					content:	this.textDetails,   // 内容
					soundPath:	'', // 声音
					clientType:	this.clientType, // 设备类型
					title:	this.videoType == 'video' ? this.taskName : 'title', //
					categoryName:	this.categoryName,
					chapterId: this.chapterId,
					taskType:	this.videoType, // 任务类型
					subjectName: this.subjectName,
					id: this.noteId,
					subjectId:	this.subjectId,
					token:	this.webApi.getCookie('token'), // 用户token
					courseId:	this.data.courseData.courseId,
					chapterName:	this.data.sectionData.chapterName || this.data.sectionData.chaptername || 'chapterName',
					isPublic:	this.isPublic || '0', // 是否公开
					soundLen:	'', // 声音长度
					taskName:	this.taskName,
					taskProgress:	this.taskProgress,
					imgPath:	this.allPicPath, // 图片路径，逗号分隔
					categoryId:	this.categoryId,
					taskId: this.taskId,
					courseName: this.courseName,
				}
			});

		},


  }

}

</script>

<style lang="scss" scoped>

	@import "../../../assets/style/mixin";

	.note-wrap-ipad-edit{

		font-size: 0;
		padding-top: $commTop;
		background-color: $commTopWhite;

		.edit{

			@include fc(.28rem, #ccc);

			textarea{
				width: 96%;
				@include wh(96%, 8.27rem);
				@extend .borderBox;
				@include fc(.27rem, #333);
				padding: .15rem .2rem;
				margin-left: 2%;
				border: 1px solid #eee;
			}

			.ban{
				@include wh(100%, 1rem);
				@extend .borderBox;
				position: relative;
				padding: 0 1%;
				border-bottom: 1px solid #eee;
				margin-bottom: .5rem;

				input{
					@include wh(18rem, .6rem);
					border: none; font-size: .28rem;
					outline: 0; color: #ccc;
					margin-top: .2rem;
				}

				span{
					@extend .ab;
					@extend .flexCenter;
					right: 1rem; top: 50%;
					height: 1rem; display: block;
    			transform: translate3d(0,-.2rem,0);
					&:after{
						@extend .ab;
						content: '\e669';
						font-family: 'iconfont';
						font-size: .4rem;
						transform: rotate(-180deg) translate3d(-.3rem,.05rem,0);
					}
				}

			}


		}


		// 底部留言
		.leave-msg{

			@extend .show;
			position: fixed;
			left: 0; bottom: 0; right: 0;
			border-top: 1px solid #eee;
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
			}
			.upload-pic-btn{
				@extend .ab;
				@include fc(.5rem, $commPink);
				top: .23rem; right: 1.9rem;
				font-family: 'iconfont';
			}
		}

		.select-btn{
			@extend .ab;
			@include wh(1.05rem, .4rem);
			right: .4rem; top: .3rem;
			background-color: #e0e0e0;
			border-radius: .2rem;
			padding: 0 .1rem;
			span{
				@include fc(.24rem, #fff);
				height: inherit;
				display: flex;
				align-items: center;
				justify-content: start-end;
				transform: scale(.8);
				transition: .5s;
			}
			i{
				@extend .show;
				@extend .ab;
				@include wh(.32rem, .32rem);
				background-color: #fff;
				transition: .5s;
				top: .04rem; right: 0;
				border-radius: 100%;
				transform: translate3d(-.05rem,0,0);
			}
			&.select-btn-active{
				background-color: $commPink;
				span{
					justify-content: flex-end;
				}
				i{
					transform: translate3d(-.68rem,0,0);
				}
			}
		}


		.state-edit{
			@extend .ab;
			right: .3rem; top: 50%; transform: translateY(-50%);
			font-family: 'iconfont';
			a{
				@include fc(.7rem, $commPink);
				@include wh(1.5rem, 1.05rem);
				@extend .show;
				text-align: center; line-height: 1.5;
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
		  @include fc(.3rem, #1D1D1D);
			height: inherit;
		}

	}

	.ipt-file{
		@extend .ab;
		left: 1rem; top: 5rem;
		@include wh(0, 0);
		overflow: hidden;
		left: -99rem; top: -99rem;
	}

}


</style>
