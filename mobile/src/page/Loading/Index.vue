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

    this.webApi.delCookie('userInfo');
    this.webApi.delCookie('token');
    this.webApi.delCookie('deviceType');

  },

  mounted() {

    this.webApi.setCookie('userInfo', JSON.stringify(this.$route.query));
    this.webApi.setCookie('token', this.$route.query.token);
    this.webApi.setCookie('deviceType', this.$route.query.deviceType);

    this.webApi.getCookie('userInfo') ? this.$router.push('index') : this.webApi.alert('用户登录信息失效');

  },

  methods: {

  }

}

</script>

<style lang="scss" scoped>
</style>
