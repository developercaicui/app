
import VueRouter from 'vue-router';

const Login = r => require.ensure([], () => r(require('srcIpad/page/Login')), 'login');
const Exam = r => require.ensure([], () => r(require('srcIpad/page/Exam')), 'exam');;

const Index = r => require.ensure([], () => r(require('../containers/Index')), 'index');
const Note = r => require.ensure([], () => r(require('../containers/Note')), 'note');
const NoteList = r => require.ensure([], () => r(require('../containers/NoteList')), 'notelist');
const NoteDetailsList = r => require.ensure([], () => r(require('../containers/NoteDetailsList')), 'notedetailslist');

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
      path: '/note',
      component: Note,
      children: [{
        path: 'list', // 笔记列表
        component: NoteList,

      },{
        path: 'detailslist', // 详情列表
        component: NoteDetailsList
      }]
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
