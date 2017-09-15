<template>
  <div id="session" v-if="user !== false" class="is-maxheight">
    <b-loading :active.sync="isLoading"></b-loading>
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
    ...mapState(['user', 'route', 'currentSession'])
  },
  data () {
    return {
      isLoading: true
    }
  },
  created () {
    this.setActiveRoom()
  },
  mounted () {
    this.isLoading = false
  },
  methods: {
    setActiveRoom () {
      this.$store.dispatch('setCurrentRoomRef', roomsRef.child(this.route.params.roomid))
      this.$store.dispatch('setCurrentSession', sessionsRef.child(this.route.params.roomid).child(this.route.params.sessionid))
      // this.$store.dispatch('setPeople', peopleRef.child(this.route.params.roomid))
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
