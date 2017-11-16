<template lang="html">

  <div class="node-details-wrap" ref="nodeDetailsWrap">

    <header class="head">
      <a href="javascript:;" class="iconfont icon-article-back" @click="handleBackList"></a>
      <span>课程笔记</span>
    </header>

    <main class="details">
      <h1>{{ data.chaptername }}</h1>
      <p>{{ data.contentSummary }}</p>
      <div class="pic-list" v-for="item, index in data.allPic" :data-index="index" @click="openPreviewPic">
        <figure>
          <img :src="item"/>
        </figure>
      </div>
      <time>{{ data.newTime }}  {{ data.nikeName }}</time>
    </main>

    <footer class="nav">
      <a href="javascript:;" class="iconfont icon-bianji1" @click="handleEditNote"> 编辑</a>
      <a href="javascript:;" class="iconfont icon-shanchu" @click="handleRemoveNote"> 删除</a>
    </footer>

    <!-- <PicPreview></PicPreview> -->
  </div>

</template>

<script type="text/ecmascript-6">

import { removeNoteDetails } from 'IpadApi/port';

export default {

  data() {
    return {
      data: {
        isEdit: true,
        list: [],
      }
    }
  },

  created() {
    this.data = Object.assign(this.data, JSON.parse(this.$route.params.data));
    this.data.allPic && this._picListInit();
  },

  methods: {

    // 图片列表初始
    _picListInit() {

      let _list = [];

      this.data.allPic.map(item =>{

        let newImg = new Image();

        newImg.onload = function(){
          _list.push({
            src: item,
            w: newImg.width,
            h: newImg.height
          });
        }

        newImg.src = item;

      });

      this.list = _list;


    },

    // 打开预览图片
    openPreviewPic(ev) {
      this.$preview.open((this.webApi.recursiveParentNode(ev.target, 'div')).dataset.index, this.list);
    },

    // 返回上一级
    handleBackList() {
      this.$router.go(-1);
    },

    // 删除笔记
    handleRemoveNote() {

      this.webApi.loadingData('删除中');

			removeNoteDetails({
				id: this.data.id,
			  token: this.webApi.getCookie('token'),
				type: "note",
			})

			.then(res =>{

				this.webApi.closeLoadingData();

				if(!res || res.state != 'success'){
					this.webApi.alert('删除失败');
					return false;
				}

				this.webApi.alert('删除成功, 即将跳转', 1500);

				setTimeout(() =>{
					this.$router.go(-2);
				}, 1000);


			})

    },

    // 编辑笔记
    handleEditNote() {

      this.$router.push({
				path: `/note/edit/${encodeURIComponent(JSON.stringify(this.data))}`,
			});

    },

  }


}
</script>

<style scoped lang="scss">

@import "../../assets/style/mixin";

.node-details-wrap{
  font-size: 0; line-height: 1;
  height: 100%;
  overflow-y: auto;
  background-color: #f3f3f3;
}

.nav{
  position: fixed;
  left: 0; right: 0; bottom: 0; background-color: #fff;
  height: 1rem;
  display: flex;
  border-top: 1px solid #DCDCDC;
  a{
    @include fc(.34rem, $themeColor);
    @extend .flexCenter;
    flex: 1;
    &:first-of-type{
      border-right: 1px solid #DCDCDC;
    }
  }
}

.head{

  @extend .relative;
  text-align: center;
  height: 1rem; border-bottom: 1px solid #D6D6D6;
  @extend .flexCenter;
  background-color: #fff;

  span{
    @include fc($headerSize, #202020);
  }
  a{
    @extend .ab;
    @include wh(.9rem, .9rem);
    @include fc(.4rem, $themeColor);
    @extend .flexCenter;
    &:nth-of-type(1){
      left: 0;
    }
  }

}

.details{
  margin-top: .34rem;
  background-color: #fff;
  border-top: 1px solid #E5E5E5;
  border-bottom: 1px solid #E5E5E5;
  padding-bottom: .54rem;
  margin-bottom: 1.26rem;

  h1{
    @include fc(.3rem, #999);
    @extend .text-ellipsis;
    padding: .5rem .4rem;
    border-bottom: 1px solid #E5E5E5;
  }
  p{
    @include fc(.26rem, #8B8B8B);
    padding: .54rem .4rem 0;
    line-height: 1.5;
  }
  time{
    margin-top: .4rem;
    padding: 0 .4rem;
    text-align: right;
    @extend .show;
    @include fc(.24rem, #999);
  }

}

.pic-list{
  padding: 0 .4rem;
  figure{
    margin-top: .3rem;
  }
  img{
    width: 100%;
  }
}


</style>
