// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import store from './store/index'
import { sync } from 'vuex-router-sync'

Vue.use(Buefy)

Vue.config.productionTip = false

sync(store, router) // done.

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
