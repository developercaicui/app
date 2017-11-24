<template lang="html">

  <main class="search-list-wrap">

    <header class="head">
      <div class="ipt-search">
        <input type="text" placeholder="搜一下" @keyup.13="handleScreen" ref="ipt"/>
        <a href="javascript:;" class="iconfont icon-jia"></a>
      </div>
      <a href="javascript:;" @click="handleCloseSearch">取消</a>
    </header>

    <article class="cont-wrap">
      <details-list :list="list"></details-list>
    </article>
  </main>

</template>

<script type="text/ecmascript-6">

import { searchhNote } from 'IpadApi/port';
import detailsList from "components/NoteDetailsList";

export default {

  components: {
    detailsList,
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },

  watch: {

    isOpen(flag) {

      if(!flag) return;

      setTimeout(() =>{
        this.$refs.ipt.focus();
      }, 600);

    }

  },

  data() {
    return {
      list: [],
    }
  },

  created() {

  },


  methods: {

    // 取消搜索
    handleCloseSearch() {
      this.$emit('closeNoteSearch', false);
    },

    // 监听用户搜索
    handleScreen(ev) {

      if(!ev.target.value) {
        this.webApi.alert('关键词不能为空');
        return;
      }

      this.searchArticle(ev.target.value);

    },

    // 搜索
    searchArticle(keywords) {

      searchhNote({
        token: this.webApi.getCookie('token'),
			  keyWords: keywords,
			  findType: 1,
			  pageNo: 1,
			  pageSize: 20
      })

      .then(res =>{

        if(!res || res.state != 'success'){
          this.webApi.alert('搜索失败，请稍后再试');
          return false;
        }


       let _date;

       this.list = res.data.map(item =>{

          _date = new Date( item.updateTime * 1000 );

          item.newTime = `${_date.getFullYear()}-${this.webApi.isSmallTen(_date.getMonth() + 1)}-${this.webApi.isSmallTen(_date.getDate())}  ${this.webApi.isSmallTen(_date.getHours())}:${this.webApi.isSmallTen(_date.getMinutes())}`;
          item.progress = `${ this.webApi.formatType(item.taskType, item.taskprogress) }`;

          item.imgPath != ',' && item.imgPath.length && (item.allPic = item.imgPath.split(',').map(src => `${this.webApi.cdnImgUrl}${src}`));

          return item;
        });


      });

    }

  }


}
</script>

<style lang="scss" scoped>

@import "../../../assets/style/mixin";

.search-list-wrap{
  position: fixed;
  left: 0; top: 0; bottom: 0; right: 0;
  background-color: #F2F2F2;
  min-height: 100%;
  z-index: 11;

  .head{

    @extend .relative;
    @extend .borderBox;
    height: 1rem;
    padding: .2rem;
    background-color: #fff;
    border-bottom: 1px solid #ddd;

    .ipt-search{
      @extend .relative;
      @extend .borderBox;
      padding: .1rem .2rem;
      margin-right: .8rem;
      background-color: #F2F2F2;
      &:before{
        content: '';
        @extend .show;
        @extend .ab;
        @include wh(2px, .36rem);
        background-color: $themeColor;
        transform: translate3d(0, .02rem,0);
      }
      input{
        @include fc(.28rem, #999);
        @include wh(100%, 100%);
        text-indent: .08rem;
        background-color: rgba(0,0,0,0);
      }
      a{
        @extend .ab;
        right: .16rem; top: 50%;
        @include fc(.16rem, #757575);
        transform: translate3d(0,-50%,0) rotate(45deg);
      }
    }

    > a{
      @extend .ab;
      @include wh(.8rem, 100%);
      @include fc(.26rem, #666);
      @extend .flexCenter;
      right: .15rem; top: 0;
    }


  }

}

.cont-wrap{

  overflow-y: auto;
  background-color: #fff;

}



</style>
