<template>
  <div class="container">
    <div class="columns is-mobile">
      <aside class="column is-narrow">
        <div class="menu">
          <ul class="menu-list">
            <!-- <router-link :to="{name: 'Dashboard'}" tag="li" exact append >
              <a><b-icon class="re-align" icon="home" size="is-small" />
                <span class="is-hidden-touch">Home</span>
              </a>
            </router-link> -->
            <b-tooltip label="Sessions" position="is-right">
              <router-link :to="{name: 'Dashboard-Sessions'}" tag="li" append exact>
                <a><b-icon class="re-align" icon="view_list" />
                  <!-- <span class="is-hidden-touch"> Sessions</span> -->
                </a>
              </router-link>
            </b-tooltip><br />
            <!-- <router-link :to="{name: 'Dashboard-Activities'}" tag="li" append exact>
              <a><b-icon class="re-align" icon="extension" size="is-small" />
                <span class="is-hidden-touch">Activities</span>
              </a>
            </router-link> -->
            <b-tooltip label="People" position="is-right">
              <router-link :to="{name: 'Dashboard-People'}" tag="li" exact append >
                <a><b-icon class="re-align" icon="people" />
                  <!-- <span class="is-hidden-touch"> People</span> -->
                </a>
              </router-link>
            </b-tooltip><br />
            <b-tooltip label="Assets" position="is-right">
              <router-link :to="{name: 'Dashboard-Assets'}" tag="li" append exact>
                <a><b-icon class="re-align" icon="folder" />
                  <!-- <span class="is-hidden-touch"> Assets</span> -->
                </a>
              </router-link>
            </b-tooltip><br />
            <b-tooltip label="Settings" position="is-right" v-if="room.user.role == 'Instructor'">
              <router-link :to="{name: 'Dashboard-Settings'}" tag="li" append exact>
                <a><b-icon class="re-align" icon="settings" />
                  <!-- <span class="is-hidden-touch"> Settings</span> -->
                </a>
              </router-link>
            </b-tooltip>
          </ul>
        </div>
      </aside>
      <div class="column content-panel">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { peopleRef, roomsRef, sessionsRef } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'dashboard',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['user', 'route', 'room'])
  },
  created () {
    this.setOnlineStatus()
    this.bindRefs()
  },
  mounted () {
  },
  methods: {
    bindRefs () {
      if (!this.room.data) {
        this.$store.dispatch('setSessionsRef', sessionsRef.child(this.route.params.roomid))
        this.$store.dispatch('setPeopleRef', peopleRef.child(this.route.params.roomid))
        this.$store.dispatch('setCurrentRoomRef', roomsRef.child(this.route.params.roomid))
        this.$store.dispatch('setCurrentUserRef', peopleRef.child(this.route.params.roomid).child(this.user.uid))
      }
    },
    setOnlineStatus () {
      peopleRef.child(this.route.params.roomid).child(this.user.uid).update({
        online: true
      })
    }
  }
}
</script>

<style scoped>
.router-link-active a {
  font-weight: bolder;
  color: hsl(205, 36%, 43%);
}
.content-panel {
  padding: 0.75rem 1.75rem;
}
</style>
