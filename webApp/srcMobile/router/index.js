
import VueRouter from 'vue-router';

const Login = r => require.ensure([], () => r(require('srcIpad/page/Login')), 'login');
const Exam = r => require.ensure([], () => r(require('srcIpad/page/Exam')), 'exam');;

const Index = r => require.ensure([], () => r(require('../containers/Index')), 'index');
const MyMsg = r => require.ensure([], () => r(require('../containers/MyMsg')), 'mymsg');
const Note = r => require.ensure([], () => r(require('../containers/Note')), 'note');
const NoteList = r => require.ensure([], () => r(require('../containers/NoteList')), 'notelist');
const NoteMeList = r => require.ensure([], () => r(require('../containers/NoteMeList')), 'notemelist');
const NoteDetailsList = r => require.ensure([], () => r(require('../containers/NoteDetailsList')), 'notedetailslist');
const NoteDetails = r => require.ensure([], () => r(require('../containers/NoteDetails')), 'notedetails');
const NoteEdit = r => require.ensure([], () => r(require('../containers/NoteEdit')), 'noteedit');
const NewNote = r => require.ensure([], () => r(require('../containers/NewNote')), 'newNote');
const NewNoteSelectSection = r => require.ensure([], () => r(require('../containers/NewNote/subpage/select_section')), 'selectsection');
const AgainHearing = r => require.ensure([], () => r(require('../containers/AgainHearing')), 'againhearing');

import Exchange from '../containers/Exchange';
import ExchangeListAll from '../containers/ExchangeListAll';
import ExchangeListMe from '../containers/ExchangeListMe';
import ExchangeDetails from '../containers/ExchangeDetails';
import ExchangeSearch from '../containers/ExchangeSearch';
import ExchangeNewTalk from '../containers/ExchangeNewTalk';
// const Exchange = r => require.ensure([], () => r(require('../containers/Exchange')), 'exchange');
// const ExchangeListAll = r => require.ensure([], () => r(require('../containers/ExchangeListAll')), 'exchangelistall');
// const ExchangeListMe = r => require.ensure([], () => r(require('../containers/ExchangeListMe')), 'exchangelistme');
// const ExchangeDetails = r => require.ensure([], () => r(require('../containers/ExchangeDetails')), 'exchangedetails');
// const ExchangeSearch = r => require.ensure([], () => r(require('../containers/ExchangeSearch')), 'exchangesearch');
// const ExchangeNewTalk = r => require.ensure([], () => r(require('../containers/ExchangeNewTalk')), 'exchangenewtalk');


export default  new VueRouter({
  mode: 'hash',
  routes: [{
      path: '/',
      redirect: '/login'
    },{
      path: '/login', // 登陆
      component: Login
    },{
      path: '/index', // 首页
      component: Index
    },{
      path: '/msg', // 消息列表
      component: MyMsg
    },{
      path: '/note',
      component: Note,
      children: [{
        path: 'list', // 笔记列表
        component: NoteList,
      },{
        path: 'melist', // 我的个人笔记列表
        component: NoteMeList
      },{
        path: 'detailslist/:data', // 详情列表
        component: NoteDetailsList
      },{
        path: 'details/:data', // 详情
        component: NoteDetails
      },{
        path: 'new', // 新建笔记
        component: NewNote,
      },{
        path: 'selectsection/:data', // 新建笔记章节选择
        component: NewNoteSelectSection
      },{
        path: 'edit/:data', // 编辑笔记
        component: NoteEdit,
      }]
    },{
      path: '/again',
      component: AgainHearing
    },{
      path: '/exchange',
      component: Exchange,
      children: [{
        path: 'alllist', // 全部交流列表
        component: ExchangeListAll,
      },{
        path: 'melist', // 我的交流列表
        component: ExchangeListMe,
      },{
        path: 'details', // 交流详情
        component: ExchangeDetails
      },{
        path: 'search', // 搜索交流
        component: ExchangeSearch
      },{
        path: 'newtalk', // 搜索交流
        component: ExchangeNewTalk
      }]
    },{
      path: '/exam/:type/:id',
      component: Exam
    },{
      path: '/exam/:type/:id/:examNum',
      component: Exam
    }]
});
