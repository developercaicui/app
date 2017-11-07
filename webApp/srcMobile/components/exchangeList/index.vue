<template lang="html">

  <div id="content" class="talk-warp">
      <div class="my-talk-list"> <!-- 用户信息--> 
          <div class="my-talk-wrap">
            <div class="talk-user clear-fix">
                <div class="takl-user-photo">
                    <img src="../../assets/img/touxiang.png" alt="">
                </div>
            <div class="talk-user-message clear-fix">
                <p class="line-1"><span>张杰先生</span><img src="../../assets/img/userlevel.png" alt=""></p>
                <p class="line-22"><span>2015-12-13 </span><span>14:17</span></p> 
            </div>
          </div> <!-- 讨论内容--> 
          <div class="talk-content-describe" @click="openDetail()">
              <div class="current-talk">
                <h5><span class="questions">#问答#</span>老师好，请问这道题为什么选a，不理解不理解不理解不理解不理解不理解</h5>
                <p style="overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3; ">请问这个南烈中的转换成本的约当产量为什么不是氨 纶装完工转出数量加上氨纶服装期末wip就可以了？ 为什么还要加上完工转出的丝绸请问这个南烈中的转换成本的约当产量为什么不是氨 纶装完工转出数量加上氨纶服装期末wip就可以了？ 为什么还要加上完工转出的丝绸请问这个南烈中的转换成本的约当产量为什么不是氨 纶装完工转出数量加上氨纶服装期末wip就可以了？ 为什么还要加上完工转出的丝绸</p>
              </div>
              <ul class="pic-group">
                <li onclick="openImageBrower()"><img src="../../assets/img/talkpic.png" alt=""></li>
                <li onclick="openImageBrower()"><img src="../../assets/img/talkpic.png" alt=""></li>
                <li onclick="openImageBrower()"><img src="../../assets/img/talkpic.png" alt=""></li>
                <b>共4张</b>
              </ul>
            </div>
          </div>
          <div class="talk-event">
              <span class="line"></span>
              <p><i class="iconfont icon-good"></i>2</p>
              <p><i class="iconfont icon-talk"></i>2</p>
          </div>
      </div>
      <div class="my-talk-list"> <!-- 用户信息--> 
          <div class="my-talk-wrap">
            <div class="talk-user clear-fix">
                <div class="takl-user-photo">
                    <img src="../../assets/img/touxiang.png" alt="">
                </div>
            <div class="talk-user-message clear-fix">
                <p class="line-1"><span>张杰先生</span><img src="../../assets/img/userlevel.png" alt=""></p>
                <p class="line-22"><span>2015-12-13 </span><span>14:17</span></p> 
            </div>
          </div> <!-- 讨论内容--> 
          <div class="talk-content-describe">
              <div onclick="next()" class="current-talk">
                <h5><span class="discuss">#讨论#</span>请问</h5>
                <p>请问这个南烈中的转换成本的约当产量为什么不是氨 纶装完工转出数量加上氨纶服装期末wip就可以了？ 为什么还要加上完工转出的丝绸</p>
              </div>
              <ul class="pic-group">
                <li style="background-image:url(../../assets/img/userlevel.png)" onclick="openImageBrower()"></li>
                <li style="background-image:url(../../assets/img/userlevel.png)" onclick="openImageBrower()"></li>
                <li style="background-image:url(../../assets/img/userlevel.png)" onclick="openImageBrower()"></li>
                <b>共4张</b>
              </ul>
            </div>
          </div>
          <div class="talk-event">
              <span class="line"></span>
              <p><i class="iconfont icon-good"></i>2</p>
              <p><i class="iconfont icon-talk"></i>2</p>
          </div>
      </div>
      <div class="my-talk-list"> <!-- 用户信息--> 
          <div class="my-talk-wrap">
            <div class="talk-user clear-fix">
                <div class="takl-user-photo">
                    <img src="../../assets/img/touxiang.png" alt="">
                </div>
            <div class="talk-user-message clear-fix">
                <p class="line-1"><span>张杰先生</span><img src="../../assets/img/userlevel.png" alt=""></p>
                <p class="line-22"><span>2015-12-13 </span><span>14:17</span></p> 
            </div>
          </div> <!-- 讨论内容--> 
          <div class="talk-content-describe">
              <div onclick="next()" class="current-talk">
                <h5>   </h5> <p>个个好chjfjudkudujdukdudud</p>
              </div>
              <ul class="pic-group">
                <li style="background-image:url(../../assets/img/userlevel.png)" onclick="openImageBrower()"></li>
                <li style="background-image:url(../../assets/img/userlevel.png)" onclick="openImageBrower()"></li>
                <li style="background-image:url(../../assets/img/userlevel.png)" onclick="openImageBrower()"></li>
                <b>共4张</b>
              </ul>
            </div>
          </div>
          <div class="talk-event">
              <span class="line"></span>
              <p><i class="iconfont icon-good"></i>2</p>
              <p><i class="iconfont icon-talk"></i>2</p>
          </div>
      </div>

  </div>

</template>

<script>


