<template lang="html">

	<div>
		<HeaderIpad :msg-list="msgList" v-show="isIpad"></HeaderIpad>
		<HeaderMobile :msg-list-data="msgListData" v-show="isMobile"></HeaderMobile>
	</div>

</template>

<script>

import HeaderIpad from './Ipad';
import HeaderMobile from './Mobile';
import { getMsgList } from '../../api/port';

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

	mounted() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;

		this.getAllMsgList({
			 verTT: new Date().getTime(),
			 pageNo: 1,
			 pageSize: 99,
			 type: 1,
			 isRead: 0,
			 token: this.webApi.getCookie('token'),
		});


	},


  methods: {

		// 获取所有消息列表
		getAllMsgList(p) {

			getMsgList(p)

			.then(res =>{

				if(!res || res.state != 'success'){
					// 失败
				}

				let {data: data, totalCount: totalCount} = res;
				let _obj = document.createElement('div');

				this.msgList = data;
				this.msgList.map(item => {

					let _date = new Date(item.sentTime*1000)
					item.time = `${_date.getFullYear()}-${_date.getMonth()+1}-${_date.getDate()}  ${this.webApi.isSmallTen(_date.getHours())}:${this.webApi.isSmallTen(_date.getMinutes())}   	${item.sender}`
					_obj.innerHTML = item.content;
					item.content = _obj.innerText;
				});

				this.msgListData = {
					list: this.msgList,
					totalCount: totalCount
				};


			})

		},

  }

}

</script>

<style lang="scss" scoped>

</style>
