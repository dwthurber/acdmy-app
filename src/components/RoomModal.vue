<template>
  <b-modal v-else-if="!userDetails.activeRoom" :active="true" :width="960" :canCancel="false">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child notification is-primary">
          <h2 class="title">Welcome!</h2>
          <h3 class="subtitle">Create or join an existing room</h3>
        </div>
      </div>
      <div class="tile is-6 is-vertical is-parent">
        <div class="tile is-child box">
          <p class="subtitle has-text-primary is-5">
            Create a new room
          </p>
          <form @submit="createRoom()">
            <b-field>
              <b-input placeholder="Room Name" v-model="name" />
            </b-field>
            <p class="control">
              <button class="button is-primary">Create Room</button>
            </p>
          </form>
        </div>
        <div class="tile is-child box">
          <p class="subtitle has-text-primary is-5">
            Or, join existing room
            <a class="has-text-warning" href="#">
              <b-icon icon="help_outline" size="is-small" />
            </a>
          </p>
          <form @submit="joinRoom()">
            <b-field>
              <b-input placeholder="Room ID" v-model="roomId" />
            </b-field>
            <p class="control">
              <button class="button is-primary is-outlined">Join Room</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex'
import { db, peopleRef, roomsRef } from '@/firebase'

export default {
  name: 'RoomModal',
  computed: {
    ...mapState([
      'user',
      'userDetails',
      'room'
    ])
  },
  data () {
    return {
      name: '',
      roomId: ''
    }
  },
  methods: {
    createRoom () {
      let newRoomKey = roomsRef.push().key
      const user = {
        name: this.user.displayName,
        profile_picture: this.user.photoURL,
        role: 'Instructor'
      }
      const newRoom = {
        name: this.name,
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
      activeRoom['/status/' + this.user.uid + '/activeRoom'] = newRoomKey
      db.ref().update(activeRoom)

      this.$store.dispatch('setCurrentRoomRef', roomsRef.child(newRoomKey))
      this.$store.dispatch('setPeopleRef', peopleRef.child(newRoomKey))
      this.$store.dispatch('setCurrentUserRef', peopleRef.child(newRoomKey).child(this.user.uid))

      this.$toast.open(this.name + ' created!')
    },
    joinRoom () {
      let newRoomKey = this.roomId
      const user = {
        name: this.user.displayName,
        profile_picture: this.user.photoURL,
        role: 'Student'
      }

      let updates = {}
      updates['/people/' + newRoomKey + '/' + this.user.uid] = user
      db.ref().update(updates)

      let indexes = {}
      indexes['/users/' + this.user.uid + '/rooms/' + newRoomKey] = true
      indexes['/rooms/' + newRoomKey + '/users/' + this.user.uid] = true
      db.ref().update(indexes)

      let activeRoom = {}
      activeRoom['/status/' + this.user.uid + '/activeRoom'] = newRoomKey
      db.ref().update(activeRoom)

      this.$store.dispatch('setCurrentRoomRef', roomsRef.child(newRoomKey))
      this.$store.dispatch('setPeopleRef', peopleRef.child(newRoomKey))
      this.$store.dispatch('setCurrentUserRef', peopleRef.child(newRoomKey).child(this.user.uid))

      this.$toast.open('Joined room!')
    }
  }
}
</script>

<style scoped>
.tile.is-ancestor {
  margin: .1rem;
}
a.has-text-warning {
  position: relative;
  bottom: 5px;
  right: 3px;
}
</style>
