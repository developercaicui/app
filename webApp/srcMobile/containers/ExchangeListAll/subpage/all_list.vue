<template lang="html">
  <SlideRefresh @top-status-change="topStatusChange" @bottom-status-change="bottomStatusChange">
      <exchangeList :allList='allList'></exchangeList>
  </SlideRefresh>
</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex';
import exchangeList from 'components/exchangeList';
import SlideRefresh from '../../../base/SlideRefresh';

export default {

  components: {
    exchangeList,
    SlideRefresh,
  },

  data() {
    return {
        allList: [],
        userInfo: {},
    }
  },

  created() {

    this.userInfo = JSON.parse(this.webApi.getCookie('userInfo'));

    this.getDate(1);

  },
  computed: {

    ...mapGetters([
       'getAllExchangeList',
    ]),

  },

  watch: {

    getAllExchangeList(data) {

      // this.updataList([1,2,3])

      // this.$store.commit('GET_ME_EXCHANGE_LIST', _d);

      this.allList = data;

    }

  },
  mounted() {


  },

  methods: {

    // ...mapMutations({
    //   updataList: 'GET_ME_EXCHANGE_LIST'
    // }),
    
    ...mapActions([

      'fetchExchangeList'

    ]),
    //下拉刷新
    topStatusChange(status) {

      if(status == 'loading') {
        
        this.getDate(1);
      }

    },
    //上拉加载更多
    bottomStatusChange(status) {
        if(status == 'loading') {
          this.page++;
          this.getDate(this.page);
        }
    },
    getDate(page) {
        this.fetchExchangeList({
            self: 0,
            type: 3,
            ordertype: 1,
            pageNo: page,
            pageSize: 10,
            subjectId: 'ff808081473905e701476204cb6c006f',
            token: this.userInfo.token,
        });
    },

  }


}
</script>

<style lang="scss" scoped>
</style>
