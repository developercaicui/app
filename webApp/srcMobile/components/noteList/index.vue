<template lang="html">

  <article class="tmp-list-wrap">

    <template v-for="item in list">

      <section class="list-details">
        <h1>{{ item.courseName }}</h1>

        <template v-for="twoItem in item.children">

            <div v-if="twoItem.nodeNum != 0" class="t-list" :data-id="twoItem.id">
              <p @click.stop="shrinkList">{{ twoItem.chapterTitle }}</p>
              <span style="display: none;"class="iconfont icon-bianji">&nbsp;</span>
            </div>

            <template v-for="threeItem in twoItem.children">

              <div v-if="threeItem.nodeNum != 0" class="t-list t-list-three" :data-chapter="JSON.stringify(twoItem)" :data-chaptertwo="JSON.stringify(threeItem)"  @click.stop="openNoteDetails($event, threeItem.isLeaf)" :data-id="threeItem.id">
                <p :data-nodenum="threeItem.nodeNum">{{ threeItem.chapterTitle }}</p>
                <span class="iconfont icon-bianji" v-if="threeItem.nodeNum > 0 && threeItem.isLeaf">{{ threeItem.nodeNum }}</span>
              </div>

              <template v-for="fourItem in threeItem.children">
                <div v-if="fourItem.nodeNum != 0" class="t-list t-list-four" :data-chapter="JSON.stringify(threeItem)" :data-chaptertwo="JSON.stringify(fourItem)" @click.stop="openNoteDetails($event, true)" :data-id="fourItem.id">
                  <p :data-nodenum="fourItem.nodeNum">{{ fourItem.chapterTitle }}</p>
                  <span class="iconfont icon-bianji" v-if="fourItem.nodeNum > 0">{{ fourItem.nodeNum }}</span>
                </div>
              </template>

            </template>

         </template>

      </section>

    </template>

  </article>

</template>

<script type="text/ecmascript-6">


export default {

  props: {
		list: {
			type: Array,
			default: []
		},
    self: {
      type: Number,
      default: 1 // 默认自己
    }
	},


  data() {
    return {
    }
  },

  watch: {

    list() {
    }

  },

  methods: {

    // 打开详情
    openNoteDetails(ev, isOff) {

			let _obj = ev.target;

			if(_obj.dataset.nodenum < 1 || !isOff) return;

			let oDiv = this.webApi.recursiveParentNode(ev.target, 'div');

      this.$router.push({
				path: `/note/detailslist/${encodeURIComponent(JSON.stringify(Object.assign({self: this.self}, JSON.parse(oDiv.dataset.chapter), JSON.parse(oDiv.dataset.chaptertwo))))}`,
			});

		},

  }

}

</script>
<style lang="scss" scoped>

@import "../../assets/style/mixin";

.tmp-list-wrap{
  background-color: #fff;
  padding-bottom: 1.6rem;
}


.list-details{
  h1{
    @include wh(100%, 1.08rem);
    @include fc(.32rem, #202020);
    @extend .textYcenter;
    text-indent: .3rem;
  }
}
.t-list{

  @extend .textYcenter;
  height: 1rem;
  background-color: #fafafa;

  p{
    @include fc(.32rem, #000);
    @extend .text-ellipsis;
    width: 5.9rem;
    text-indent: .2rem;
  }
  span{
    flex: 1;
    text-align: right;
    padding-right: .3rem;
    @include fc(.26rem, $themeColor);
  }

}

.t-list-three{
  padding-left: .4rem;
}

.t-list-four{
  padding-left: .6rem;
}

</style>
