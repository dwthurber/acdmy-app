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
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
          component: Main
        },
        {
          path: '/sessions',
          component: Sessions
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
