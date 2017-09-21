<template lang="html">

	<div>
		<Ipad v-if="isIpad" :note-data="noteData" @search-note="searchNoteList"></Ipad>
		<Mobile v-if="isMobile"></Mobile>
	</div>

</template>

<script>

import Ipad from './Ipad';
import Mobile from './Mobile';
import { searchhNote } from '../../api/port';
export default {

	components: {
		Mobile,
		Ipad,
  },

  data() {
    return {
			isIpad: false,
      isMobile: false,
			noteData: {},
    }
  },

	created() {

		this.isIpad = this.$store.getters.getDeviceInfo.isIpad;
		this.isMobile = this.$store.getters.getDeviceInfo.isMobile;

	},


  methods: {

		// 搜索笔记列表
		searchNoteList(data = {}) {


			this.webApi.loadingData('搜索中', { css: 'top: 30%;' });

			searchhNote({
			  token: this.webApi.getCookie('token'),
			  keyWords: data.keywords,
			  findType: 1,
			  pageNo: data.pageNo,
			  pageSize: 10
			})

			.then(res =>{

				this.webApi.closeLoadingData();

				 if(!res || res.state != 'success'){
					 this.webApi.alert('搜索失败，请稍后再试');
					 return false;
				 }


				 this.noteData = {
					 list: res.data,
					 totalCount: res.totalCount
				 };

				 this.noteData.list.map(item =>{

					 let date = new Date(item.updateTime*1000);

					 item.updateTime = `${date.getFullYear()}-${this.webApi.isSmallTen(date.getMonth() + 1)}-${this.webApi.isSmallTen(date.getDate())}  ${this.webApi.isSmallTen(date.getHours())}:${this.webApi.isSmallTen(date.getMinutes())}`;

				 });


			})



		},

  }

}

</script>

<style lang="scss" scoped>

</style>
