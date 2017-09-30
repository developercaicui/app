<template lang="html">

	<div class="exchange-wrap-ipad-edit">


		<header class="one-top">
			<a href="javascript:;" @touchend="handleBack">&#xe67f;</a>
			<h1>{{ headerTitle }}</h1>
			<div class="state-edit">
				<a href="javascript:;" @touchend="handleSaveExchange">&#xe654;</a>
			</div>
		</header>

		<div class="edit">
			<input type="text" v-model="title" readonly="readonly" disabled="disabled" placeholder="请输入标题">
			<textarea v-model="textDetails" placeholder="请输入内容"></textarea>
		</div>

		<footer class="leave-msg">
			<div class="nav">
				<a href="javascript:;" class="upload-pic-btn" @touchend="handleIsUploadPic">&#xe6ab;</a>
				<div @touchend.stop="handleCutStatus" ref="isPublicDiv"><span>{{ isPublicText }}</span><i></i></div>
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

		<input type="file" accept="image/*"  @change="handleUploadPic" name="" value="" ref="iptFile" class="ipt-file">

	</div>

</template>

<script>

export default {

  data() {
    return {
			headerTitle: '发布新帖', // header 字
			title: '', //  标题
			textDetails: '', // 内容
			isFileOpen: false, // 是否打开上传
			isPublicText: '公开', //是否公开
			allUploadPic: [], // 所有上传的图片
			isUploadSuccess: 0, // 图片上传成功数量
			type: 'new',
			allPicPath: '', // 上传图片的路径
			allPicPathHtml: '', // 上传图片的代码段
    }
  },

	mounted() {

		this.data = JSON.parse(this.$route.params.data);

		this.title = this.data.chapteName || '';

		if(this.data.videoType == 'video' || this.data.videoType == 'problem') {
			this.title = this.data.taskName;
		}

	},

  methods: {

		// 上一步
		handleBack() {
			this.data.videoType == 'video' ? g.closeNewNote() : this.$router.go(-1);
		},

		// 是否打卡上传图片
		handleIsUploadPic() {
			this.isFileOpen = this.isFileOpen ? false : true;
		},

		// 触发上传
		handleUploadBtn() {
			this.$refs.iptFile.click();
		},

		// 删除这个照片
		handleRemovePic(ev) {

			let removeIndex = ev.target.dataset.index;

			this.allUploadPic = this.allUploadPic.filter((item, index) => index != removeIndex && item);

		},

		// 选择图片
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


		// 提交
		handleSaveExchange() {

			if(!this.textDetails){
				this.webApi.alert('内容不能为空');
				return false;
			}

			if(!this.title){
				this.webApi.alert('标题不能为空');
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

					this.allPicPathHtml =  `${this.allPicPathHtml}<img src="${res.storeFileUrl}"/>`;
					this.allPicPath = `${this.allPicPath}${res.path},`;

					this.isUploadSuccess++;

					// 成功以后提交表单内容
					if(this.allUploadPic.length == this.isUploadSuccess) this.subForm();

				});

			});

		},

		// 发情save请求
		subForm() {




			this.$emit('submit-data', {
				type: this.type,
				elseType: this.data.videoType || '',
				data: {
					content: `<p>${this.textDetails}</p><br/>${this.allPicPathHtml}`,
			    imgPath: this.allPicPath,
			    title: this.title,
			    clientType: this.data.clientType,
			    subjectId:	this.data.subjectId || '',
					courseId: this.data.courseId || '',
					chapterId: this.data.chapterId || '',
					chapteName: this.data.chapteName || '',
			    token: this.webApi.getCookie('token'),
					taskId: this.data.taskId || '',
					taskType: this.data.taskType || '',
			    taskProgress:	this.data.taskProgress || 0,  //任务进度
			    type: this.taskType == 'video' ? 1 : 0 , // 0是讨论  1是问答
				}
			});

		},

  }

}

</script>

<style lang="scss" scoped>

	@import "../../../assets/style/mixin";

	.exchange-wrap-ipad-edit{

		font-size: 0;
		padding-top: .64rem;

		.edit{

			width: 96%; margin: 2% auto;

			input, textarea{
				border: 1px solid #eee;
				@extend .borderBox;
				@include fc(.24rem, #333);
				padding: .15rem .2rem;
			}

			input{
				@include wh(100%, .6rem);
				margin-bottom: .2rem;
			}

			textarea{
				@include wh(100%, 8.27rem);
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
				top: .23rem; right: .3rem;
				font-family: 'iconfont';
			}
		}



		.state-edit{
			@extend .ab;
			right: .35rem; top: 50%; transform: translateY(-50%);
			font-family: 'iconfont';
			a{
				&:nth-of-type(1){
					@include fc(.7rem, $commPink);
					@include wh(1.5rem, 1.05rem);
					@extend .show;
					text-align: center; line-height: 1.7;
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
		  @include fc(.3rem, #1D1D1D);
			height: inherit;
		}

	}

	.ipt-file{
		@extend .ab;
		@include wh(0, 0);
		overflow: hidden;
		left: -99rem; top: -99rem;
	}

}


</style>
