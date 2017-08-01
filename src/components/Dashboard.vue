<template>
  <div v-if="user !== false">
    <b-loading :active.sync="isLoading" :canCancel="false"></b-loading>
    <Navbar />
    <div class="columns is-gapless">
      <aside class="column is-2 aside hero is-fullheight is-mobile">
        <b-menu>
          <b-menu-list>
            <router-link :to="{name: 'Dashboard-Main'}" tag="li" exact append>
              <a><b-icon size="is-small" class="re-align" icon="dashboard" />
                Dashboard
              </a>
            </router-link>
          </b-menu-list>
          <b-menu-list label="collaboration">
            <router-link :to="{name: 'Dashboard-Classroom'}" tag="li" append>
              <a><b-icon size="is-small" class="re-align" icon="group_work" />
                Classroom
              </a>
            </router-link>
            <router-link :to="{name: 'Dashboard-Chat'}" tag="li" append>
              <a><b-icon size="is-small" class="re-align" icon="question_answer" />
                Chat
              </a>
            </router-link>
          </b-menu-list>
          <b-menu-list label="setup">
            <router-link :to="{name: 'Dashboard-Sessions'}" tag="li" append>
              <a><b-icon size="is-small" class="re-align" icon="view_list" />
                Sessions
              </a>
            </router-link>
            <router-link :to="{name: 'Dashboard-Assets'}" tag="li" append>
              <a><b-icon size="is-small" class="re-align" icon="folder" />
                Assets
              </a>
            </router-link>
            <b-menu-dropdown>
              <template slot="trigger"><b-icon size="is-small" class="re-align" icon="settings" /> Settings</template>
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
              <router-link :to="'/users'" tag="li">
                <a>
                  Users
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
    ...mapState(['user', 'roomid'])
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
.re-align {
  margin-top: -3px;
}
</style>
