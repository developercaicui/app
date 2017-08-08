<template lang="html">

  <nav class="comm-nav">
    <router-link to="index" class="active">学习中心</router-link>
    <router-link to="">在线课程</router-link>
    <router-link to="">我的笔记</router-link>
    <router-link to="">我的问答</router-link>
    <router-link to="">我的讨论</router-link>
    <router-link to="">缓冲课程</router-link>
    <router-link to="">设置</router-link>
  </nav>

</template>

<script>
export default {

  data() {
    return {
    }
  },

  methods: {

  }

}
</script>

<style lang="scss" scoped>

  @media screen and (max-width: 768px) {
    @import "../../assets/style/mobile/nav";
  }

  @media screen and (min-width: 769px) {
     @import "../../assets/style/ipad/nav";
  }

</style>
