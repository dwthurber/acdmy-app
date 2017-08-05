<template>
  <div v-if="user !== false">
    <b-loading :active.sync="isLoading" :canCancel="false"></b-loading>
    <div class="main">
      <router-view v-if="$route.params.roomid"></router-view>
      <div class="container" v-else>
        <div class="columns is-tablet is-multiline">
          <div class="column is-3-widescreen is-4-desktop is-6-tablet" v-if="userProfile.role != 'Student'">
            <div class="card is-fullheight is-primary is-outlined" @click="createRoom">
              <div class="card-content has-text-primary">
                <div class="content has-text-centered">
                  <b-icon icon="library_add" size="is-medium"></b-icon>
                  <p class="is-size-5 add-room">Add Room</p>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-3-widescreen is-4-desktop is-6-tablet" v-for="room in rooms" :key="room['.key']">
            <div class="card">
              <router-link :to="{ name: 'Main-Classroom', params: {roomid: room['.key']} }" tag="div" class="card-hover"></router-link>
              <div class="card-text-hover">
                <small class="status is-uppercase has-text-success" v-if="room.active">Active</small>
                <small class="status is-uppercase has-text-warning" v-else>Inactive</small>
                <button class="button is-danger is-outlined remove" @click="deleteRoom(room['.key']); isDeleteRoomActive = true"><b-icon icon="delete_forever" size="is-small"></b-icon></button>
              </div>
              <router-link :to="{ name: 'Main-Classroom', params: {roomid: room['.key']} }" tag="div" class="card-content has-text-centered has-text-white">
                <div class="content">
                  <p class="is-size-5">{{room.name}}</p>
                  <small><b-icon icon="people" size="is-small" class="re-align"></b-icon> 12 students</small> <small><b-icon icon="view_list" size="is-small" class="re-align"></b-icon> 6 sessions</small>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { db, usersRef, roomsRef, usersRoomsRef, roomsUsersRef } from '@/firebase'

export default {
  name: 'main',
  computed: {
    ...mapState(['user', 'userProfile', 'rooms'])
  },
  data () {
    return {
      isLoading: true
    }
  },
  mounted () {
    usersRef.child(this.user.uid).update({
      online: true
    })
    const profile = {
      role: 'Instructor',
      online: true
    }
    usersRef.child(this.user.uid).once('value', function (snapshot) {
      if (snapshot.val() !== null) {
        // console.log('user exists!')
      } else {
        usersRef.child(this.user.uid).set(profile)
      }
    })
    this.$store.dispatch('setUserProfile', usersRef.child(this.user.uid))
    this.$store.dispatch('setRooms', usersRoomsRef.child(this.user.uid))
    this.isLoading = false
  },
  methods: {
    createRoom () {
      this.$dialog.prompt({
        message: `What is the name of your room?`,
        inputMaxlength: 50,
        inputPlaceholder: 'e.g. My Awesome Classroom',
        onConfirm: (value) => {
          const newRoomKey = roomsRef.push().key
          const newRoom = {
            name: value,
            active: true,
            owner: this.user.uid
          }
          const user = {
            name: this.user.displayName,
            profile_picture: this.user.photoURL
          }
          const updates = {}
          updates['/rooms/' + newRoomKey] = newRoom
          updates['/users/' + this.user.uid + '/rooms/' + newRoomKey] = true
          updates['/usersRooms/' + this.user.uid + '/' + newRoomKey] = newRoom
          updates['/roomsUsers/' + newRoomKey + '/' + this.user.uid] = user

          db.ref().update(updates)

          const roomUsers = {}
          roomUsers['/rooms/' + newRoomKey + '/users/' + this.user.uid] = true

          db.ref().update(roomUsers)
          this.$toast.open(value + 'room created!')
        }
      })
    },
    deleteRoom: function (key) {
      this.$dialog.confirm({
        title: 'Deleting Room',
        message: 'Are you sure you want to <strong>delete</strong> this room? This action cannot be undone.',
        confirmText: 'Delete Room',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          roomsRef.child(key).remove()
          usersRef.child(this.user.uid).child('/rooms/').child(key).remove()
          usersRoomsRef.child(this.user.uid).child('/').child(key).remove()
          roomsUsersRef.child(key).child('/').child(this.user.uid).remove()
          this.$toast.open('Room deleted')
        }
      })
    }
  }
}
</script>
<style scoped>
.main {
  padding-top: 57px;
}
.container {
  padding: 24px;
}
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
.is-fullheight {
  height: 100%;
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