export default {

  components: {
  },

  data() {
    return {
    }
  },


  mounted() {

    

  },

  methods: {

    setBg(imgsrc) {
        return `background-image:url(${imgsrc})`
    },
    openDetail() {
        this.$router.push({
          path: `/exchange/details`,
        });
    },
    newTalk() {
        
    },
  }

}

</script>
<style lang="scss" scoped>

@import "../../assets/style/mixin";

/*讨论内容*/
.talk-user {
  width: 100%;
  height: .76rem
}
.talk-user .takl-user-photo img {
  float: left;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
}
.takl-user-photo {
  height: 0.8rem;
  width: 0.8rem;
  position: relative;
  float: left;
}
.talk-user-message {
  position: relative;
  float: left;
  margin-left: 0.14rem;
  height: 0.8rem;
  width: 86%;
}
.talk-user-message .line-22 span {
  margin-right: 0.1rem;
}
.talk-user-message p:nth-child(1) {
  position: absolute;
  top: 0.1rem;
  width: 100%;
  line-height: 1;
}
.talk-user-message p:nth-child(1) span {
  font-size: 0.28rem;
  color: #646869;
  vertical-align: middle;
  font-weight: bold;
}
.talk-user-message p:nth-child(2) {
  position: absolute;
  bottom: 0.05rem;
  width: 100%;
  line-height: 1;
}
.talk-user-message p:nth-child(2) span {
  font-size: 0.22rem;
  color: #666;
  vertical-align: middle;
  margin-right: 0.12rem;
}
.talk-user-message .line-1 > img {
  max-height: 0.3rem;
  vertical-align: middle;
  margin-left: 0.14rem;
}
.my-talk-list {
  width: 100%;
  margin-bottom: 0.2rem;
  overflow: hidden;
  background-color: #fff;
}
.my-talk-wrap {
  width: 91.6%;
  position: relative;
  margin: 0 auto;
  padding: 0.2rem 0 0 0;
}
.current-talk h5 {
  color: #333;
  font-size: 0.26rem;
  max-height: 0.8rem;
}
.current-talk p {
  color: #7c7c7c;
  font-size: 0.24rem;
  /*max-height: 1.2rem;*/

}
.current-talk h5,
.current-talk p {
  margin-top: 0.2rem;
  word-wrap: break-word;
  width: 100%;
  line-height: 0.4rem;
  overflow: hidden;
}
.detail .current-talk h5,
.detail .current-talk p {
  /*max-height: 12rem;*/
  overflow: visible;
}
.current-talk h5{
    overflow:hidden; //超出的文本隐藏
    text-overflow:ellipsis; //溢出用省略号显示
    white-space:nowrap; //溢出不换行
}
.talk-warp .current-talk p{
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
}
.current-talk h5 span.questions{
    color: #3ba9fe;
}
.current-talk h5 span.discuss{
    color: #ff6612;
}
.my-talk-wrap .current-talk {
  position: relative;
}
.my-talk-wrap .current-talk:before {
  content: '';
  position: absolute;
  z-index: 1;
  left: -0.3rem;
  right: -0.3rem;
  top: -1.1rem;
  bottom: -3.5rem;
  background: rgba(0,0,0,0);
}
.my-talk-wrap .voice-player,
.my-talk-wrap ul.pic-group li {
  position: relative;
  z-index: 3;
}
.my-talk-bottm {
  width: 100%;
  line-height: 0.6rem;
  border-top: 1px solid #e6e6e6;
  position: relative;
  margin-top: 0.16rem;
}
.my-talk-bottm span {
  color: #666;
  font-size: 0.24rem;
  display: block;
  width: 91.6%;
  margin: 0 auto;
}

/**通用图片组**/
.pic-group {
  margin: 0.3rem 0 0.1rem 0;
  font-size: 0;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
}
.pic-group li {
  display: inline-block;
  width: 32%;
  margin: 0 1%;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  background: #eee no-repeat center;
  background-size: cover;
}
.pic-group li img{
    width: 100%;
    height: 100%;
}
.pic-group b {
  position: absolute;
  z-index: 5;
  top: 1.5rem;
  background-color: rgba(0,0,0,0.5);
  color: #fff;
  height: 0.4rem;
  width: 1rem;
  text-align: center;
  line-height: 0.4rem;
  font-size: 0.22rem;
  margin-left: -1%;
  transform: translate(-120%, 0);
  -webkit-transform: translate(-120%, 0);
  border-radius: 0.2rem;
}


.talk-event{
    width: 100%;
    height: 0.8rem;
    display: flex;
    border-top: 1px solid #eee;
    margin-top: 0.2rem;
    position: relative;
    p{
      flex: 1;
      text-align: center;
      line-height: 0.8rem;
      color: #684343;
      font-size: 0.2rem;
      i{
          color: #cab2b8;
          padding-right: 0.1rem;
          font-size: 0.4rem;
      }
    }
    span{
      width: 2px;
      height: 0.4rem;
      display: block;
      background: #eee;
      position: absolute;
      left: 3.8rem;
      top: 0.2rem;
    }
}
.talk-event p:last-child i{
    font-size: 0.48rem;
}

</style>
