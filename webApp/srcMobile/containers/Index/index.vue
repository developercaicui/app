<template lang="html">

  <div class="cookit-info" v-html="cookieTip"></div>

</template>

<script type="text/ecmascript-6">

export default {

  data() {
    return {
      cookieTip: '',
    }
  },

  created() {

    this.webApi.setCookie('userInfo', JSON.stringify(this.$route.query));
    this.webApi.setCookie('token', this.$route.query.token);

    this.cookieTip = `用户信息已添加成功。<br/><br/>Token：${this.$route.query.token}`;

  }

}
</script>

<style lang="scss" scoped>

.cookit-info{
  padding: .5rem; line-height: 1.5;
  font-size: .28rem; color: #f00;
}

</style>
