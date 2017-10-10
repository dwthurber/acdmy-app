<template>
  <div class="container">
    <div
      class="columns is-mobile"
      v-if="room.data && room.sessions && room.user" >
      <aside class="column is-narrow">
        <div class="menu">
          <ul class="menu-list">
            <b-tooltip
              label="Sessions"
              position="is-right" >
              <router-link
                :to="{name: 'MainDashboardSessions'}"
                tag="li"
                append
                exact >
                <a>
                  <b-icon class="re-align" icon="view_list" />
                </a>
              </router-link>
            </b-tooltip><br />

            <b-tooltip
              label="People"
              position="is-right" >
              <router-link
                :to="{name: 'MainDashboardPeople'}"
                tag="li"
                exact
                append >
                <a>
                  <b-icon class="re-align" icon="people" />
                </a>
              </router-link>
            </b-tooltip>
            <br />
            <b-tooltip
              label="Assets"
              position="is-right" >
              <router-link
                :to="{name: 'MainDashboardAssets'}"
                tag="li"
                append
                exact >
                <a>
                  <b-icon class="re-align" icon="folder" />
                </a>
              </router-link>
            </b-tooltip>
            <br />
            <b-tooltip
              label="Settings"
              position="is-right"
              v-show="room.user.role == 'Instructor'" >
              <router-link
                :to="{name: 'MainDashboardSettings'}"
                tag="li"
                append
                exact >
                <a>
                  <b-icon class="re-align" icon="settings" />
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
    <b-loading v-else active></b-loading>
  </div>
</template>

<script>
import { peopleRef, roomsRef, sessionsRef } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'MainDashboard',
  computed: {
    ...mapState([
      'user',
      'route',
      'room'
    ])
  },
  data () {
    return {
    }
  },
  created () {
    this.setOnlineStatus()
    this.bindRefs()
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
