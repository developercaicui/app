<template lang="html">
  <div class="note-all-list-wrap" ref="noteAllListWrap">
    <slide-refresh @top-status-change="topStatusChange">
      <note-list :list="allList" :self="params.self"></note-list>
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
        self: 0, // 1代表自己 0代表全部
        courseid: 'ff8080814dad5062014db32051b801a2',
      },
      isNoData: false,
      allList: [],
    }
  },

  created() {

    Object.assign(this.params, {
      token: this.webApi.getCookie('token')
    });

    if (this.getAllNoteList.length == 0)
      this.fetchAllNoteList(this.params);
    else
      this.allList = this.getAllNoteList;

  },

  computed: {
    ...mapGetters([
      'getAllNoteList'
    ])
  },

  mounted() {

    let OHTML = document.documentElement;
    let oScreenWidth = OHTML.clientWidth || OHTML.getBoundingClientRect().width;

    this.$refs.noteAllListWrap.style.cssText = `width: ${oScreenWidth}px; overflow-x: hidden;`;

  },


  watch: {

    getAllNoteList(data) {
      this.allList = data;
    },

    allList(list) {
      this.isNoData = list.length == 0 ? true : false ;
    }

  },


  methods: {

    topStatusChange(status) {
      status == 'loading'  && this.fetchAllNoteList(this.params);
    },

    ...mapActions([
      'fetchAllNoteList'
    ])
  }


}
</script>

<style lang="scss" scoped>

.note-all-list-wrap{
  position: relative;
  float: left; height: 100%;
  overflow-y: auto;
}

</style>
