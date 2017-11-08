<template lang="html">
  <exchangeList :allList='allList'></exchangeList>
</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex';
import exchangeList from 'components/exchangeList';

export default {

  components: {
    exchangeList
  },

  data() {
    return {
        allList: [],
    }
  },

  created() {

    let userInfo = JSON.parse(this.webApi.getCookie('userInfo'));

    this.fetchExchangeList({
        self: 0,
        type: 3,
        ordertype: 1,
        pageNo: 1,
        pageSize: 10,
        subjectId: 'ff808081473905e701476204cb6c006f',
        token: userInfo.token,
    });

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

    ...mapMutations({
      updataList: 'GET_ME_EXCHANGE_LIST'
    }),
    
    ...mapActions([

      'fetchExchangeList'

    ]),

  }


}
</script>

<style lang="scss" scoped>
</style>
