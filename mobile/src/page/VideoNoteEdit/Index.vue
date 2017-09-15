<template lang="html">

	<div class="comm-reg-wrap"></div>


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

		watch: {

	    '$route' (to, from) {

		  }

	  },
		
		created() {

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

				taskName: this.$route.query.taskName,
				taskId: this.$route.query.taskId,
				taskProgress: this.$route.query.taskProgress,

				videoType: this.$route.query.videoType,
				type: 'new'

			};

			this.$router.push({
				path: `/note/edit/${encodeURIComponent(JSON.stringify(this.data))}`
			});

		},

	  methods: {


		},

}

</script>

<style lang="scss" scoped>
.comm-reg-wrap{
	font-size: .4rem;
}
</style>
