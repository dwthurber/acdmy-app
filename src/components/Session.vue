<template>
  <div id="session" v-if="user">
    <Navbar v-if="user" />
    <div class="columns is-mobile is-gapless is-multiline is-maxheight" v-if="session">
      <div class="column is-narrow">
        <SessionSidebar
          :option.sync="option"
          :expanded.sync="expanded" />
      </div>
      <div class="column vertical">
        <SessionTopbar
          :option.sync="option"
          :expanded.sync="expanded" />
        <router-view></router-view>
      </div>
    </div>
    <b-loading v-else active></b-loading>
  </div>
</template>

<script>
import { roomsRef, peopleRef, sessionsRef } from '@/firebase'
import { mapState } from 'vuex'
import Navbar from '@/components/Navbar'
import SessionSidebar from '@/components/SessionSidebar'
import SessionTopbar from '@/components/SessionTopbar'

export default {
  name: 'Session',
  components: {
    SessionSidebar,
    SessionTopbar,
    Navbar
  },
  computed: {
    ...mapState([
      'user',
      'route',
      'session',
      'room'
    ])
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
        this.$router.replace({ name: 'SessionLayoutVideobar' })
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
  flex: 1;
  overflow: hidden;
}
.vertical {
  flex-direction: column;
  display: flex;
}
</style>
