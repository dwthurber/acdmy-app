<template>
  <div id="session" v-if="user !== false" class="is-maxheight">
    <router-view v-if="$route.params.sessionid"></router-view>
    <Videobar v-if="currentSession.layout == 1"/>
  </div>
</template>

<script>
import Videobar from '@/components/session/Videobar'
import { mapState } from 'vuex'
import { roomsRef, peopleRef, sessionsRef } from '@/firebase'

export default {
  components: { Videobar },
  name: 'session',
  computed: {
    ...mapState(['user', 'route', 'currentSession', 'room'])
  },
  data () {
    return {
    }
  },
  created () {
    this.setOnlineStatus()
  },
  mounted () {
    this.bindRefs()
  },
  methods: {
    bindRefs () {
      this.$store.dispatch('setCurrentSessionRef', sessionsRef.child(this.route.params.roomid).child(this.route.params.sessionid))
      if (!this.room.data) {
        this.$store.dispatch('setSessionsRef', sessionsRef.child(this.route.params.roomid))
        this.$store.dispatch('setPeopleRef', peopleRef.child(this.route.params.roomid))
        this.$store.dispatch('setCurrentRoomRef', roomsRef.child(this.route.params.roomid))
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
.videobar {
  border-bottom: 1px solid #cfcfcf;
}
#session {
  /*overflow: hidden;*/
}
</style>
