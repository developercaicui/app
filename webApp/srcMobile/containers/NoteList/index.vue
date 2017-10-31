<template lang="html">

  <div class="node-list-wrap">

  </div>

</template>

<script type="text/ecmascript-6">

import allList from './subpage/all_list';
import meList from './subpage/me_list';
import { mapMutations, mapGetters, mapActions } from 'vuex';

export default {

  components: {
    meList,
    allList
  },

  data() {
    return {

    }
  },

  computed: {

    ...mapGetters([
       'getMeList'
    ]),


  },

  created() {




    this.getNoteMeList();

    // this.setMeList([2,3,4]);


    console.log(this.getMeList);

  },

  methods: {


    ...mapMutations({
      setMeList: 'SET_ME_LIST'
    }),

    ...mapActions([
      'getNoteMeList'
    ])




  }


}
</script>

<style lang="scss" scoped>
</style>
