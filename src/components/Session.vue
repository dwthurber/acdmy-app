<template>
  <div id="session" v-if="user !== false">
    <router-view v-if="$route.params.sessionid"></router-view>
    <VideobarLayout v-if="session.layout == 1"/>
  </div>
</template>

<script>
import VideobarLayout from '@/components/session/VideobarLayout'
import { mapState } from 'vuex'
import { roomsRef, peopleRef, sessionsRef } from '@/firebase'

export default {
  components: { VideobarLayout },
  name: 'session',
  computed: {
    ...mapState(['user', 'route', 'session', 'room'])
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
  flex: 1;
  overflow-y: auto;
}
</style>
