<template lang="html">

  <div class="node-list-details-wrap">

    <header class="head">
      <a href="javascript:;" class="iconfont icon-article-back" @click="backPreviousPage"></a>
      <span>课程笔记</span>
      <a href="javascript:;" class="iconfont icon-jia"></a>
    </header>

    <main class="cont">
      <details-list :list="getNoteDetailsList"></details-list>
    </main>

  </div>

</template>

<script type="text/ecmascript-6">

import { mapActions, mapGetters } from 'vuex';
import detailsList from "components/NoteDetailsList";

export default {

  components: {
    detailsList,
  },

  data() {
    return {
      params: {},
      list: [],
    }
  },

  computed: {

    ...mapGetters([
      'getNoteDetailsList'
    ])

  },

  created() {

    this.params = JSON.parse(this.$route.params.data || {});

    this.fetchNoteDetailsList({
      pageNo: 1,
      pageSize: 20,
      charpterid: this.params.id,
      ordertype: 1,
      self: this.params.self,
      token: this.webApi.getCookie('token')
    });

  },

  watch: {

  },


  methods: {


    // 返回上一页
    backPreviousPage() {
      this.$router.go(-1);
    },

    ...mapActions([
      'fetchNoteDetailsList'
    ])


  }


}
</script>

<style scoped lang="scss">

@import "../../assets/style/mixin";

.node-list-details-wrap{
  font-size: 0; line-height: 1;
  min-height: 100%;
  overflow-y: auto; overflow-x: hidden;
}

.head{

  text-align: center;
  height: 1rem; border-bottom: 1px solid #EFEFEF;
  @extend .flexCenter;

  span{
    @include fc($headerSize, #202020);
  }
  a{
    @extend .ab;
    @include wh(.9rem, .9rem);
    @include fc(.36rem, $themeColor);
    @extend .flexCenter;
    &:nth-of-type(1){
      left: 0; font-size: .44rem;
    }
    &:nth-of-type(2){
      right: 0;
    }
  }

}




</style>
