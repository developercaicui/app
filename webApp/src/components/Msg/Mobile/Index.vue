<template lang="html">

	<div class="msg-list-wrap-mobile" ref="msgListWrap">
		<header>
			<a href="javascript:;" class="back" @click="closeMsgList">&#xe669;</a>
			<h1>消息中心</h1>
		</header>
		<nav>
			<a @touchend="cutList" v-for="(item, index) in todos" :data-index="index" :class="index==tabIndex?'active':''" href="javascript:;">{{item.text}}</a>
		</nav>
		<div class="list-wrap">
			<figure @click.stop="openMsgDetails" v-for="item in msgListData.list" :data-id="item.id">
				<img src="http://cdnimg.caicui.com/upload/avatar/big_ff808081492d486801492d4a28f50004.jpg" />
				<section>
					<h1>{{item.title}}</h1>
					<p>{{item.content.substr(0,30)}}</p>
					<time>{{item.time}}</time>
				</section>
			</figure>
		</div>
	</div>

</template>

<script>

import { getMsgList, updateLogStatus } from '../../../api/port';

export default {

	props: {
    'msg-list-data': [Object],
  },
  data() {
    return {
			todos: [
				{
					text: '公告',
				},{
					text: '消息',
				}
			],
			tabIndex: 0,
    }
  },

	mounted() {

	},

  methods: {


		// 查看消息详情
		openMsgDetails() {

		},

		// 返回首先，关闭列表
		closeMsgList() {
			this.$refs.msgListWrap.classList.remove('msg-list-wrap-mobile-active');
		},

		// 打开消息列表
		openMsgList() {
			this.$refs.msgListWrap.classList.add('msg-list-wrap-mobile-active');
		},

		// 切换消息列表
		cutList(ev) {

			let _obj = ev.target;

			this.tabIndex = _obj.dataset.index || 0;

		},

  }

}

</script>

<style lang="scss" scoped>

 @import "../../../assets/style/mixin";

 .msg-list-wrap-mobile{

	position: fixed;
	left: 0; top: 0; bottom: 0; right: 0;
	background-color: #fff;
	z-index: 19; font-size: 0;
	transition: .5s;
	transform: translate3d(7.5rem, 0, 0);

	&.msg-list-wrap-mobile-active{
		transform: translate3d(0, 0, 0);
	}

	header{

		@include wh(100%, .9rem);
		position: relative;
		padding: 0 .4rem;
		border-bottom: 1px solid #d3d3d3;

		.back{
			position: absolute;
			z-index: 9;
			height: 100%;
			display: flex;
			align-items: center;
			font-family: 'iconfont';
			@include fc(.46rem, #00a683);
		}

		h1{
			@extend .ab;
			@include fc(.32rem, #333);
			@extend .flexCenter;
			left: 0; top: 0; right: 0;
			height: .9rem;
		}

	}

	nav{

		display: flex;
		@include wh(100%, .9rem);
		border-bottom: 1px solid #e2e2e2;

		a{
			@include fc(.28rem, #464646);
			display: flex;
			flex: 1;
			justify-content: center;
			align-items: center;
			border-bottom: 3px solid rgba(0,0,0,0);
			transition: .2s;
			&.active{
				color: #00a683;
				border-bottom: 3px solid #00a683;
			}
		}
	}


	// 消息列表
	.list-wrap{

		height: 100%; padding-bottom: 2rem;
		overflow-y: auto;

		figure{

			position: relative;
			padding: .5rem .25rem .8rem .6rem; border-bottom: 1px solid #e1e1e1;

			&:last-of-type{
				border-bottom-width: 0;
			}

			img{
				@extend .ab;
				@include wh(1rem, 1rem);
				border-radius: 100%;
			}

			section{
				padding-left: 1.6rem;
				h1{
					@include fc(.26rem, #555);
					margin-bottom: .05rem;
				}
				p{
					line-height: 1.4; margin-bottom: .1rem;
				}
				p, time{
					@include fc(.24rem, #555);
				}
				time{
					@extend .ab; color: #a5a5a5;
					left: .62rem;
				}
			}


		}


	}


 }

</style>
