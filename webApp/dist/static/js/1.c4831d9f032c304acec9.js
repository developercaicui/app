webpackJsonp([1,2],{52:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.newExchange=e.exchangeReply=e.getNodeDetail=e.saveNote=e.fileUpload=e.getNewNoteSectionList=e.getNewNoteList=e.removeExchangeDetails=e.getExchangeDetails=e.getExchangeList=e.searchhNote=e.removeNoteDetails=e.getNoteDetails=e.getNoteDetailsList=e.getCourseNoteList=e.getNoteList=e.complaintOpinion=e.loginout=e.courseActive=e.timeList=e.getExtendInfo=e.getOverdueCourse=e.getNoactiveCourse=e.updateLogStatus=e.getMsgList=e.getCourseProgres=e.getLearningCourse=e.getExamDate=e.getLoginLog=e.getActivityList=e.getUserInfo=e.uploadFile=e.changeUserName=e.changePwdByPhone=e.mobileReg=e.sendCode=e.phoneIsExist=e.login=e.getToken=void 0;var r=n(32),i=a(r),o=n(103),u=a(o),s=n(19),d=a(s),c=n(28),l=a(c),f="zbgedu".includes("zbgedu")?"zbgedu":"caicui",p="http://api."+f+".com",h=(window.location,{urlencoded:{headers:{"Content-Type":"application/x-www-form-urlencoded"}}});console.log("zbgedu","ipad");var m=!1;d.default.interceptors.response.use(function(t){var e=t.data,n=e.msg,a=e.state;return"nologin"!=n||"error"!=a?(u.default.setCookie("isnologin","false"),t):(m=!0,u.default.alert("登录失效，即将跳到登录页"),u.default.setCookie("isnologin","true"),setTimeout(function(){"false"===u.default.getCookie("isTargetLogin")&&(g.targetLogin(),u.default.setCookie("isTargetLogin","true"),u.default.delCookie("userInfo"))},2e3),void 0)},function(t){m||i.default.reject(t)});e.getToken=function(t){return d.default.post(p+"/api/zbids/app/gettoken/v1.0/",l.default.stringify(t)).then(function(t){return t.data}).catch(function(t){return t})},e.login=function(t){return d.default.post(p+"/api/zbids/member/login/v1.0",l.default.stringify(t)).then(function(t){return t.data}).catch(function(t){return t})},e.phoneIsExist=function(t){return d.default.get(p+"/api/zbids/member/checkexist/v1.0?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.sendCode=function(t){return d.default.post(p+"/api/base/sms/sendsms/v1.0/",l.default.stringify(t)).then(function(t){return t.data}).catch(function(t){return t})},e.mobileReg=function(t){return d.default.post(p+"/api/zbids/member/mobilereg",l.default.stringify(t)).then(function(t){return t.data}).catch(function(t){return t})},e.changePwdByPhone=function(t){return d.default.post(p+"/api/zbids/member/changePwdByPhone",l.default.stringify(t)).then(function(t){return t.data}).catch(function(t){return t})},e.changeUserName=function(t){return d.default.post(p+"/api/zbids/member/editinfo",l.default.stringify(t),h).then(function(t){return t.data}).catch(function(t){return t})},e.uploadFile=function(t){return d.default.post(p+"/api/zbids/member/edituserheadr",t).then(function(t){return t.data}).catch(function(t){return t})},e.getUserInfo=function(t){return d.default.post(p+"/api/zbids/member/getmemberinfo",l.default.stringify(t)).then(function(t){return t.data}).catch(function(t){return t})},e.getActivityList=function(t){return d.default.get(p+"/api/article/slide/list?verTT="+(new Date).getTime()+"&tag=0&valid=true&count=5",{}).then(function(t){return t.data}).catch(function(t){return t})},e.getLoginLog=function(t){return d.default.get(p+"/api/zbids/member/getLoginLog?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.getExamDate=function(t){return d.default.get(p+"/api/business/coursestudy/getExamDate?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.getLearningCourse=function(t){return d.default.get(p+"/api/business/learning/learningcourse/v1.0?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.getCourseProgres=function(t){return d.default.get("http://action."+f+".com/api/userAction/course/getCourseProgress/v1.0/?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.getMsgList=function(t){return d.default.get(p+"/api/study/message/list/v1.0?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.updateLogStatus=function(t){return d.default.get(p+"/api/study/message/updateStatus/v1.0?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.getNoactiveCourse=function(t){return d.default.get(p+"/api/business/learning/noActivecourse/v1.0?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.getOverdueCourse=function(t){return d.default.get(p+"/api/business/learning/expirationcourse/v1.0?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.getExtendInfo=function(t){return d.default.get(p+"/api/teachsource/course/courseBaseInfo/data?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.timeList=function(t){return d.default.get(p+"/api/teachsource/exam/timeList?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.courseActive=function(t){return d.default.get(p+"/api/business/order/courseActive/v1.0?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.loginout=function(t){return d.default.get(p+"/api/zbids/member/loginout/v1.0?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.complaintOpinion=function(t){return d.default.post(p+"/api/business/complaintOpinion/create/v1.0",l.default.stringify(t)).then(function(t){return t.data}).catch(function(t){return t})},e.getNoteList=function(t){return d.default.post(p+"/api/studytools/myallcoursechapternodecount/v2.1",l.default.stringify(t)).then(function(t){return t.data}).catch(function(t){return t})},e.getCourseNoteList=function(t){return d.default.post(p+"/api/studytools/coursechapternodecount/v2.1",l.default.stringify(t)).then(function(t){return t.data}).catch(function(t){return t})},e.getNoteDetailsList=function(t){return d.default.get(p+"/api/studytools/nodelist/v2.1?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.getNoteDetails=function(t){return d.default.get(p+"/api/studytools/nodedetail/v2.1?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.removeNoteDetails=function(t){return d.default.get(p+"/api/studytools/delmycontent/v2.1?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.searchhNote=function(t){return d.default.get(p+"/api/studytools/findcontent/v2.1?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.getExchangeList=function(t){return d.default.get(p+"/api/studytools/bbslist/v1.0?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.getExchangeDetails=function(t){return d.default.get(p+"/api/studytools/bbsdetail/v1.0?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.removeExchangeDetails=function(t){return d.default.get(p+"/api/studytools/bbs_del/v1.0?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.getNewNoteList=function(t){return d.default.get(p+"/api/business/learning/learningcourse/v1.0?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.getNewNoteSectionList=function(t){return d.default.get(p+"/api/teachsource/course/courseDetail/data?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.fileUpload=function(t){return d.default.post(p+"/api/base/file/upload",t).then(function(t){return t.data}).catch(function(t){return t})},e.saveNote=function(t){return d.default.post(p+"/api/studytools/nodesave/v2.1",l.default.stringify(t),h.urlencoded).then(function(t){return t.data}).catch(function(t){return t})},e.getNodeDetail=function(t){return d.default.get(p+"/api/studytools/nodedetail/v2.1?"+l.default.stringify(t),{}).then(function(t){return t.data}).catch(function(t){return t})},e.exchangeReply=function(t){return d.default.post(p+"/api/studytools/bbsreply/v1.0",l.default.stringify(t),h.urlencoded).then(function(t){return t.data}).catch(function(t){return t})},e.newExchange=function(t){return d.default.post(p+"/api/studytools/bbssave/v1.0",l.default.stringify(t),h.urlencoded).then(function(t){return t.data}).catch(function(t){return t})}},98:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(52);e.default={components:{},data:function(){return{user:"rainy02",pwd:"111111111",token:""}},methods:{submitLogin:function(){var t=this,e={appType:"aPad",appId:"aPadCourse",appKey:"f7e4ebaa872f38db7b548b870c13e79e"},n={account:this.user,password:this.pwd,token:"",code:""};this.webApi.alert("正在登录，请耐心等待..."),(0,a.getToken)(e).then(function(e){return e||"success"!=!e.state?(t.token=e.data.token,t.token):(t.webApi.alert("token获取失败,请查看控制台。"),console.error(e,"获取token错误信息"),!1)}).then(function(t){return n.token=t,(0,a.login)(n)}).then(function(e){return e&&"success"==e.state?(t.webApi.alert("登录成功，即将自动跳转"),void setTimeout(function(){t.$router.push({path:"/index?avatar="+e.data.avatar+"&memberId="+e.data.memberId+"&nickName="+e.data.nickName+"&token="+e.data.token+"&deviceType="+t.webApi.getDeviceType()})},1e3)):(t.webApi.alert("登录失败，即将自动跳转"),!1)})}}}},103:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(56),i=a(r),o=n(53),u=a(o),s=n(52);e.default={preloadImages:function(t){},pictureCompress:function(t,e){function n(t){for(var e=t.split(","),n=e[0].match(/:(.*?);/)[1],a=atob(e[1]),r=a.length,i=new Uint8Array(r);r--;)i[r]=a.charCodeAt(r);return new Blob([i],{type:n})}var a={mime:"image/jpeg",quality:.6,fileName:""};a.fileName=this.randomName(a.mime);var r=document.createElement("canvas"),i=r.getContext("2d"),o=new FileReader,u=void 0,s=void 0;o.onload=function(t){u=new Image,u.onload=function(){r.width=u.width,r.height=u.height,i.drawImage(u,0,0),s=r.toDataURL(a.mime,a.quality),e(n(s),a.fileName)},u.src=o.result},o.readAsDataURL(t)},randomName:function(t){return(new Date).getTime()+"."+t.replace(/^.+\/{1}(.+)$/g,"$1")},isLogin:function(){var t={token:this.getCookie("userInfo")?JSON.parse(this.getCookie("userInfo")).token:null};return!t.token||(0,s.getUserInfo)(t).then(function(t){return!(!t||"success"!=t.state)})},getDeviceType:function(){var t=(window.navigator.userAgent.toLocaleLowerCase(),document.documentElement.getBoundingClientRect().width),e=this.getCookie("deviceType")||"null";return e.includes("ipad")||e.includes("mobile")?this.getCookie("deviceType"):t>800?"ipad":t<800?"mobile":void 0},remCount:function(){var t=document.documentElement,e=t.clientWidth,n=this.getDeviceType(),a=window.devicePixelRatio,r="mobile"===n?750:2048;"ipad"===n&&e*a<1536&&(r=1587.2);var i=r/100;t.dataset.device=n,t.dataset.dpr=a,t.style.fontSize=e/i+"px"},setCookie:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:30;if(window.localStorage)return void window.localStorage.setItem(t,e);var a=new Date,r=null;a.setTime(a.getTime()+24*n*60*60*1e3),r="expires="+a.toUTCString(),document.cookie=t+"="+e+";"+n},getCookie:function(t){if(window.localStorage)return window.localStorage.getItem(t);var e=void 0,n=new RegExp("(^| )"+t+"=([^;]*)(;|$)");return(e=document.cookie.match(n))?unescape(e[2])||null:void 0},delCookie:function(t){if(window.localStorage)return void window.localStorage.removeItem(t);var e=new Date,n=this.getCookie(t);e.setTime(e.getTime()-1),null!=n&&(document.cookie=t+"="+n+";expires="+e.toGMTString())},isSmallTen:function(t){return t<10?"0"+t:t},addCss:function(t,e){if(t&&e){var n=["","webkit","moz"],a=["transition","transform"],r=function(r){if(a.includes(r)){var i=r;n.map(function(a,o){if(""!==a){var s=(0,u.default)(r);s[0]=s[0].toUpperCase(),i=""+n[o]+s.join(",").replace(/,/g,"")}t.style[i]=e[r]})}};for(var i in e)r(i)}},recursiveParentNode:function(t,e){return t.nodeName.toLowerCase()==e?t:this.recursiveParentNode(t.parentNode,e)},alert:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"网络异常，请稍后再试",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2e3,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:199;if("true"==this.getCookie("isnologin")&&!t.includes("登录失效"))return!1;var a=document.createElement("div");try{var r=document.querySelectorAll(".g-small-alert");r[0]&&document.body.removeChild(a)}catch(t){}a.className="g-small-alert",a.style.cssText="z-index:"+n+";",a.innerText=t,document.body.appendChild(a),"number"!=typeof e&&(e=Number(e)),setTimeout(function(){document.body.removeChild(a)},e)},loadingData:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"加载中",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=document.createElement("div");n.className="g-data-loading-wrap",n.id="dataLoading",e.css&&(n.style.cssText=e.css),n.innerHTML='\n     <div class="g-data-loading">\n       <div class="showbox">\n         <div class="loader">\n           <svg class="circular" viewBox="25 25 50 50">\n             <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>\n           </svg>\n         </div>\n       </div>\n       <h1>'+t+"...</h1>\n     </div>\n      ",document.body.appendChild(n)},closeLoadingData:function(){document.body.removeChild(document.querySelector("#dataLoading"))},stringData:function(t){t=parseInt(t);var e="1分钟前",n=parseInt((new Date).getTime()/1e3),a=n-t;return a<0&&(a=1),e=a<3600?Math.ceil(a/60)+"分钟前":a>=3600&&a<86400?Math.ceil(a/3600)+"小时前":a>=86400&&a<2592e3?Math.ceil(a/86400)+"天前":a>=2592e3&&a<31104e3?Math.ceil(a/2592e3)+"月前":Math.ceil(parseInt(a/31104e3))+"年前"},cdnImgUrl:"build".includes("developZbgedu")?"http://eximg.zbgedu.com/":"http://cdnimg.caicui.com/",exstaticUrl:"build".includes("developZbgedu")?"http://exstatic.zbgedu.com/":"http://cdnimg.caicui.com/",isEmpty:function(t){return!(!this.isEmpty1(t)&&!this.isEmpty2(t))},isEmpty1:function(t){return void 0==t||null==t||"null"==t||""==t||"NULL"==t||0==t||"False"==t||"false"==t||"NaN"==t||NaN==t},isEmpty2:function(t){switch("undefined"==typeof t?"undefined":(0,i.default)(t)){case"undefined":return!0;case"string":if(0==this.trim(t).length)return!0;break;case"boolean":if(!t)return!0;break;case"number":if(0===t)return!0;break;case"object":if(null===t)return!0;if(void 0!==t.length&&0==t.length)return!0;for(var e in t)return!1;return!0}return!1},trim:function(t){return t.replace(/(^\s+)|(\s+$)/g,"")},outCourseList:function(t){function e(t,e){return t.subjectIndex>e.subjectIndex?1:-1}for(var n=t.data.courselist,a=[],r=0;r<n.length;r++)if(a&&a.length){for(var i=!0,o=0;o<a.length;o++)n[r].subjectID==a[o].subjectID&&(i=!1);i&&a.push({categoryId:n[r].categoryId,subjectID:n[r].subjectID,categoryIndex:n[r].categoryIndex,subjectIndex:n[r].subjectIndex,categoryName:n[r].categoryName,subjectName:n[r].subjectName,courseLists:[]})}else a.push({categoryId:n[r].categoryId,subjectID:n[r].subjectID,categoryIndex:n[r].categoryIndex,subjectIndex:n[r].subjectIndex,categoryName:n[r].categoryName,subjectName:n[r].subjectName,courseLists:[]});for(var u=0;u<a.length;u++)for(var s=0;s<n.length;s++)a[u].subjectID==n[s].subjectID&&a[u].courseLists.push(n[s]);var d={};return a.forEach(function(t,n){var r=t.categoryName,i=t.categoryId;d[i]?(d[i].children.push(a[n]),d[i].children.sort(e)):d[i]={categoryName:r,subjectIndex:a[n].subjectIndex,children:[a[n]]}}),d},formatDate:function(t,e){var n=new Date(parseInt(1e3*t)),a=void 0,r=void 0,i=void 0,o=void 0,u=void 0,s=void 0;return"Y"==e?a=n.getFullYear():"M"==e?r=n.getMonth()+1<10?"0"+(n.getMonth()+1):n.getMonth()+1:"D"==e?(i=n.getDate(),this.extra(i)):"h"==e?(o=n.getHours(),this.extra(o)):"m"==e?(u=n.getMinutes(),this.extra(u)):"s"==e?(s=n.getSeconds(),this.extra(s)):void 0},extra:function(t){return parseInt(t)<10?"0"+parseInt(t):t},formatType:function(t,e){if("-1"==e)return"";if("video"==t){var n=parseInt(e),a=0,r=0;n>=60&&(a=parseInt(n/60),n=parseInt(n%60),a>=60&&(r=parseInt(a/60),a=parseInt(a%60)));var i,o,u;return u=r>=10?r:"0"+r,i=a>=10?a:"0"+a,o=n>=10?n:"0"+n,u>0?parseInt(parseInt(i)+parseInt(60*u))+":"+o:i+":"+o}return"exam"==t||"knowledgePointExercise"==t?" 第"+e+"题":void 0}}},168:function(t,e,n){e=t.exports=n(27)(void 0),e.push([t.id,'.flexCenter[data-v-5aaad280],.g-small-alert[data-v-5aaad280]{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.show[data-v-5aaad280]{display:block}.hide[data-v-5aaad280]{display:none}.ab[data-v-5aaad280]{position:absolute}.borderBox[data-v-5aaad280]{box-sizing:border-box}.content-padding-left[data-v-5aaad280]{padding-left:1.6rem}.mobile-wrap[data-v-5aaad280]{padding-bottom:1rem}.text-ellipsis[data-v-5aaad280]{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.slide-left-enter-active[data-v-5aaad280]{transition:all .7s ease}.slide-left-leave-active[data-v-5aaad280]{transition:all .7s cubic-bezier(1,.5,.8,1)}.slide-left-enter[data-v-5aaad280],.slide-left-leave-to[data-v-5aaad280]{transform:translateX(20.48rem)}.slide-left-hide-enter-active[data-v-5aaad280]{transition:all .8s ease;transition-delay:.1s}.slide-left-hide-leave-active[data-v-5aaad280]{transition:all .8s cubic-bezier(1,.5,.8,1);transition-delay:.1s}.slide-left-hide-enter[data-v-5aaad280],.slide-left-hide-leave-to[data-v-5aaad280]{transform:translateX(-20.48rem)}.g-small-alert[data-v-5aaad280]{font-size:.28rem;color:#fff;position:fixed;top:25%;left:50%;min-width:2rem;background-color:rgba(51,51,51,.8);z-index:119;padding:.1rem .2rem;border-radius:5px;transform:translate3d(-50%,0,0)}.g-data-loading-wrap[data-v-5aaad280]{position:fixed;left:0;right:0;bottom:0;top:0;background-color:transparent;z-index:119}.g-data-loading[data-v-5aaad280]{width:2rem;height:2rem;position:fixed;left:50%;top:50%;transform:translate3d(-50%,-50%,0);background-color:rgba(0,0,0,.7);border-radius:5px;text-align:center}.g-data-loading h1[data-v-5aaad280]{font-size:.25rem;color:#fff;transform:translate3d(0,1.4rem,0)}.g-data-loading .showbox[data-v-5aaad280]{position:absolute;top:.12rem;bottom:0;left:0;right:0;padding:5%}.g-data-loading .loader[data-v-5aaad280]{position:relative;margin:0 auto;width:1rem}.g-data-loading .loader[data-v-5aaad280]:before{content:"";display:block;padding-top:100%}.g-data-loading .circular[data-v-5aaad280]{animation:rotate 2s linear infinite;height:100%;transform-origin:center center;width:100%;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto}.g-data-loading .path[data-v-5aaad280]{stroke-dasharray:1,200;stroke-dashoffset:0;animation:dash 1.5s ease-in-out infinite,color 6s ease-in-out infinite;stroke-linecap:round}@keyframes rotate{to{transform:rotate(1turn)}}@keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}to{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes color{0%,to{stroke:#00a185}40%{stroke:#00a185}66%{stroke:#00a185}80%,90%{stroke:#00a185}}.login-wrap-all[data-v-5aaad280]{position:absolute;left:0;top:0;right:0;bottom:0;background-color:#f6f6f6;z-index:19}.login-wrap-all input[data-v-5aaad280]{width:4rem;height:.5rem;font-size:.26rem;color:#000;display:block;margin:.3rem auto;padding:.2rem}.login-wrap-all input[data-v-5aaad280]:first-of-type{margin-top:3rem}.login-wrap-all a[data-v-5aaad280]{width:1.4rem;height:.45rem;font-size:.26rem;color:#fff;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;background-color:#2b7fd2;margin:0 auto}',""])},173:function(t,e,n){var a=n(168);"string"==typeof a&&(a=[[t.id,a,""]]);n(29)(a,{});a.locals&&(t.exports=a.locals)},181:function(t,e,n){var a,r;n(173),a=n(98);var i=n(188);r=a=a||{},"object"!=typeof a.default&&"function"!=typeof a.default||(r=a=a.default),"function"==typeof r&&(r=r.options),r.render=i.render,r.staticRenderFns=i.staticRenderFns,r._scopeId="data-v-5aaad280",t.exports=a},188:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",{staticClass:"login-wrap-all"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.user,expression:"user"}],attrs:{type:"text",placeholder:"请输入账号"},domProps:{value:t.user},on:{input:function(e){e.target.composing||(t.user=e.target.value)}}}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.pwd,expression:"pwd"}],attrs:{type:"password",placeholder:"请输入密码"},domProps:{value:t.pwd},on:{input:function(e){e.target.composing||(t.pwd=e.target.value)}}}),t._v(" "),n("a",{attrs:{href:"javascript:;"},on:{touchend:t.submitLogin}},[t._v("登录")])])},staticRenderFns:[]}}});