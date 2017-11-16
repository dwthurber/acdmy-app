<template>
  <div class="columns is-mobile is-gapless">
    <Sidebar :fullscreen.sync="fullscreen" />
    <div class="column" v-if="room.data">

      <div class="is-paddingless">
        <div class="hero is-fullheight">
          <MainHeader />
          <div class="hero-end is-paddingless">
            <LayoutVideobar v-if="room.data.layout == 'videobar'" />
            <LayoutFullscreen v-else-if="room.data.layout == 'fullscreen'" />
            <LayoutFreeform v-else />
          </div>
        </div>
        <a v-if="fullscreen" class="navbar-item is-close fullscreen-exit" title="Exit Fullscreen" @click.prevent="fullscreen = false">
          <b-icon icon="fullscreen_exit" />
        </a>
      </div>
    </div>
    <b-loading v-else :active.sync="isLoading" :canCancel="false"></b-loading>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import MainHeader from '@/components/MainHeader'
import LayoutVideobar from '@/components/LayoutVideobar'
import LayoutFullscreen from '@/components/LayoutFullscreen'
import LayoutFreeform from '@/components/LayoutFreeform'
import { mapState } from 'vuex'
import { usersRef, roomsRef, peopleRef, sessionsRef } from '@/firebase'
import Firebase from 'firebase'

export default {
  name: 'main',
  components: {
    Sidebar,
    MainHeader,
    LayoutVideobar,
    LayoutFullscreen,
    LayoutFreeform
  },
  computed: {
    ...mapState(['user', 'route', 'userDetails', 'room'])
  },
  data () {
    return {
      isCardModalActive: true,
      isLoading: true,
      fullscreen: false
    }
  },
  beforeCreate () {
    let self = this
    let user = Firebase.auth().currentUser
    this.$store.dispatch('setUserDetailsRef', usersRef.child(user.uid))

    const activeRoomRef = usersRef.child(user.uid)
    activeRoomRef.once('value', function (snap) {
      let roomId = snap.val().activeRoom
      if (roomId) {
        self.$store.dispatch('setCurrentRoomRef', roomsRef.child(roomId))
        self.$store.dispatch('setPeopleRef', peopleRef.child(roomId))
        self.$store.dispatch('setCurrentUserRef', peopleRef.child(roomId).child(user.uid))
      }
      // console.log(roomId)
    })
  },
  mounted () {
    this.updateLayout()
  },
  methods: {
    updateLayout () {
      let layout = this.room.data.layout
      this.$nextTick(function () {
        if (layout === 'videobar') {
          this.$router.replace({ name: 'SessionLayoutVideobar' })
        } else {
          this.$router.replace({ name: 'Main' })
        }
      })
    },
    bindUserDetails () {
      let user = Firebase.auth().currentUser
      this.$store.dispatch('setUserDetailsRef', usersRef.child(user.uid))
    },
    bindRefs () {
      this.$store.dispatch('setSessionsRef', sessionsRef.child(this.userDetails.activeRoom))
      this.$store.dispatch('setPeopleRef', peopleRef.child(this.userDetails.activeRoom))
      this.$store.dispatch('setCurrentRoomRef', roomsRef.child(this.userDetails.activeRoom))
      this.$store.dispatch('setCurrentUserRef', peopleRef.child(this.userDetails.activeRoom).child(this.user.uid))
    }
  }
}
</script>

<style scoped>
.main {
  flex: 1;
  overflow-y: auto;
}
.hero-end {
  flex-grow: 1;
  display: flex;
}
.fullscreen-exit {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #fff;
  opacity: 0;
}
.fullscreen-exit:hover {
  opacity: 0.8;
}
</style>
