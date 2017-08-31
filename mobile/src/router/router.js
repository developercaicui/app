
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
const CourseExchange = r => require.ensure([], () => r(require('../page/CourseExchange')), 'courseExchange')
const CourseExchangeDetails = r => require.ensure([], () => r(require('../page/CourseExchangeDetails')), 'courseExchangeDetails')
const CourseExchangeList = r => require.ensure([], () => r(require('../page/CourseExchangeList')), 'courseExchangeList')

export default  new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Loading
    },{
      path: '/index',
      component: Index
    },{
      path: '/findpwd',
      component: FindPwd
    },{
      path: '/reg',
      component: Reg,
    },{
      path: '/login',
      component: Login,
    },{
      path: '/note',
      component: Note,
      children: [{
         path: 'list',
         component: NoteList,
       },{
         path: 'detailslist/:data',
         component: NoteDetailsList,
       },{
         path: 'details/:data',
         component: NoteDetails
       },{
         path: 'edit/:data',
         component: NoteEdit
       },{
         path: 'search',
         component: NoteSearch
       },{
         path: 'selected',
         component: NoteSelected,
       },{
         path: 'selectedsection/:data',
         component: NoteSelectedSection
       }
      ]
    },{
      path: '/exchange',
      component: Exchange,
      children: [{
          path: 'edit/:data',
          component: ExchangeEdit
        },{
          path: 'list',
          component: ExchangeList
        },{
          path: 'details/:data',
          component: ExchangeDetails
        },
      ]
    },{
      path: '/courseexchange',
      component: CourseExchange,
      children: [
        {
          path: 'list',
          component: CourseExchangeList
        }
        ,{
          path: 'details/:data',
          component: CourseExchangeDetails
        }
      ]
    },{
      path: '/course',
      component: Course
    },{
      path: '/setting',
      component: Setting
    }
   ]
});
