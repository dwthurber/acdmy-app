<template>
  <div class="columns is-mobile is-multiline is-gapless">
    <Sidebar :fullscreen.sync="fullscreen" v-if="room.data && user" />
    <div class="column hero is-fullheight" v-if="room.data && user">
      <MainHeader />
      <div class="hero-end">
        <LayoutVideobar v-if="room.data.layout == 'videobar'" />
        <LayoutFullscreen v-else-if="room.data.layout == 'fullscreen'" />
        <LayoutFreeform v-else />
      </div>
    </div>
    <div class="column hero is-fullheight is-primary" v-else-if="!user">
      <div class="hero-head">
        <div class="container">
          <img class="brand" src="../assets/acdmy-white.png" />
        </div>
      </div>
      <div class="hero-body">
        <div class="container">
          <h2 class="title">
            Welcome.
          </h2>
          <h3 class="subtitle">
            You are not currently logged in. Please <router-link class="button is-light is-outlined" :to="{ name: 'SetupLogin', params: {} }">Login</router-link> or <router-link class="button is-light is-outlined" :to="{ name: 'SetupSignup', params: {} }">Signup</router-link>
          </h3>
        </div>
      </div>
      <div class="hero-foot">
        <div class="container">
          <small>&copy; Acdmy.io</small>
        </div>
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
import { usersRef, roomsRef, peopleRef } from '@/firebase'
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
    this.setUserRooms()
  },
  methods: {
    setUserRooms () {
      this.$store.dispatch('setAllRoomsRef', roomsRef)
      this.$store.dispatch('setUserRoomsRef', usersRef.child(this.user.uid).child('rooms'))
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
.brand {
  height: 60px;
  margin: 48px 0;
}
.hero-foot {
  margin: 48px 0;
}
.subtitle {
  line-height: 2.1rem;
}
</style>
