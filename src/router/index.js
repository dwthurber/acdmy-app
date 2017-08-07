import Vue from 'vue'
import Router from 'vue-router'
import Session from '@/components/Session'
import Login from '@/components/Login'
import Dashboard from '@/components/dashboard/Dashboard'
import Main from '@/components/Main'
import Sessions from '@/components/dashboard/Sessions'
import Classroom from '@/components/classroom/Classroom'
import Chat from '@/components/classroom/Chat'
import Assets from '@/components/dashboard/Assets'

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
              component: Sessions,
              name: 'Dashboard-Sessions'
            },
            {
              path: '/r/:roomid/assets',
              component: Assets,
              name: 'Dashboard-Assets'
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
