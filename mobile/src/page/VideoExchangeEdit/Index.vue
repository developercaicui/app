<template lang="html">

	<div></div>

</template>

<script>


export default {

		components: {

	  },

	  data() {
	    return {
				data: {
				}
	    }
	  },

		mounted() {

			this.data = {
				clientType: this.$route.query.clientType || 'ipad',
				subjectId:	this.$route.query.subjectId || 'subjectId',
				courseId: this.$route.query.courseId || 'courseId',
				chapterId: this.$route.query.chapterId || 'chapterId',
				chapteName: this.$route.query.chapterName || 'chapterName',
				taskId: this.$route.query.taskId || 'taskId',
				taskType: this.$route.query.videoType || 'videoType',
				taskProgress:	this.$route.query.taskProgress || 0
			};

			this.$router.push({
				path: `/exchange/edit/${encodeURIComponent(JSON.stringify(this.data))}`
			});

		},

	  methods: {


		},

}

</script>

<style lang="scss" scoped>
</style>
