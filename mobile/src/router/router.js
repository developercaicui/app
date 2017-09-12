
import VueRouter from 'vue-router';

const Index = r => require.ensure([], () => r(require('../page/Index')), 'index')
const Reg = r => require.ensure([], () => r(require('../page/Reg')), 'reg')
const FindPwd = r => require.ensure([], () => r(require('../page/FindPwd')), 'fidPwd')
const Login = r => require.ensure([], () => r(require('../page/Login')), 'login')
const Loading = r => require.ensure([], () => r(require('../page/Loading')), 'loading')
const Exchange = r => require.ensure([], () => r(require('../page/Exchange')), 'exchange')
const ExchangeDetails = r => require.ensure([], () => r(require('../page/ExchangeDetails')), 'exchangeDetails')
const ExchangeEdit = r => require.ensure([], () => r(require('../page/ExchangeEdit')), 'exchangeEdit')
const ExchangeList = r => require.ensure([], () => r(require('../page/ExchangeList')), 'exchangeList')
const Note = r => require.ensure([], () => r(require('../page/Note')), 'note');
const NoteList = r => require.ensure([], () => r(require('../page/NoteList')), 'NoteList');
const NoteDetailsList = r => require.ensure([], () => r(require('../page/NoteDetailsList')), 'noteDetailsList');
const NoteDetails = r => require.ensure([], () => r(require('../page/NoteDetails')), 'noteDetails');
const NoteEdit = r => require.ensure([], () => r(require('../page/NoteEdit')), 'noteEdit');
const NoteSearch = r => require.ensure([], () => r(require('../page/NoteSearch')), 'noteSearch');
const Course = r => require.ensure([], () => r(require('../page/Course')), 'course')
const Setting = r => require.ensure([], () => r(require('../page/Setting')), 'setting')
const Correction = r => require.ensure([], () => r(require('../page/Correction')), 'correction')
const CourseExchange = r => require.ensure([], () => r(require('../page/CourseExchange')), 'courseExchange')
const CourseExchangeDetails = r => require.ensure([], () => r(require('../page/CourseExchangeDetails')), 'courseExchangeDetails')
const CourseExchangeList = r => require.ensure([], () => r(require('../page/CourseExchangeList')), 'courseExchangeList')
const NoteSelected = r => require.ensure([], () => r(require('../page/NoteSelected')), 'noteSelected')
const NoteSelectedSection = r => require.ensure([], () => r(require('../page/NoteSelectedSection')), 'noteSelectedSection')
const Exam = r => require.ensure([], () => r(require('../page/Exam')), 'exam')
const VideoNoteEdit = r => require.ensure([], () => r(require('../page/VideoNoteEdit')), 'videoNoteEdit')
const VideoExchangeEdit = r => require.ensure([], () => r(require('../page/VideoExchangeEdit')), 'videoExchangeEdit')
const EditMeInfo = r => require.ensure([], () => r(require('../components/EditMeInfo')), 'editMeInfo')

export default  new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Loading
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
         path: 'videoEdit',
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
        },{
          path: 'details/:data',
          component: ExchangeDetails
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
      component: Correction
    },{
      path: '/exam/:type/:id',
      component: Exam
    }
   ]
});
