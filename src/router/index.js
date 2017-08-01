import Vue from 'vue'
import Router from 'vue-router'
import Session from '@/components/Session'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Main from '@/components/dashboard/Main'
import Sessions from '@/components/dashboard/Sessions'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user/:uid',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '/user/:uid',
          component: Main,
          name: 'Dashboard-Main'
        },
        {
          path: '/user/:uid/sessions',
          component: Sessions,
          name: 'Dashboard-Sessions'
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
    }
  ]
})
