<template lang="html">

  <article class="tmp-details-list-wrap">

    <section class="list" :data-id="item.id" :data-section="JSON.stringify(item)" v-for="item in list" @click="openDetails">
      <div class="cont">
        <h1>{{ item.contentSummary }}</h1>
        <div class="cont-details">
          <time v-show="item.taskType === 'video'">13:52</time>
          <span>{{ item.nikeName }}</span>
          <time>{{ item.newTime }}</time>
        </div>
      </div>
      <div class="pic" v-if="item.allPic && item.allPic.length > 0">
        <img :src="item.allPic[0]"/>
      </div>
    </section>

  </article>

</template>

<script type="text/ecmascript-6">


export default {

  props: {
		'list': {
			type: Array,
			default: []
		},
	},

  data() {
    return {
    }
  },

  created() {
  },

  mounted() {
  },

  methods: {

    openDetails(ev) {

      let oSection = this.webApi.recursiveParentNode(ev.target, 'section');

			this.$router.push({
				path: `/note/details/${encodeURIComponent(oSection.dataset.section)}`,
			});

    },

  }

}

</script>
<style lang="scss" scoped>

@import "../../assets/style/mixin";

.tmp-details-list-wrap{

  .list{
    @extend .borderBox;
    border-bottom: 1px solid #EFEFEF;
    padding: .4rem .25rem;
    display: flex;
    h1{
      @include fc(.3rem, #666);
      @extend .text-ellipsis;
    }
  }

  .cont-details{
    @include fc(.26rem, #999);
    @include wh(100%, .33rem);
    margin-top: .32rem;
    overflow: hidden;
    white-space: nowrap;
    span{
      @extend .text-ellipsis;
      display: inline-block;
      font-size: .24rem;
      max-width: 1.7rem;
      transform: translate3d(0,.03rem,0);
      margin-right: .2rem;
    }
    time{
      display: inline-block;
      &:nth-of-type(1){
        text-indent: .3rem;
        margin-right: .16rem;
        &:before{
          content: '';
          @extend .ab;
          @extend .show;
          border: .18rem solid rgba(0,0,0,0);
          border-left-color: #999;
          border-radius: .1rem;
          transform: translate3d(0,-.05rem,0);
        }
      }
    }
  }

  .cont{
    width: 100%; overflow: hidden;
  }

  .pic{
    padding-left: .25rem;
    img{
      @include wh(1rem, 1rem);
    }
  }

}


</style>
