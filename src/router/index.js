import Vue from 'vue'
import Router from 'vue-router'
import Session from '@/components/Session'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Main from '@/components/dashboard/Main'
import Sessions from '@/components/dashboard/Sessions'
// import store from '@/store/index'

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
    },
    {
      path: '*',
      redirect: { name: 'Login' }
    }
  ]
})
