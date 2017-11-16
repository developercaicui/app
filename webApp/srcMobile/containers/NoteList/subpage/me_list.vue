<template lang="html">
  <div class="note-me-list-wrap" ref="noteMeListWrap">
    <note-list :list="meList" :self="params.self"></note-list>
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
        self: 1, // 1代表自己 0代表全部
      },
      meList: [],
    }
  },

  created() {

    Object.assign(this.params, {
      token: this.webApi.getCookie('token')
    });

    this.fetchMeNoteList(this.params);

  },

  computed: {

    ...mapGetters([
      'getMeNoteList'
    ])

  },

  watch: {

    getMeNoteList(data) {
      this.meList = data;
    }

  },

  mounted() {

    let OHTML = document.documentElement;
    let oScreenWidth = OHTML.clientWidth || OHTML.getBoundingClientRect().width;

    this.$refs.noteMeListWrap.style.cssText = `width: ${oScreenWidth}px; overflow-x: hidden;`;

  },

  methods: {
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
