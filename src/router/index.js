import Vue from 'vue'
import Router from 'vue-router'
import Session from '@/components/Session'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Main from '@/components/Main'
import Sessions from '@/components/dashboard/Sessions'
import Classroom from '@/components/classroom/Classroom'
import Chat from '@/components/dashboard/Chat'
import Assets from '@/components/dashboard/Assets'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/a/:uid/',
      component: Main,
      name: 'Main',
      children: [
        {
          path: '/a/:uid/r/:roomid/',
          component: Classroom,
          name: 'Main-Classroom'
        }
      ]
    },
    {
      path: '/a/:uid/dashboard/',
      component: Dashboard,
      children: [
        {
          path: '',
          component: Main,
          name: 'Dashboard-Main'
        },
        {
          path: '/a/:uid/room/:roomid/sessions',
          component: Sessions,
          name: 'Dashboard-Sessions'
        },
        {
          path: '/a/:uid/room/:roomid/chat',
          component: Chat,
          name: 'Dashboard-Chat'
        },
        {
          path: '/a/:uid/room/:roomid/assets',
          component: Assets,
          name: 'Dashboard-Assets'
        }
      ]
    },
    {
      path: '/r/:roomid/s/:sessionid',
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
