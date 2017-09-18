<template lang="html">

	<div class="comm-reg-wrap">{{ num }}</div>

</template>

<script>

export default {

	  data() {
	    return {
				num: Math.random()
	    }
	  },


		mounted() {

			this.data = {

				courseData: {
					categoryName: this.$route.query.categoryName || 'categoryName',
					subjectId: this.$route.query.subjectId || 'subjectId',
					subjectName: this.$route.query.subjectName || 'subjectName',
					categoryId: this.$route.query.categoryId || 'categoryId',
					courseId: this.$route.query.courseId || 'courseId'
				},

				sectionData: {
					chapterId: this.$route.query.chapterId || 'chapterId',
					chapterTitle: this.$route.query.chapterName || 'chapterName',
					chapterName: this.$route.query.chapterName || 'chapterName',
					courseName: this.$route.query.courseName || 'courseName',
				},

				taskName: this.$route.query.taskName || 'taskName',
				taskId: this.$route.query.taskId || 'taskId',
				taskProgress: this.$route.query.taskProgress || 'taskProgress',

				videoType: this.$route.query.videoType || 'videoType',
				type: 'new',
				vtime: new Date().getTime()
			};


			this.$router.push({
				path: `edit/${encodeURIComponent(JSON.stringify(this.data))}`
			})


		},

	  methods: {


		},

}

</script>

<style lang="scss" scoped>
.comm-reg-wrap{
	font-size: 0; color: 000;
}
</style>
