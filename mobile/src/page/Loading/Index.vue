<template lang="html">

</template>

<script>


export default {

  data() {
    return {
    }
  },

  mounted() {

    setTimeout(() =>{
      this.webApi.getCookie('userInfo') ? this.$router.push('index') : this.webApi.alert('用户登录信息失效');
    },2000);

  },

  methods: {

  }

}

</script>

<style lang="scss" scoped>
</style>
