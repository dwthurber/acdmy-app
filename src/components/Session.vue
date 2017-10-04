<template>
  <div id="session" class="columns is-mobile is-gapless is-multiline" v-if="user">
    <div class="column is-narrow">
      <Sidebar :option.sync="option" :expanded.sync="expanded" />
    </div>
    <div class="column vertical">
      <Topbar :option.sync="option" :expanded.sync="expanded" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/session/sidebar/Sidebar'
import Topbar from '@/components/session/topbar/Topbar'
import { mapState } from 'vuex'
import { roomsRef, peopleRef, sessionsRef } from '@/firebase'

export default {
  components: { Sidebar, Topbar },
  name: 'session',
  computed: {
    ...mapState(['user', 'route', 'session', 'room'])
  },
  data () {
    return {
      option: null,
      expanded: false
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
      if (this.session.layout === 1) {
        this.$router.replace({ name: 'Videobar' })
      }
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
#session {
  /*overflow: hidden;*/
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}
.vertical {
  flex-direction: column;
  display: flex;
}
</style>
