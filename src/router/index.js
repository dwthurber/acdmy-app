import Vue from 'vue'
import Router from 'vue-router'
import Session from '@/components/Session'
import Login from '@/components/setup/Login'
import Signup from '@/components/setup/Signup'
import Setup from '@/components/Setup'
import Main from '@/components/Main'
import Dashboard from '@/components/main/Dashboard'
import ManageSessions from '@/components/main/ManageSessions'
import Classroom from '@/components/main/Classroom'
import Chat from '@/components/main/Chat'
import Assets from '@/components/main/Assets'
import People from '@/components/main/People'
import Settings from '@/components/main/Settings'
import Rooms from '@/components/rooms'
import VideobarLayout from '@/components/session/VideobarLayout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '/',
          component: Rooms,
          name: 'Main'
        },
        {
          path: '/r/:roomid/class',
          component: Classroom,
          name: 'Main-Classroom'
        },
        {
          path: '/r/:roomid/chat',
          component: Chat,
          name: 'Main-Chat'
        },
        {
          path: '/r/:roomid/dashboard',
          component: Dashboard,
          children: [
            {
              path: '/',
              component: ManageSessions,
              name: 'Dashboard-Sessions'
            },
            {
              path: '/r/:roomid/dashboard/assets',
              component: Assets,
              name: 'Dashboard-Assets'
            },
            {
              path: '/r/:roomid/dashboard/people',
              component: People,
              name: 'Dashboard-People'
            },
            {
              path: '/r/:roomid/dashboard/settings',
              component: Settings,
              name: 'Dashboard-Settings'
            }
          ]
        }
      ]
    },
    {
      path: '/r/:roomid/s/:sessionid',
      component: Session,
      name: 'Session',
      children: [
        {
          path: '/r/:roomid/s/:sessionid/videobar',
          component: VideobarLayout,
          name: 'Videobar'
        }
      ]
    },
    {
      path: '/login',
      component: Setup,
      children: [
        {
          path: '/',
          name: 'Login',
          component: Login
        },
        {
          path: '/signup',
          name: 'Signup',
          component: Signup
        }
      ]
    },
    {
      path: '*',
      redirect: { name: 'Main' }
    }
  ]
})
