<template>
  <div class="container">
    <b-loading :active.sync="isLoading"></b-loading>
    <div class="columns is-tablet is-multiline">
      <div class="column is-3-fullhd is-4-desktop is-6-tablet">
        <div class="card is-maxheight is-primary is-outlined" @click="createRoom">
          <div class="card-content has-text-primary">
            <div class="content has-text-centered">
              <b-icon icon="group_add" size="is-medium"></b-icon>
              <p class="is-size-5 add-room">New Room</p>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-3-fullhd is-4-desktop is-6-tablet" v-for="roomid in userRooms" :key="roomid['.key']">
        <div class="card" v-for="(room, index) in allRooms" v-if="room['.key'] == roomid['.key']">
          <router-link :to="{ name: 'Dashboard-Sessions', params: {roomid: room['.key']} }" tag="div" class="card-hover"></router-link>
          <div class="card-text-hover">
            <!-- <small class="status is-uppercase has-text-success" v-if="room.active">Active</small>
            <small class="status is-uppercase has-text-warning" v-else>Inactive</small> -->
            <button v-if="room.owner == user.uid" class="button is-danger is-outlined remove is-small" @click="deleteRoom(room['.key'])"><b-icon icon="delete_forever" size="is-small"></b-icon></button>
          </div>
          <router-link :to="{ name: 'Dashboard-Sessions', params: {roomid: room['.key']} }" tag="div" class="card-content has-text-centered has-text-white">
            <div class="content">
              <p class="is-size-5">{{room.name}}</p>
              <b-icon v-if="!room.students && !room.sessions" icon="widgets"></b-icon>
              <small v-if="room.students"><b-icon icon="people" size="is-small" class="re-align"></b-icon> {{room.students}} people</small>
              <small v-if="room.sessions"><b-icon icon="view_list" size="is-small" class="re-align"></b-icon> {{room.sessions}} session<span v-if="room.sessions > 1">s</span></small>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { db, usersRef, roomsRef, peopleRef, sessionsRef } from '@/firebase'

export default {
  name: 'rooms',
  computed: {
    ...mapState([
      'user',
      'userRooms',
      'route',
      'room',
      'allRooms'
    ])
  },
  filters: {
    limit: function (arr, limit) {
      return arr.slice(0, limit)
    },
    user: function (obj) {
      return !obj.users
    }
  },
  created () {
    this.setUserRooms()
    this.isLoading = false
  },
  updated () {
    this.unbindRefs()
  },
  data () {
    return {
      isLoading: true
    }
  },
  methods: {
    unbindRefs () {
      if (this.room.data) {
        peopleRef.child(this.room.data['.key']).child(this.user.uid).update({
          online: false
        })
        this.$store.commit('SET_CURRENT_ROOM', null)
        this.$store.commit('SET_PEOPLE', [])
        this.$store.commit('SET_CURRENT_USER', null)
        this.$store.commit('SET_SESSIONS', [])
      }
    },
    setUserRooms () {
      this.$store.dispatch('setAllRoomsRef', roomsRef)
      this.$store.dispatch('setUserRoomsRef', usersRef.child(this.user.uid).child('rooms'))
      // const uid = this.user.uid
      // let store = this.$store
      // usersRef.child(uid).child('rooms').on('child_added', function (user) {
      //   roomsRef.once('value', function (classroom) {
      //     store.commit('SET_USER_ROOMS', classroom.val())
      //   })
      // })
      // usersRef.child(uid).child('rooms').on('child_removed', function (user) {
      //   roomsRef.once('value', function (classroom) {
      //     store.commit('SET_USER_ROOMS', classroom.val())
      //   })
      // })
    },
    createRoom () {
      let toast = this.$toast
      this.$dialog.prompt({
        message: `What is the name of your room?`,
        inputMaxlength: 50,
        inputPlaceholder: 'e.g. My Awesome Classroom',
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

          toast.open(value + ' created!')
        }
      })
    },
    deleteRoom: function (key) {
      const toast = this.$toast
      // const uid = this.user.uid
      this.$dialog.confirm({
        title: 'Deleting Room',
        message: 'Are you sure you want to <strong>delete</strong> this room and all associated data (e.g. sessions)? <strong>This action cannot be undone.</strong>',
        confirmText: 'Delete Room',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          // first remove user index
          const roomsUsersRef = roomsRef.child(key).child('users').child('/')
          roomsUsersRef.once('value', function (snap) {
            snap.forEach(function (childSnapshot) {
              const userKey = childSnapshot.key
              let updates = {}
              updates['/users/' + userKey + '/rooms/' + key] = null
              db.ref().update(updates)
            })
            // then remove room and associated nodes
            roomsRef.child(key).remove()
            peopleRef.child(key).remove()
            sessionsRef.child(key).remove()
            toast.open('Room deleted')
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.card {
  position: relative;
  background-color: hsl(205, 36%, 43%);
  min-height: 200px;
  transition-duration: 0.3s;
}
.is-outlined {
  background-color: #fff;
  border: 1px solid hsl(205, 36%, 43%);
  color: hsl(205, 36%, 43%);
}
.content small {
  margin: 0 4px;
}
.card-content {
  height: 130px;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: -65px;
}
.card-hover {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #333;
  opacity: 0;
  transition-duration: 0.3s;
}
.card-text-hover {
  opacity: 0;
}
.card:hover {
  cursor: pointer;
  box-shadow: 1px 1px 5px 1px #999;
}
.card p {
  transition-duration: 0.3s;
}
.card:hover p {
  transform: translateY(5px);
  transition-duration: 0.3s;
}
.card:hover .card-hover {
  opacity: 0.4;
}
.card:hover .card-text-hover {
  opacity: 1;
}
.status {
  position: absolute;
  top: 4px;
  right: 8px;
}
.add-room {
  margin-top: 8px;
}
.is-uppercase {
  text-transform: uppercase;
}
.remove {
  position: absolute;
  top: 8px;
  left: 8px;
}
</style>
