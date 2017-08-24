<template lang="html">

  <div class="loading-wrap">
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
  </div>

</template>

<script>

import { getUserInfo } from '../../api/port'

export default {

  data() {
    return {
    }
  },

  created() {

    let userToken = this.webApi.getCookie('token') || null;

    if(!userToken) this.targetPage('login')


    getUserInfo({
      token: userToken
    })

    .then(res =>{

      if(!res || res.state != 'success') this.targetPage('login');
      else this.targetPage('index');

    })


  },

  methods: {

    // 跳转
    targetPage(name = 'login') {
      this.$router.push({
        path: name
      });
    }

  }

}

</script>

<style lang="scss" scoped>

.loading-wrap{
  position: fixed;
  left: 0; top: 0; right: 0; bottom: 0;
  background-color: #fff;
  z-index: 101;
}

.spinner {

	width: 50px;
  height: 50px;
  position: absolute;
	left: 50%; top: 50%;
	transform: translate3d(-50%,-50%,0);
}

.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(14,150,241,.5);
  position: absolute;
  top: 0;
  left: 0;
  animation: sk-bounce 2.0s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

@keyframes sk-bounce {
  0%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}

</style>
