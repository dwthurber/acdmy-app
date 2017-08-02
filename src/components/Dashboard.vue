<template>
  <div v-if="user !== false">
    <b-loading :active.sync="isLoading" :canCancel="false"></b-loading>
    <Navbar />
    <div class="columns is-mobile is-gapless">
      <aside class="column is-narrow aside hero is-fullheight is-mobile">
        <b-menu>
          <b-menu-list class="has-text-centered">
            <router-link :to="{name: 'Dashboard-Main'}" tag="li" exact append >
              <a><b-icon size="is-medium" class="re-align" icon="view_module" /><br>
                Rooms
              </a>
            </router-link>
          </b-menu-list>
          <hr>
          <b-menu-list class="has-text-centered" v-if="$route.params.roomid">
            <router-link :to="{name: 'Dashboard-Classroom'}" tag="li" append>
              <a><b-icon size="is-medium" class="re-align" icon="group_work" /><br>
                Room
              </a>
            </router-link>
            <router-link :to="{name: 'Dashboard-Chat'}" tag="li" append>
              <a><b-icon size="is-medium" class="re-align" icon="question_answer" /><br>
                Chat
              </a>
            </router-link>
            <router-link :to="{name: 'Dashboard-Analytics'}" tag="li" exact append >
              <a><b-icon size="is-medium" class="re-align" icon="dashboard" /><br>
                Dashboard
              </a>
            </router-link>
            <router-link :to="{name: 'Dashboard-Sessions'}" tag="li" append>
              <a><b-icon size="is-medium" class="re-align" icon="view_list" /><br>
                Sessions
              </a>
            </router-link>
            <router-link :to="{name: 'Dashboard-Assets'}" tag="li" append>
              <a><b-icon size="is-medium" class="re-align" icon="folder" /><br>
                Assets
              </a>
            </router-link>
          </b-menu-list>
          <b-menu-list class="has-text-centered is-bottom">
            <router-link :to="{name: 'Dashboard-Settings'}" tag="li" append exact>
              <a><b-icon size="is-medium" class="re-align" icon="settings" /><br>
                Settings
              </a>
            </router-link>
          </b-menu-list>
        </b-menu>
      </aside>
      <div class="column admin-panel">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import { db } from '@/firebase'

const usersRef = db.ref('users')

export default {
  components: { Navbar },
  name: 'dashboard',
  computed: {
    ...mapGetters(['users']),
    ...mapState(['user'])
  },
  data () {
    return {
      isLoading: true,
      dashboardRoute: ''
    }
  },
  mounted () {
    this.$store.dispatch('setUsersRef', usersRef)
    this.isLoading = false
  }
}
</script>

<style scoped>
.aside {
  background-color: #fcfcfc;
  padding: 12px 0!important;
  position: relative
}
.router-link-active {
  border-right: 3px solid hsl(205, 36%, 43%);
}
.router-link-active a {
  font-weight: bolder;
  color: hsl(205, 36%, 43%);
}
.is-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
