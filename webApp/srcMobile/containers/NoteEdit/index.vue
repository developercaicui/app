<template lang="html">

  <div class="node-edit-wrap">

    <header class="head">
      <a href="javascript:;" class="iconfont icon-article-back" @click="handleBackPage"></a>
      <span>{{ title }}</span>
      <a href="javascript:;" @click="subForm">发布</a>
    </header>

    <main class="ipt-wrap">
      <div :class="!data.isEdit ? '' : 'title-stop'">
        <input type="text" v-model="params.chapterName" ref="ipt"/>
        <a href="javascript:;" @click.stop="handleBackPage" class="iconfont icon-jiantou-copy-copy look-all" v-if="!data.isEdit"></a>
      </div>
      <div>
        <textarea placeholder="笔记内容" v-model="params.content" @click.stop="handleFocusState" @focus="handleFocusState"></textarea>
      </div>
    </main>

    <uploadPicture ref="uploadPicRef" :isPublicStyle="isPublicStyle" :isStartUpload="isStartUpload" @load-upload="loadUpload" :picList="picList"></uploadPicture>

  </div>

</template>

<script type="text/ecmascript-6">

import { saveNote } from 'IpadApi/port';
import uploadPicture from 'components/uploadPicture';

export default {

  components: {
    uploadPicture,
  },

  data() {
    return {
      addPic: false,
      title: '新建笔记',
      picList: [], // 图片列表
      isStartUpload: false, // 是否开始上传
      isPublicStyle: true, // 选择状态按钮
      data: {
        isEdit: false
      },
      params: {
        content: '',
        chapterName: '',
        token: '',
        clientType: '', //设备类型
        soundPath:	'', // 声音
        title:	'videoType || title',
        categoryName:	'categoryName',
        chapterId: 'chapterId',
        taskType:	'type', // 任务类型
        subjectName: 'subjectName',
        id: '',
        subjectId:	'subjectId',
        courseId: 'courseId',
        isPublic:	0,
        soundLen:	'', // 声音长度
        taskName:	'taskName',
        taskProgress:	'taskProgress',
        imgPath:	'', // 图片路径，逗号分隔
        categoryId:	'categoryId',
        taskId: 'taskId',
        courseName: 'courseName',
        courseId: 'courseId'
      }
    }
  },

  created() {

    this.data = Object.assign(this.data, JSON.parse(this.$route.params.data));

    this.params.clientType = this.webApi.getDeviceType() == 'mobile' ? 'aphone' : 'ipad' ;
    this.params.token = this.webApi.getCookie('token');

  },

  mounted() {
    this.data.isEdit ? this.edit() : this.newNote();
    this.$refs.ipt.setAttribute('disabled', 'disabled');
  },

  methods: {

    // 新建笔记
    newNote() {
      this.params.chapterName = this.data.chapterTitle;
      this.params.taskType = this.data.taskType;
      this.params.title = 'title';
      this.title = '新建笔记';
    },

    // 编辑状态需要初始做的事情
    edit() {
      this.params.chapterId = this.data.charpterId;
      this.params.chapterName = this.data.chaptername;
      this.params.content = this.data.contentSummary;
      this.params.title = 'title';
      this.title = '编辑笔记';
      this.params.imgPath  = this.data.imgPath;
      this.params.taskType = 'edit';
      this.params.courseName = this.data.coursename;

      this.data.imgPath.split(',').map(src =>{


        if(!src && !src.includes('upload')) return;

        this.picList.push({
					src: `${this.webApi.cdnImgUrl}${src}`,
          isFile: false,
					file: null
				});

      });

    },

    // 是否编辑文章
    handleFocusState() {
      this.$refs.uploadPicRef.handleCloseUpload()
    },

    // 返回上一页
    handleBackPage() {
      this.$router.go(-1);
    },

    // 等待上传
    loadUpload(data) {

      let params = {};
      let tip = this.data.isEdit ? '编辑' : '新建';

      this.isStartUpload = false;

      if(data.state == 'error') {
        this.webApi.alert(`${tip}笔记失败，请稍后再试`);
        return;
      }

      Object.keys(this.params).map(item =>{
        for(let attr in this.data) {
          attr != 'taskType' && Object.is(item, attr) && (params[attr] = this.data[attr]);
        }
      });

      delete data["state"];


      Object.assign(this.params, params, data);

      this.webApi.loadingData(`${tip}中`);

      // 保存数据
      saveNote(this.params)

      .then(res =>{

        this.webApi.closeLoadingData();

          if(!res || res.state != 'success'){
            this.webApi.alert(`${tip}笔记失败，请稍后再试！`);
            return;
          }

          this.webApi.alert(`${tip}笔记成功`, 1500);

          setTimeout(() =>{
            this.$router.push(`/note/list`);
          },2000);

      })

    },

    // 提交
    subForm() {
      this.handleFocusState();
      this.isStartUpload = true;
    },

  }


}
</script>

<style scoped lang="scss">

@import "../../assets/style/mixin";

.node-edit-wrap{
  font-size: 0; line-height: 1;
  height: 100%;
  overflow: hidden;
  background-color: #f2f2f2;
}

.head{

  text-align: center;
  height: 1rem;
  @extend .flexCenter;
  border-bottom: 1px solid #ddd;
  background-color: #fff;

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
      right: .2rem; font-size: .3rem;
    }
  }

}

.ipt-wrap{
  background-color: #fff;
  margin-top: .3rem;
  height: 100%;
  > div{
    @extend .relative;
    &:nth-of-type(1){
      @include wh(100%, 1rem);
      border-bottom: 1px solid #E4E4E4;
      padding: 0 .3rem;
      input {
        @include fc(.3rem, #333);
        @include wh(5.6rem, .9rem);
        @extend .text-ellipsis;
      }
      .look-all{
        @extend .ab;
        @extend .flexCenter;
        @include fc(.3rem, #333);
        @include wh(.5rem, 100%);
        right: .3rem; top: 0;
      }

    }
    &:nth-of-type(2){
      @include wh(100%, 80%);
      padding: .3rem;
      textarea{
        @include wh(100%, 90%);
        @include fc(.24rem, #999);
        line-height: 1.5;
      }
    }

  }


  div.title-stop{
    background-color: #eaeaea;
    input{
      color: #a3a0a0;
      background-color: #eaeaea;
    }
  }

}


</style>
