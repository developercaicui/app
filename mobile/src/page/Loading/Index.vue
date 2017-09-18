<template lang="html">

  <div class="g-load"></div>

</template>

<script>


export default {

  data() {
    return {
    }
  },

  created() {

  },

  mounted() {

    this.webApi.setCookie('userInfo', JSON.stringify(this.$route.query));
    this.webApi.setCookie('token', this.$route.query.token);

    this.webApi.getCookie('userInfo') ? this.$router.push('index') : this.webApi.alert('用户登录信息失效');

  },

  methods: {

  }

}

</script>

<style lang="scss" scoped>
</style>
