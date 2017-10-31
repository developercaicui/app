
import VueRouter from 'vue-router';

const Login = r => require.ensure([], () => r(require('srcIpad/page/Login')), 'login');
const Exam = r => require.ensure([], () => r(require('srcIpad/page/Exam')), 'exam');;

const Index = r => require.ensure([], () => r(require('../containers/Index')), 'index');
const Note = r => require.ensure([], () => r(require('../containers/Note')), 'note');
const NoteList = r => require.ensure([], () => r(require('../containers/NoteList')), 'notelist');


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
        component: NoteList
      }]
    },{
      path: '/exam/:type/:id',
      component: Exam
    },{
      path: '/exam/:type/:id/:examNum',
      component: Exam
    }]
});
