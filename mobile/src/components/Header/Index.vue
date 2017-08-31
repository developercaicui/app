<template lang="html">

	<div>
		<HeaderIpad :msg-list="msgList" v-show="isIpad"></HeaderIpad>
		<HeaderMobile :msg-list-data="msgListData" v-show="isMobile"></HeaderMobile>
	</div>

</template>

<script>

import HeaderIpad from './Ipad';
import HeaderMobile from './Mobile';

export default {

	components: {
		HeaderMobile,
		HeaderIpad
  },

  data() {
    return {
			isIpad: false,
      isMobile: false,
			msgList: [],
			msgListData: { // 消息接口数据
				list: 0,
				totalCount: 0
			},
    }
  },

	created() {

			this.webApi.loadingData();

	},

	mounted() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;


		this.webApi.closeLoadingData();


	},


  methods: {


  }

}

</script>

<style lang="scss" scoped>

</style>
