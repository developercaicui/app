<template lang="html">
	<transition name='slide-left'>
  		<router-view></router-view>
  	</transition>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="scss" scoped>

.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}

</style>
