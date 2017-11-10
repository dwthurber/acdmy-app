import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import MainChat from '@/components/MainChat'
// import MainClassroom from '@/components/MainClassroom'
import MainDashboard from '@/components/MainDashboard'
import MainDashboardAssets from '@/components/MainDashboardAssets'
import MainDashboardPeople from '@/components/MainDashboardPeople'
import MainDashboardSessions from '@/components/MainDashboardSessions'
import MainDashboardSettings from '@/components/MainDashboardSettings'
// import MainRooms from '@/components/MainRooms'
import Session from '@/components/Session'
import LayoutVideobar from '@/components/LayoutVideobar'
import LayoutFreeform from '@/components/LayoutFreeform'
import LayoutFullscreen from '@/components/LayoutFullscreen'
import Setup from '@/components/Setup'
import SetupLogin from '@/components/SetupLogin'
import SetupSignup from '@/components/SetupSignup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '/',
          component: LayoutFreeform,
          name: 'Main'
        },
        {
          path: '/videobar',
          component: LayoutVideobar,
          name: 'SessionLayoutVideobar'
        },
        {
          path: '/fullscreen',
          component: LayoutFullscreen,
          name: 'LayoutFullscreen'
        },
        {
          path: '/r/:roomid/chat',
          component: MainChat,
          name: 'MainChat'
        },
        {
          path: '/r/:roomid/dashboard',
          component: MainDashboard,
          children: [
            {
              path: '/',
              component: MainDashboardSessions,
              name: 'MainDashboardSessions'
            },
            {
              path: '/r/:roomid/dashboard/assets',
              component: MainDashboardAssets,
              name: 'MainDashboardAssets'
            },
            {
              path: '/r/:roomid/dashboard/people',
              component: MainDashboardPeople,
              name: 'MainDashboardPeople'
            },
            {
              path: '/r/:roomid/dashboard/settings',
              component: MainDashboardSettings,
              name: 'MainDashboardSettings'
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
          path: '/videobar',
          component: LayoutVideobar,
          name: 'SessionLayoutVideobar'
        }
      ]
    },
    {
      path: '/login',
      component: Setup,
      children: [
        {
          path: '/',
          name: 'SetupLogin',
          component: SetupLogin
        },
        {
          path: '/signup',
          name: 'SetupSignup',
          component: SetupSignup
        }
      ]
    },
    {
      path: '*',
      redirect: { name: 'Main' }
    }
  ]
})
