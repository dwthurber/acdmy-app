<template>
  <div class="hero-head">
    <div class="level is-mobile">
      <div class="level-item" v-if="room.data">
        <b-dropdown position="is-bottom-left" v-model="room.data['.key']">
          <a class="has-text-grey" slot="trigger">
            <span class="is-uppercase is-size-7">{{ room.data.name }}</span>
            <b-icon icon="keyboard_arrow_down" size="is-small"></b-icon>
          </a>

          <b-dropdown-item custom>
            <p class="subtitle is-7 is-uppercase">Options</p>
          </b-dropdown-item>
          <b-dropdown-item @click="renameRoom()">Rename</b-dropdown-item>
          <b-dropdown-item separator></b-dropdown-item>
          <b-dropdown-item custom>
            <p class="subtitle is-7 is-uppercase">Switch Rooms</p>
          </b-dropdown-item>
          <b-dropdown-item
            v-for="roomid in userRooms"
            :key="roomid['.key']"
            :class="{'is-active':roomid['.key'] == room.data.id}">
            <div
              v-for="(room, index) in allRooms"
              v-if="room['.key'] == roomid['.key']"
              :key="room['.key']"
              :value="room['.key']"
              @click="switchRooms(room['.key'])">
              {{room.name}}
            </div>
          </b-dropdown-item>
          <b-dropdown-item separator></b-dropdown-item>
          <b-dropdown-item @click="createRoom()"><b-icon icon="add_circle_outline" size="is-small" /> Add a Room</b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="level-right">
        <!-- <a class="navbar-item is-close" title="Enter Fullscreen" @click.prevent="fullscreen = true">
          <b-icon icon="fullscreen" />
        </a> -->
        <!-- <img class="level-item" src="../assets/acdmy.png" alt="Acdmy: Synchronous Online Learning Platform"> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { db, roomsRef, peopleRef } from '@/firebase'

export default {
  name: 'RoomHeader',
  components: {
  },
  computed: {
    ...mapState([
      'room',
      'userRooms',
      'allRooms',
      'user'
    ])
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    createRoom () {
      let toast = this.$toast
      this.$dialog.prompt({
        message: `What do you want to call your room?`,
        inputMaxlength: 50,
        inputPlaceholder: 'e.g. My Awesome Classroom',
        confirmText: 'Create',
        onConfirm: (value) => {
          let newRoomKey = roomsRef.push().key
          const user = {
            name: this.user.displayName,
            profile_picture: this.user.photoURL,
            role: 'Instructor'
          }
          const newRoom = {
            name: value,
            id: newRoomKey,
            layout: 'freeform',
            owner: this.user.uid
          }

          let updates = {}
          updates['/rooms/' + newRoomKey] = newRoom
          updates['/people/' + newRoomKey + '/' + this.user.uid] = user
          db.ref().update(updates)

          let indexes = {}
          indexes['/users/' + this.user.uid + '/rooms/' + newRoomKey] = true
          indexes['/rooms/' + newRoomKey + '/users/' + this.user.uid] = true
          db.ref().update(indexes)

          let activeRoom = {}
          activeRoom['/users/' + this.user.uid + '/activeRoom'] = newRoomKey
          db.ref().update(activeRoom)

          this.$store.dispatch('setCurrentRoomRef', roomsRef.child(newRoomKey))
          this.$store.dispatch('setPeopleRef', peopleRef.child(newRoomKey))
          this.$store.dispatch('setCurrentUserRef', peopleRef.child(newRoomKey).child(this.user.uid))

          toast.open(value + ' created!')
        }
      })
    },
    renameRoom () {
      let toast = this.$toast
      this.$dialog.prompt({
        message: `Enter a new name`,
        inputMaxlength: 50,
        inputPlaceholder: this.room.data.name,
        confirmText: 'Save',
        onConfirm: (value) => {
          let updates = {}
          updates['/rooms/' + this.room.data.id + '/name'] = value
          db.ref().update(updates)

          toast.open('Name updated to: ' + value)
        }
      })
    },
    switchRooms (val) {
      let activeRoom = {}
      activeRoom['/users/' + this.user.uid + '/activeRoom'] = val
      db.ref().update(activeRoom)

      this.$store.dispatch('setCurrentRoomRef', roomsRef.child(val))
      this.$store.dispatch('setPeopleRef', peopleRef.child(val))
      this.$store.dispatch('setCurrentUserRef', peopleRef.child(val).child(this.user.uid))
    }
  }
}
</script>

<style scoped>
.hero-head {
  /*padding: 0 .5rem;*/
  margin-bottom: 1px;
}
.level {
  min-height: 2.25rem;
}
.level-item .has-text-grey {
  letter-spacing: 0.15rem;
  font-weight: 300;
}
</style>
