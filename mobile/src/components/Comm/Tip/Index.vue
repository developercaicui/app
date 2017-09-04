<template lang="html">

  <div class="small-tip">12</div>

</template>

<script>


export default {

  props: {
    'error-msg': [String]
  },

  data() {
    return {
    }
  },

  created(){

    // this.$emit('small-tip','测试测试');

  },

  methods: {

  }

}

</script>

<style lang="scss" scoped>

@import "../../../assets/style/mixin";

.small-tip{
  position: fixed;
  left: 50%; top: 5%;
  transform: translate3d(-50%, 0, 0);
  @include fc(.26rem, #fff);
  padding: .1rem .2rem;
  min-width: 3.5rem; width: 3.5rem;
  text-align: center;
  background-color: rgba(0,0,0, .7);
  border-radius: 3px;
}

</style>
