<template lang="html">

	<div class="comm-reg-wrap">
		<div style="position:fixed;left:0;right:0;bottom:0;top:0;background-color:rgba(0,0,0,0);z-index:119;">
		<div class="g-data-loading">
			<div class="showbox">
				<div class="loader" style="position:relative;margin:0 auto;width:1rem;">
					<svg class="circular" viewBox="25 25 50 50">
						<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
					</svg>
				</div>
			</div>
			<h1 style="font-size:.25rem;color:#fff;transform: translate3d(0,1.4rem,0);">加载中...</h1>
		</div>
	</div>
	</div>

</template>

<script>

export default {

	  data() {
	    return {
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
	div,h1{margin:0;padding:0;}.g-data-loading{width:2rem;height:2rem;position:fixed;left:50%;top:50%;transform:translate3d(-50%,-50%,0);background-color:rgba(0,0,0,.7);border-radius:5px;text-align:center}.showbox{position:absolute;top:.12rem;bottom:0;left:0;right:0;padding:5%}.loader:before{content:'';display:block;padding-top:100%}.circular{animation:rotate 2s linear infinite;height:100%;transform-origin:center center;width:100%;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto}.path{stroke-dasharray:1,200;stroke-dashoffset:0;animation:dash 1.5s ease-in-out infinite,color 6s ease-in-out infinite;stroke-linecap:round}@keyframes rotate{100%{transform:rotate(360deg)}}@keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes color{0%,100%{stroke:#FF366D}40%{stroke:#FF366D}66%{stroke:#FF366D}80%,90%{stroke:#FF366D}}
}
</style>
