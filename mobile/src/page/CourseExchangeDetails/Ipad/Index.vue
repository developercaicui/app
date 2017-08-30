<template lang="html">


	<div class="exchange-wrap-ipad">

		<main>

			<!--头部-->
		    <div class="s-head">
		      <div @click="closeMe()" class="left"><i class="icon-back">&#xe600;</i></div>
		      <div class="center">交流详情（未回复）</div>
		      <div class="right"><i id="del" onclick="del();" class="icon-trash icon-icon_delete">&#xe618;</i></div>
		    </div>
	
		</main>


	</div>

</template>

<script>

// import { getExchangeDetails } from '../../../api/port';

export default {

	data() {
	    return {
			data: []
	    }
	},

	mounted() {
		this.data = JSON.parse(this.$route.params.data);
		console.log(this.data)
	},

  
  methods: {

		// 打开详情
		// openDetails(ev) {

		// 	let oSection = this.webApi.recursiveParentNode(ev.target, 'section');

		// 	this.webApi.loadingData();

		// 	getExchangeDetails({
		// 		verTT: new Date().getTime(),
		// 		token: this.webApi.getCookie('token'),
		// 		id: oSection.dataset.id,
		// 		pageNo: 1,
		// 		pageSize: 20,
		// 	})

		// 	.then(res =>{

		// 		this.webApi.closeLoadingData();

		// 		if(!res || res.state != 'success'){
		// 			this.webApi.alert('打开详情失败，请稍后再试');
		// 			return false;
		// 		}

		// 		this.$router.push({
		// 			path: `details/${encodeURIComponent(JSON.stringify(res.data))}`,
		// 		});

		// 	})

		closeMe() {
			this.$router.go(-1);
		}

	},


}

</script>

<style lang="scss" scoped>
.icon-back{
  font-family:"iconfont";
  font-size:0.26rem;
  font-weight: 700;
  color: #00a185;
  speak: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 100%;
  vertical-align: middle;
}
.icon-icon_delete{
  font-family:"iconfont";
  font-size:0.26rem;
  font-weight: 700;
  color: #00a185;
  speak: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 100%;
  vertical-align: middle;
}
.s-head {
  background: #fff;
  font-size: 0.32rem;
  height: 1.25rem;
  line-height: 1.25rem;
  position: relative;
  border-bottom: 1px solid #ddd;
}
.s-head .left,
.header .left,
.s-head .right,
.header .right,
.s-head .left-txt,
.header .left-txt {
  position: absolute;
  padding: 0 0.3rem;
  bottom: 0;
}
.s-head .left,
.header .left,
.s-head .right,
.header .right {
  color: #00a185;
  font-size: 0.28rem;
}
.s-head .left .red,
.header .left .red,
.s-head .right .red,
.header .right .red {
  color: #f00;
  border: 1px #f00 solid;
}
.s-head .left i,
.header .left i,
.s-head .right i,
.header .right i {
  font-size: 0.36rem;
  margin: 0 0.1rem;
}
.s-head .left-txt,
.header .left-txt {
  left: 1.3rem;
}
.s-head .left,
.header .left {
  left: 0;
}
.s-head .left .icon-arrow-left,
.header .left .icon-arrow-left {
  color: #585858;
}
.s-head .right,
.header .right {
  right: 0;
}
.s-head .right li:not(.none),
.header .right li:not(.none) {
  display: inline-block;
  margin-left: 0.4rem;
}
.s-head .center,
.header .center {
  text-align: center;
  color: #000;
  width: 60%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
