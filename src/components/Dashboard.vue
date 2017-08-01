<template>
  <div v-if="user !== false">
    <b-loading :active.sync="isLoading" :canCancel="false"></b-loading>
    <Navbar />
    <div class="columns is-gapless">
      <aside class="column is-2 aside hero is-fullheight is-mobile">
        <b-menu>
          <b-menu-list>
            <router-link :to="'/'" tag="li" exact>
              <a><b-icon icon="dashboard" />
                Home
              </a>
            </router-link>
            <router-link :to="'/sessions'" tag="li">
              <a><b-icon icon="list" />
                Sessions
              </a>
            </router-link>
            <b-menu-dropdown>
              <template slot="trigger"><b-icon icon="settings" /> Settings</template>
              <router-link :to="'/account'" tag="li">
                <a>
                  Account
                </a>
              </router-link>
              <router-link :to="'/rooms'" tag="li">
                <a>
                  Rooms
                </a>
              </router-link>
            </b-menu-dropdown>
          </b-menu-list>
        </b-menu>
      </aside>
      <div class="column is-10 admin-panel">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from '@/components/Navbar'

export default {
  components: { Navbar },
  name: 'dashboard',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      isLoading: true,
      dashboardRoute: ''
    }
  },
  mounted () {
    this.isLoading = false
  }
}
</script>

<style scoped>
.aside {
  background-color: #fcfcfc;
  padding: 12px 0!important;
}
.router-link-active {
  border-right: 3px solid hsl(205, 36%, 43%);
}
.router-link-active a {
  font-weight: bolder;
  color: hsl(205, 36%, 43%);
}
</style>
