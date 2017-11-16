<template lang="html">

  <div class="new-note-select-section-wrap">

    <header class="head">
      <a href="javascript:;" class="iconfont icon-article-back" @click="handleBackPage"></a>
      <span>选择章节</span>
    </header>

    <main class="list-wrap">


      <template v-for="item in list.chapters">

        <section :data-section="JSON.stringify(item)" class="list" @touchend.stop="isUnfold">
          <div>
            <span class="iconfont icon-angle-down"></span>
            <h1>
              <aside>{{ item.chapterTitle }}</aside>
            </h1>
          </div>

          <template v-for="towItem in item.children">

            <section :data-section="JSON.stringify(towItem)" class="list" @touchend.stop="isUnfold">
              <div>
                <span class="iconfont icon-angle-down" v-show="towItem.children"></span>
                <h1>
                  <aside>{{ towItem.chapterTitle }}</aside>
                </h1>
              </div>

              <template v-for="threeItem in towItem.children">

                <section :data-section="JSON.stringify(threeItem)" class="list" @touchend.stop="isUnfold">
                  <div>
                    <span class="iconfont icon-angle-down" v-show="threeItem.children"></span>
                    <h1>
                      <aside>{{ threeItem.chapterTitle }}</aside>
                    </h1>
                  </div>
                </section>

              </template>

            </section>

          </template>


        </section>

      </template>

    </main>


  </div>

</template>

<script type="text/ecmascript-6">

import { mapActions, mapGetters } from 'vuex';
import { getNewNoteSectionList } from 'IpadApi/port';

export default {

  components: {
  },

  data() {
    return {
      data: {},
      list: [],
    }
  },

  created() {

    this.data = JSON.parse(this.$route.params.data);

    this.fetchData({
      courseId: this.data.courseId
    });

  },

  mounted() {
  },

  methods: {

    handleBackPage() {
      this.$router.go(-1);
    },

    fetchData(params) {

      getNewNoteSectionList(params)

      .then(res =>{

        if(!res && res.state != 'success') {
          res = {
            state: 'error',
            msg: res.msg || '数据异常',
            data: [],
          }
        }

        this.list = res.data[0];
      });

    },


    // 是否展开
    isUnfold(ev) {

      let oSection = this.webApi.recursiveParentNode(ev.target, 'section')
      let oldClassHeight = oSection.getBoundingClientRect().height;
      let data = {
        taskType: 'new',
        isEdit: false,
      }

      delete this.list['chapters'];

      Object.assign(data, this.list, JSON.parse(oSection.dataset.section));

      oSection.classList.contains('list-hide') ? oSection.classList.remove('list-hide') : oSection.classList.add('list-hide') ;

      // 选择此章节，编辑
      if(oldClassHeight == oSection.getBoundingClientRect().height){
        this.$router.push({
          path: `/note/edit/${encodeURIComponent(JSON.stringify(data))}`
        });
      }

    },

    // 返回前一页
    handleBack() {
      this.$router.go(-1);
    }


  }


}
</script>

<style scoped lang="scss">

@import "../../../assets/style/mixin";

.new-note-select-section-wrap{
  font-size: 0; line-height: 1;
  height: 100%;
  @include wh(100%, 100%);
  overflow: hidden;
  background-color: #fff;

  .list-wrap{
    min-height: 100%;
    background-color: #f5f5f5;
    overflow-y: auto;
    .list-hide{
      height: 1.2rem;
      > div > span:before{
        transform: rotate(-180deg);
      }
    }
  }

  .list{

    transition: .3s;
    height: auto; overflow: hidden;

    > section.list{
      padding-left: .4rem;
      padding-right: 0;
      > section.list{
        padding-left: .4rem;
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
      border-bottom: 1px solid #e3e0e0;
      padding: 0 .75rem;

      span{
        @extend .ab;
        left: -.18rem; padding-left: .45rem;
        &:before{
          @extend .show;
          @include fc(.32rem, #969696);
          transition: .3s;
        }
        top: 50%; transform: translateY(-50%);
       }

       h1{
        color: #7d7d7d;
        display: flex;
        align-items: center;
        text-indent: .2rem;
        font-weight: 0;
        @include wh(100%, inherit);
        aside{
          @extend .text-ellipsis;
        }
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



</style>
