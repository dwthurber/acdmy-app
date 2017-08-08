import Vue from 'vue'
import Router from 'vue-router'
import Session from '@/components/Session'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Dashboard from '@/components/main/Dashboard'
import ManageSessions from '@/components/main/ManageSessions'
import Classroom from '@/components/main/Classroom'
import Chat from '@/components/main/Chat'
import Assets from '@/components/main/Assets'
import People from '@/components/main/People'
import Settings from '@/components/main/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      name: 'Main',
      children: [
        {
          path: '/r/:roomid/',
          component: Classroom,
          name: 'Main-Classroom'
        },
        {
          path: '/r/:roomid/chat',
          component: Chat,
          name: 'Main-Chat'
        },
        {
          path: '/r/:roomid/dashboard/',
          component: Dashboard,
          name: 'Dashboard',
          children: [
            {
              path: '/r/:roomid/sessions',
              component: ManageSessions,
              name: 'Dashboard-Sessions'
            },
            {
              path: '/r/:roomid/assets',
              component: Assets,
              name: 'Dashboard-Assets'
            },
            {
              path: '/r/:roomid/people',
              component: People,
              name: 'Dashboard-People'
            },
            {
              path: '/r/:roomid/settings',
              component: Settings,
              name: 'Dashboard-Settings'
            }
          ]
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
      redirect: { name: 'Main' }
    }
  ]
})
