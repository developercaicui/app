
import VueRouter from 'vue-router';

const Index = r => require.ensure([], () => r(require('../Ipad/Index')), 'index')
const Reg = r => require.ensure([], () => r(require('../Ipad/Reg')), 'reg')
const FindPwd = r => require.ensure([], () => r(require('../Ipad/FindPwd')), 'fidPwd')
const Login = r => require.ensure([], () => r(require('../Ipad/Login')), 'login')
const Exchange = r => require.ensure([], () => r(require('../Ipad/Exchange')), 'exchange')
const ExchangeDetails = r => require.ensure([], () => r(require('../Ipad/ExchangeDetails')), 'exchangeDetails')
const ExchangeEdit = r => require.ensure([], () => r(require('../Ipad/ExchangeEdit')), 'exchangeEdit')
const ExchangeList = r => require.ensure([], () => r(require('../Ipad/ExchangeList')), 'exchangeList')
const Note = r => require.ensure([], () => r(require('../Ipad/Note')), 'note');
const NoteList = r => require.ensure([], () => r(require('../Ipad/NoteList')), 'NoteList');
const NoteDetailsList = r => require.ensure([], () => r(require('../Ipad/NoteDetailsList')), 'noteDetailsList');
const NoteDetails = r => require.ensure([], () => r(require('../Ipad/NoteDetails')), 'noteDetails');
const NoteEdit = r => require.ensure([], () => r(require('../Ipad/NoteEdit')), 'noteEdit');
const NoteSearch = r => require.ensure([], () => r(require('../Ipad/NoteSearch')), 'noteSearch');
const Course = r => require.ensure([], () => r(require('../Ipad/Course')), 'course')
const Setting = r => require.ensure([], () => r(require('../Ipad/Setting')), 'setting')
const Correction = r => require.ensure([], () => r(require('../Ipad/Correction')), 'correction')
const CorrectionVideo = r => require.ensure([], () => r(require('../Ipad/CorrectionVideo')), 'Correctionvideo')
const CorrectionExam = r => require.ensure([], () => r(require('../Ipad/CorrectionExam')), 'correctionExam')
const CourseLive = r => require.ensure([], () => r(require('../Ipad/CourseLive')), 'correctionLive')
const CourseLiveOpen = r => require.ensure([], () => r(require('../Ipad/CourseLiveOpen')), 'correctionLiveOpen')
const CourseLiveIframe = r => require.ensure([], () => r(require('../Ipad/CourseLiveIframe')), 'correctionLiveIframe')

const CourseExchange = r => require.ensure([], () => r(require('../Ipad/CourseExchange')), 'courseExchange')
const CourseExchangeList = r => require.ensure([], () => r(require('../Ipad/CourseExchangeList')), 'courseExchangeList')
const CourseNote = r => require.ensure([], () => r(require('../Ipad/CourseNote')), 'courseNote')
const CourseNoteList = r => require.ensure([], () => r(require('../Ipad/CourseNoteList')), 'courseNoteList')
const NoteSelected = r => require.ensure([], () => r(require('../Ipad/NoteSelected')), 'noteSelected')
const NoteSelectedSection = r => require.ensure([], () => r(require('../Ipad/NoteSelectedSection')), 'noteSelectedSection')
const Exam = r => require.ensure([], () => r(require('../Ipad/Exam')), 'exam')
const VideoNoteEdit = r => require.ensure([], () => r(require('../Ipad/VideoNoteEdit')), 'videoNoteEdit')
const VideoExchangeEdit = r => require.ensure([], () => r(require('../Ipad/VideoExchangeEdit')), 'videoExchangeEdit')
const EditMeInfo = r => require.ensure([], () => r(require('../components/EditMeInfo')), 'editMeInfo')

export default  new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Login
    },{
      path: '/index', // 首页
      component: Index
    },{
      path: '/findpwd', // 找回密码
      component: FindPwd
    },{
      path: '/reg', // 注册
      component: Reg,
    },{
      path: '/login', //登录
      component: Login,
    },{
      path: '/note',
      component: Note,
      children: [{
         path: 'list', // 笔记列表
         component: NoteList,
       },{
         path: 'detailslist/:data', // 笔记详情列表
         component: NoteDetailsList,
       },{
         path: 'details/:data', // 笔记详情
         component: NoteDetails
       },{
         path: 'edit/:data', // 编辑新建笔记
         component: NoteEdit
       },{
         path: 'search', // 搜索
         component: NoteSearch
       },{
         path: 'selected', //选择课程
         component: NoteSelected,
       },{
         path: 'selectedsection/:data', // 选择章节
         component: NoteSelectedSection
       },{
         path: 'videoedit',
         component: VideoNoteEdit, // 中间页跳转
       }
      ]
    },{
      path: '/exchange',
      component: Exchange,
      children: [{
          path: 'edit/:data', // 新建交流
          component: ExchangeEdit
        },{
          path: 'list', // 交流列表
          component: ExchangeList
        },{
          path: 'details/:data', // 交流详情
          component: ExchangeDetails
        },{
          path: 'videoedit',
          component: VideoExchangeEdit, // 中间页跳转
        }
      ]
    },{
      path: '/courseexchange',
      component: CourseExchange,
      children: [
        {
          path: 'list',
          component: CourseExchangeList
        }
      ]
    },{
      path: '/coursenote',
      component: CourseNote,
      children: [
        {
          path: 'list',
          component: CourseNoteList
        }
      ]
    },{
      path: '/course',
      component: Course
    },{
      path: '/setting',
      component: Setting
    },{
      path: '/editMeInfo',
      component: EditMeInfo
    },{
      path: '/correction',
      component: Correction,
      children: [
        {
          path: 'video',
          component: CorrectionVideo
        },{
          path: 'exam',
          component: CorrectionExam
        }
      ]
    },{
      path: '/courselive',
      component: CourseLive,
      children: [
        {
          path: 'open',
          component: CourseLiveOpen
        },{
          path: 'iframe',
          component: CourseLiveIframe
        }
      ]
    },{
      path: '/exam/:type/:id',
      component: Exam
    },{
      path: '/exam/:type/:id/:examNum',
      component: Exam
    }
   ]
});
