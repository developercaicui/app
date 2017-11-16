<template lang="html">

  <div class="node-list-wrap" ref="nodeListWrap">

    <header class="head">
      <a href="javascript:;" class="iconfont icon-article-back" @click="backPreviousPage"></a>
      <span>发布新帖</span>
      <a href="javascript:;" @click="searchNoteList">发布</a>
    </header>
  
    <main class="ipt-wrap" style="margin-top:.9rem;">
      <div>
          <div class="talk-type" @click="showMenu">
              <p>{{typeList[currentType]}}</p><i class="iconfont icon-angle-down"></i>
          </div>
          <div class="talk-type-menu" v-show="isShowMenu" @click="selectType">
              <p>{{typeList[menuType]}}</p>
          </div>
          <input type="text" placeholder="输入你的标题">
      </div>
      <div>
        <textarea placeholder="问答、讨论内容"></textarea>
      </div>
    </main>

    <!-- <uploadPicture></uploadPicture> -->

  </div>
</template>

<script>

// import uploadPicture from '../../components/uploadPicture';

export default {

  components: {
    // uploadPicture,
  },

  data() {
    return {
        typeList: ['问答','讨论'],
        currentType: 0,
        menuType: 1,
        isShowMenu: false,
    }
  },

  created() {

  },

  mounted() {


  },

  methods: {

    // 返回上一页
    backPreviousPage() {

      this.$router.go(-1);

    },

    searchNoteList() {

    },

    //切换发帖类型
    selectType(type) {

       let initType = this.currentType;

       this.currentType = this.menuType;

       this.menuType = initType;

       this.isShowMenu = !this.isShowMenu;

    },
    showMenu() {

        this.isShowMenu = !this.isShowMenu;

    }


  }


}
</script>

<style scoped lang="scss">

@import "../../assets/style/mixin";

.node-list-wrap{
  font-size: 0; line-height: 1;
  min-height: 100%;
  overflow-y: auto; overflow-x: hidden;
  background: #f2f2f2;

  .head{
    width: 100%;
    text-align: center;
    height: .9rem;
    @extend .flexCenter;
    background: #fff;
    border-bottom: 1px solid #dddddd;
    position:fixed;
    left: 0;
    top: 0;
    z-index:10;
    span{
      @include fc($headerSize, #000);
      font-weight: bold;
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
        right: 0.3rem;
        font-size: 0.3rem;
        font-weight: bold;
      }
    }

  }
  
  .ipt-wrap{
      background-color: #fff;
      height: 100%;
      > div{
        @extend .relative;
        line-height: .9rem;
        &:nth-of-type(1){
          @include wh(100%, .9rem);
          border-bottom: 1px solid #E4E4E4;
          padding: 0 .1rem;
          input {
            @include fc(.3rem, #333);
            @include wh(5rem, .5rem);
            margin-left: 0.2rem;
            margin-top: -0.15rem;
          }
          .look-all{
            @extend .ab;
            right: .3rem; top: 50%;
            transform: translate3d(0,-50%,0);
            @include fc(.3rem, #333);
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
    }
    .talk-type{
        width: 1.6rem;
        height: 100%;
        text-align: center;
        font-size: 0.3rem;
        font-weight: bold;
        color: $themeColor;
        position: relative;
        display:inline-block;
        p{
          display: inline-block;
          padding-right: 0.1rem;
        }
        &:after{
          content: "";
          width: 0.05rem;
          height: 0.5rem;
          background: #f2f2f2;
          position: absolute;
          right: 0;
          top: 0.2rem;
        }
    }
    
    .talk-type-menu{
        width: 1.7rem;
        height: 100%;
        text-align: center;
        font-size: 0.3rem;
        font-weight: bold;
        color: #999999;
        position: absolute;
        display: inline-block;
        left: 0;
        top: .9rem;
        z-index: 10;
        border: 2px solid #f2f2f2;
        border-top:none;
        border-left:none;
        background: #fff;
        p{
          display: inline-block;
          padding-right: 0.2rem;
        }
    }
}


</style>
