<template lang="html">
  <div class="note-all-list-wrap" ref="noteAllListWrap">
    <note-list :list="allList" :self="params.self"></note-list>
  </div>
</template>

<script type="text/ecmascript-6">

import { mapActions, mapGetters } from 'vuex';
import noteList from 'components/noteList';

export default {

  components: {
    noteList
  },

  data() {
    return {
      params: {
        token: '',
        self: 0, // 1代表自己 0代表全部
        courseid: 'ff8080814dad5062014db32051b801a2',
      },
      allList: [],
    }
  },

  created() {

    Object.assign(this.params, {
      token: this.webApi.getCookie('token')
    });

    this.fetchAllNoteList(this.params);

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

  },


  methods: {
    ...mapActions([
      'fetchAllNoteList'
    ])
  }


}
</script>

<style lang="scss" scoped>

.note-all-list-wrap{
  float: left; height: 100%;
  overflow-y: auto;
  background-color: #f60;
}

</style>
