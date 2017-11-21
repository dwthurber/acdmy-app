<template>
  <div class="column hero is-fullheight">
    <RoomHeader />
    <div class="hero-end" v-if="room.data && user">
      <LayoutVideobar v-if="room.data.layout == 'videobar'" />
      <LayoutFullscreen v-else-if="room.data.layout == 'fullscreen'" />
      <LayoutFreeform v-else />
    </div>
    <RoomModal v-else-if="roomModal" />
    <b-loading v-else :active="true" :canCancel="false"></b-loading>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { usersRef, statusRef, roomsRef, peopleRef } from '@/firebase'
import Firebase from 'firebase'
import RoomModal from '@/components/RoomModal'
import RoomHeader from '@/components/RoomHeader'
import LayoutVideobar from '@/components/LayoutVideobar'
import LayoutFullscreen from '@/components/LayoutFullscreen'
import LayoutFreeform from '@/components/LayoutFreeform'

export default {
  name: 'Room',
  components: {
    RoomHeader,
    RoomModal,
    LayoutVideobar,
    LayoutFullscreen,
    LayoutFreeform
  },
  computed: {
    ...mapState([
      'user',
      'userDetails',
      'room'
    ])
  },
  data () {
    return {
      fullscreen: false,
      name: '',
      roomId: '',
      roomModal: false
    }
  },
  beforeCreate () {
    let self = this
    let user = Firebase.auth().currentUser
    this.$store.dispatch('setUserDetailsRef', statusRef.child(user.uid))

    const activeRoomRef = statusRef.child(user.uid)
    activeRoomRef.once('value', function (snap) {
      let roomId = snap.val().activeRoom
      if (roomId) {
        self.$store.dispatch('setCurrentRoomRef', roomsRef.child(roomId))
        self.$store.dispatch('setPeopleRef', peopleRef.child(roomId))
        self.$store.dispatch('setCurrentUserRef', peopleRef.child(roomId).child(user.uid))
      } else {
        self.roomModal = true
      }
    })
  },
  mounted () {
    this.setUserRooms()
    this.setPresence()
  },
  methods: {
    setUserRooms () {
      this.$store.dispatch('setAllRoomsRef', roomsRef)
      this.$store.dispatch('setUserRoomsRef', usersRef.child(this.user.uid).child('rooms'))
    },
    setPresence () {
      const uid = this.user.uid
      const userStatusDatabaseRef = Firebase.database().ref(`/status/${uid}`)
      const isOfflineForDatabase = {
        state: 'offline',
        last_changed: Firebase.database.ServerValue.TIMESTAMP
      }
      const isOnlineForDatabase = {
        state: 'online',
        last_changed: Firebase.database.ServerValue.TIMESTAMP
      }
      Firebase.database().ref('.info/connected').on('value', function (snapshot) {
        if (snapshot.val()) {
          userStatusDatabaseRef.onDisconnect().update(isOfflineForDatabase)
          userStatusDatabaseRef.update(isOnlineForDatabase)
        }
      })
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
.tile.is-ancestor {
  margin: .1rem;
}
a.has-text-warning {
  position: relative;
  bottom: 5px;
  right: 3px;
}
</style>
