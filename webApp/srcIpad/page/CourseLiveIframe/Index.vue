<template lang="html">

	<div style="width:100%;height:100%;">
		<form action="https://view.csslcloud.net/api/view/login" id="viewerForm" style="width: 100%;height: 100%;opacity: 0; font-size: 20px;" method="post">
        <div class="mt1">
          <input type="text" placeholder="用户昵称" id="viewername" name="viewername" ref="viewername">
        </div>
        
        <div>
          <input type="text" placeholder="直播密码" id="viewertoken" name="viewertoken" ref="viewertoken">
        </div>
        
         <div class="mt1">
          <input type="text" placeholder="直播间id" id="roomid" name="roomid" ref="roomid">
        </div>

         <div class="mt1">
          <input type="text" placeholder="用户id" id="userid" name="userid" ref="userid">
        </div>

        <div>
          <input type="submit" id="viewerSubmit" class="btn btn-large btn-info" value="进入直播">
        </div>

      </form>
	</div>

</template>

<script>



export default {

  components: {
		
  },

  data() {
    return {
    	urlParam:{},
    }
  },

  created() {

		this.urlParam = this.$route.query;

  },

  mounted() {

	  	this.$refs.roomid.value = this.urlParam.roomid;

	  	this.$refs.userid.value = this.urlParam.userid;

	  	this.$refs.viewername.value = this.urlParam.viewername;

	  	this.$refs.viewertoken.value = this.urlParam.viewertoken; 

		document.getElementById("viewerForm").submit();

  },

  methods: {
  	

  },

}

</script>

<style lang="scss" scoped>

</style>
