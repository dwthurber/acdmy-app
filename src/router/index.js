import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Setup from '@/components/Setup'
import SetupLogin from '@/components/SetupLogin'
import SetupSignup from '@/components/SetupSignup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      name: 'Main'
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
