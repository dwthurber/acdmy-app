import Vue from 'vue'
import Router from 'vue-router'
import Session from '@/components/Session'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Main from '@/components/dashboard/Main'
import Sessions from '@/components/dashboard/Sessions'
import Classroom from '@/components/dashboard/Classroom'
import Chat from '@/components/dashboard/Chat'
import Assets from '@/components/dashboard/Assets'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user/:uid',
      component: Dashboard,
      children: [
        {
          path: '',
          component: Main,
          name: 'Dashboard-Main'
        },
        {
          path: '/user/:uid/room/:roomid/sessions',
          component: Sessions,
          name: 'Dashboard-Sessions'
        },
        {
          path: '/user/:uid/room/:roomid/classroom',
          component: Classroom,
          name: 'Dashboard-Classroom'
        },
        {
          path: '/user/:uid/room/:roomid/chat',
          component: Chat,
          name: 'Dashboard-Chat'
        },
        {
          path: '/user/:uid/room/:roomid/assets',
          component: Assets,
          name: 'Dashboard-Assets'
        }
      ]
    },
    {
      path: '/room/:roomid/session/:sessionid',
      name: 'Session',
      component: Session
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      redirect: { name: 'Login' }
    }
  ]
})
