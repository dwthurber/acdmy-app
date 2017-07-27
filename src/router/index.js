import Vue from 'vue'
import Router from 'vue-router'
import Session from '@/components/Session'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Session',
      component: Session
    }
  ]
})
