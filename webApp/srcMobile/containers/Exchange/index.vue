<template lang="html">
	<transition :name='transitionName'>
  		<router-view class="child-view"></router-view>
  	</transition>
</template>

<script>
export default {
  data () {  
    return {  
      transitionName: ''  
    }  
  },  
  mounted () {  
  },  
  //监听路由的路径，可以通过不同的路径去选择不同的切换效果  
  watch: {  
    '$route' (to, from) {  
    	console.log(to)
      if(to.path == '/exchange/details' || to.path == '/exchange/search' || to.path == '/exchange/newtalk'){  

        this.transitionName = 'jump-right';  

      }else{  

        this.transitionName = 'jump-left'; 

      } 
    }  
  }  
}
</script>

<style lang="scss" scoped>

.child-view {  
  position: absolute;  
  left: 0;  
  top: 0;  
  width: 100%;  
  height: 100%;  
  transition: all .3s cubic-bezier(1,1,0,0);  
} 

.jump-right-enter {  
  opacity: 0;  
  -webkit-transform: translate(100%, 0);  
  transform: translate(100%, 0);  
}  

.jump-right-leave-active {  
  opacity: 0;  
  -webkit-transform: translate(-100%, 0);  
  transform: translate(-100%, 0);  
}  

.jump-left-enter {  
  opacity: 0;  
  -webkit-transform: translate(-100%, 0);  
  transform: translate(-100%, 0);  
}  

.jump-left-leave-active {  
  opacity: 0;  
  -webkit-transform: translate(100%, 0);  
  transform: translate(100%, 0);  
}   
</style>
