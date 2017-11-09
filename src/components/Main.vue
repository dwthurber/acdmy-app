<template>
  <div class="columns is-mobile is-gapless">
    <Sidebar />
    <div class="column" v-if="room.data">

      <div class="box is-paddingless">
        <div class="hero is-fullheight">
          <div class="hero-head">
            <div class="level is-mobile">
              <div class="level-item">
                <b-dropdown position="is-bottom-left">
                  <button class="button is-white" slot="trigger">
                    <span class="is-uppercase is-size-7">{{ room.data.name }}</span>
                    <b-icon icon="keyboard_arrow_down" size="is-small"></b-icon>
                  </button>

                  <b-dropdown-item custom>
                    <p class="subtitle is-7 is-uppercase">Options</p>
                  </b-dropdown-item>
                  <b-dropdown-item>Rename</b-dropdown-item>
                  <b-dropdown-item separator></b-dropdown-item>
                  <b-dropdown-item custom>
                    <p class="subtitle is-7 is-uppercase">Switch Rooms</p>
                  </b-dropdown-item>
                  <b-dropdown-item>My Fantasic Classroom</b-dropdown-item>
                  <b-dropdown-item>A Room with a view</b-dropdown-item>
                  <b-dropdown-item separator></b-dropdown-item>
                  <b-dropdown-item><b-icon icon="add_circle_outline" size="is-small" /> Add a Room</b-dropdown-item>
                </b-dropdown>
              </div>
              <div class="level-right">
                <!-- <img class="level-item" src="../assets/acdmy.png" alt="Acdmy: Synchronous Online Learning Platform"> -->
              </div>
            </div>
          </div>
          <div class="hero-body is-paddingless">
            <!-- <router-view /> -->
          </div>
        </div>
      </div>
    </div>
    <b-loading v-else :active.sync="isLoading" :canCancel="false"></b-loading>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import { mapState } from 'vuex'
import { usersRef, roomsRef, peopleRef, sessionsRef } from '@/firebase'
import Firebase from 'firebase'

export default {
  name: 'main',
  components: {
    Sidebar
  },
  computed: {
    ...mapState(['user', 'route', 'userDetails', 'room'])
  },
  data () {
    return {
      isCardModalActive: true,
      isLoading: true
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
      console.log(roomId)
    })
  },
  mounted () {
    // this.$store.dispatch('setSessionsRef', sessionsRef.child(this.userDetails.activeRoom))
    // this.$store.dispatch('setPeopleRef', peopleRef.child(this.userDetails.activeRoom))
    // this.$store.dispatch('setCurrentRoomRef', roomsRef.child(this.userDetails.activeRoom))
    // this.$store.dispatch('setCurrentUserRef', peopleRef.child(this.userDetails.activeRoom).child(this.user.uid))
    // if (this.userDetails.activeRoom) {
    //   this.bindRefs()
    // }
  },
  methods: {
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
.hero-head img {
  margin: .5rem auto;
}
.hero-head .image {
  margin-bottom: 1rem;
}
.hero-head {
  padding: 0 .5rem;
}
.main {
  flex: 1;
  overflow-y: auto;
}
.level {
  min-height: 2.25rem;
}
img.level-item {
  max-height: 1.75rem;
}
.button .is-uppercase {
  letter-spacing: 0.25rem;
  font-weight: 300;
}
</style>
