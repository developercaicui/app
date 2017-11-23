<template lang="html">
  <div class="note-me-list-wrap" ref="noteMeListWrap">
    <slide-refresh @top-status-change="topStatusChange">
      <note-list :list="meList" :self="params.self"></note-list>
      <img class="no-data" v-show="isNoData" src="../../../assets/img/404.svg"/>
    </slide-refresh>
  </div>
</template>

<script type="text/ecmascript-6">

import { mapActions, mapGetters } from 'vuex';
import noteList from 'components/noteList';
import slideRefresh from 'base/SlideRefresh';

export default {

  components: {
    noteList,
    slideRefresh
  },

  data() {
    return {
      params: {
        token: '',
        self: 1, // 1代表自己 0代表全部
      },
      isNoData: false,
      meList: [],
    }
  },

  created() {

    Object.assign(this.params, {
      token: this.webApi.getCookie('token')
    });

    this.getMeNoteList.length == 0 ? this.fetchMeNoteList(this.params) : this.meList = this.getMeNoteList;

  },

  computed: {

    ...mapGetters([
      'getMeNoteList'
    ])

  },

  watch: {

    getMeNoteList(data) {
      this.meList = data;
    },

    meList(list) {
      this.isNoData = list.length == 0 ? true : false;
    },

  },

  mounted() {

    let OHTML = document.documentElement;
    let oScreenWidth = OHTML.clientWidth || OHTML.getBoundingClientRect().width;

    this.$refs.noteMeListWrap.style.cssText = `width: ${oScreenWidth}px; overflow-x: hidden;`;

  },

  methods: {

    topStatusChange(status) {
      status == 'loading' && this.fetchMeNoteList(Object.assign(this.params, {isLoad: true}));
    },

    ...mapActions([
      'fetchMeNoteList'
    ])
  }


}
</script>

<style lang="scss" scoped>

@import "../../../assets/style/mixin";

.note-me-list-wrap{
  @include wh(100%, 100%);
  float: left;
  overflow-y: auto;
}

</style>
