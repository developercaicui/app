<template lang="html">

  <footer class="tmp-foot">
    <a href="javascript:;" class="iconfont icon-pic" v-show="isOpenUpload" @click.stop="handleOpenUpload">
      <span class="msg-num" v-show="pictureList.length != 0">{{ pictureList.length }}</span>
    </a>
    <div class="select-btn" @click.stop="handleCutStatus" ref="isPublicDiv" v-show="isOpenUpload && isPublicStyle"><span>{{ isPublicText }}</span><i></i></div>
    <section class="pic-upload" v-show="!isOpenUpload">
      <div class="list" v-for="item, index in pictureList">
        <img :src="item.src">
        <a href="javascript:;" class="iconfont icon-guanbi" @click.stop="removeThisPic" :data-index="index"></a>
      </div>
      <div class="iconfont add" @click.stop="handleUploadBtn" v-show="pictureList.length < 5"><span>&#xe633;</span></div>
    </section>

    <input type="file" multiple="multiple" accept="image/*" @change="changeLoadPicture" ref="iptFile" class="ipt-file">


  </footer>

</template>

<script type="text/ecmascript-6">

import { fileUpload } from 'IpadApi/port';

export default {

  props: {
    picList: {
      type: Array,
      default: []
    },
    isStartUpload: {
      type: Boolean,
      default: false
    },
    isPublicStyle: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      pictureList: [], // 图片列表
      isOpenUpload: true,
      isPublicText: '公开',
      isPublic: 1,
    }
  },

  watch: {

    isStartUpload(flag) {
      flag && this.startUploadPic();
    },

  },

  created() {
    this.pictureList = this.picList;
  },

  methods: {

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

    // 打开上传
    handleOpenUpload() {
      this.isOpenUpload = false;
    },

    // 删除当前照片
    removeThisPic(ev) {
      this.pictureList = this.pictureList.filter((item, index) => index != ev.target.dataset.index);
    },

    // 关闭当前组件
    handleCloseUpload() {
      this.isOpenUpload = true;
    },

    // input控件发生变化
    changeLoadPicture(ev) {

      let file = this.$refs.iptFile.files;
			let i = 0, len = file.length;
			let allLen = this.pictureList.length || 0;

      if(file.length+allLen > 5) {
        this.webApi.alert('抱歉，图片最多只可上传5张！')
        return;
      }

			for ( i=0; i<len; i++ ) {

				let fileData = file[i];
				let reader = new FileReader();

        try{
          reader.readAsDataURL(fileData);
        }catch(e) {
          if(__DEV__) console.log(e);
        }

				reader.onload = (evt) =>{

					this.pictureList.push({
						src: evt.target.result,
            isFile: true,
						file: fileData
					});

	      }

			}

    },

    // 委托触发INPUT控件
		handleUploadBtn() {

			if(this.pictureList.length >= 5) {
				this.webApi.alert('最多可上传5张图片');
				return false;
			}

			this.$refs.iptFile.click();

		},

    // 开始上传
    startUploadPic() {

      let i = 0, _this = this;
      let params = {
        isPublic: this.isPublic,
        state: 'success',
        imgPath: []
      };


      function sendUpload(data) {
        _this.callUpload(_this.pictureList[i], callback);
      }

      function callback(path) {

        params.imgPath.push(path)

        i++;

        if(i < _this.pictureList.length) {
          sendUpload(_this.pictureList[i]);
        }else{
          params.imgPath.map(item =>{
            if(!item || typeof item != 'string') params.state = 'error';
          });
          params.imgPath = params.imgPath.join(',');
          _this.$emit('load-upload', params);
        }


      }

      sendUpload(this.pictureList[i]);

    },

   callUpload(data, cd) {

      let _data = {};

      if (!data.isFile) {
        cd(data.src.replace(this.webApi.cdnImgUrl, ''))
        return;
      }

      // 压缩
      this.webApi.pictureCompress(data.file, (newFile, name) =>{

        let _formData  = new FormData();

        _formData.append('token', this.webApi.getCookie('token'));
        _formData.append('file', newFile, name);

        this.webApi.loadingData(`图片上传中...`);

        // 上传
        fileUpload(_formData).then(res =>{
           this.webApi.closeLoadingData();
           res && res.state == 'success' ?  cd(res.data[0].storeFileUrl) : cd(null) ;
        });

      });

    },

  }

}

</script>
<style lang="scss" scoped>

@import "../../assets/style/mixin";


.tmp-foot{

  position: fixed;
  left: 0; right: 0; bottom: 0;

  > section{
    background-color: #fff; padding: .3rem;
  }
  .icon-pic{
    @include fc(.3rem, #cfb9be);
    display: inline-block; transform: translate3d(0,-.2rem,0);
    margin-left: .3rem; margin-bottom: -.3rem;
  }
  .list{
    @extend .relative;
    @include wh(2.15rem, 2.15rem);
    a{
      @extend .ab;
      @extend .flexCenter;
      @include wh(.5rem, .5rem);
      @include fc(.2rem, #fff);
      border-bottom-left-radius: .06rem;
      background-color: rgba(0,0,0, .7);
      z-index: 2;
      right: 0; top: 0;
    }
    img{
      @include wh(100%, 100%);
    }
  }
  .add{
    @include wh(2.15rem, 2.15rem);
    @include fc(1rem, #E0E0E0);
    @extend .relative;;
    border: 1px dashed #B2B2B2;
    display: inline-block;
    overflow: hidden;
    span{
      @extend .show;
      transform: rotate(-45deg) translate3d(0.15rem, 0.35rem, 0);
    }
  }

  .pic-upload{
    width: 100%;
    .list{
      display: inline-block;
      margin-right: .22rem; margin-bottom: .22rem;
      &:nth-of-type(3n){
        margin-right: 0;
      }
    }
  }

  .msg-num{
    @include wh(.3rem, .3rem);
    @include fc(.24rem, #fff);
    @extend .flexCenter;
    @extend .ab;
    padding: .1rem;
    overflow: hidden;
    border-radius: 100%;
    transform: scale(.8) translate3d(.25rem, -.5rem, 0);
    background-color: #ff6b2a;
  }

  .ipt-file{
    @extend .ab;
    left: 1rem; top: 5rem;
    @include wh(0, 0);
    overflow: hidden;
    left: -99rem; top: -99rem;
  }


  .select-btn{
    @extend .ab;
    @include wh(1.05rem, .4rem);
    right: .3rem; bottom: .17rem;
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
      background-color: $themeColor;
      span{
        justify-content: flex-end;
      }
      i{
        transform: translate3d(-.68rem,0,0);
      }
    }
  }

}

</style>
