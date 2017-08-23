
import VueRouter from 'vue-router';

const Index = r => require.ensure([], () => r(require('../page/Index')), 'index')
const Reg = r => require.ensure([], () => r(require('../page/Reg')), 'reg')
const FindPwd = r => require.ensure([], () => r(require('../page/FindPwd')), 'fidPwd')
const Login = r => require.ensure([], () => r(require('../page/Login')), 'login')
<<<<<<< HEAD
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
=======
const Loading = r => require.ensure([], () => r(require('../components/Comm/Loading')), 'loading')
const Course = r => require.ensure([], () => r(require('../page/Course')), 'course')
const Setting = r => require.ensure([], () => r(require('../page/Setting')), 'setting')

>>>>>>> fa2f8739fabe28b69810f1fc2a13fc2ceae26662


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
      component: FindPwd,
    },{
      path: '/reg',
      component: Reg,
    },{
      path: '/login',
      component: Login,
    },{
<<<<<<< HEAD
      path: '/note',
      component: Note,
      children: [{
         path: 'list',
         component: NoteList,
       },{
         path: 'detailslist',
         component: NoteDetailsList,
       },{
         path: 'details',
         component: NoteDetails
       },{
         path: 'edit',
         component: NoteEdit
       },{
         path: 'search',
         component: NoteSearch
       }
      ]
    },{
      path: '/exchange',
      component: Exchange,
      children: [{
          path: 'edit',
          component: ExchangeEdit
        },{
          path: 'list',
          component: ExchangeList
        },{
          path: 'details',
          component: ExchangeDetails
        },
      ]
    },
=======
      path: '/course',
      component: Course
    },{
      path: '/setting',
      component: Setting
    }
>>>>>>> fa2f8739fabe28b69810f1fc2a13fc2ceae26662
   ]
});
