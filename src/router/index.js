import Vue from 'vue'
import Router from 'vue-router'
import Session from '@/components/Session'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
