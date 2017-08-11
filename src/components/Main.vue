<template>
  <div v-if="user !== false">
    <b-loading :active.sync="isLoading" :canCancel="false"></b-loading>
    <Navbar v-if="user" />
    <div class="main">
      <router-view v-if="$route.params.roomid"></router-view>
      <div class="container" v-else>
        <div class="columns is-tablet is-multiline">
          <div class="column is-3-fullhd is-4-desktop is-6-tablet">
            <div class="card is-fullheight is-primary is-outlined" @click="createRoom">
              <div class="card-content has-text-primary">
                <div class="content has-text-centered">
                  <b-icon icon="group_add" size="is-medium"></b-icon>
                  <p class="is-size-5 add-room">New Room</p>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-3-fullhd is-4-desktop is-6-tablet" v-for="room in rooms" :key="room['.key']">
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
import Navbar from '@/components/Navbar'
import { db, usersRef, roomsRef, membersRef } from '@/firebase'

export default {
  name: 'main',
  components: {Navbar},
  computed: {
    ...mapState(['user', 'userProfile', 'rooms'])
  },
  data () {
    return {
      isLoading: true
    }
  },
  mounted () {
    let uid = this.user.uid
    const profile = {
      isAdmin: false,
      email: this.user.email
    }
    usersRef.child(this.user.uid).once('value', function (snapshot) {
      if (snapshot.val() !== null) {
        // const admin = snapshot.val().isAdmin
      } else {
        usersRef.child(uid).set(profile)
      }
    })
    // let rooms = this.rooms
    // const userRoomsRef = usersRef.child(uid).child('rooms')
    // userRoomsRef.on('child_added', function (snap) {
    //   roomsRef.child(snap.key).once('value', function (snapshot) {
    //     let data = {
    //       key: snapshot.key,
    //       val: snapshot.val()
    //     }
    //     rooms.push(data)
    //   })
    // })
    // userRoomsRef.on('child_removed', function (snap) {
    //   roomsRef.child(snap.key).once('value', function (snapshot) {
    //     let data = {
    //       key: snapshot.key,
    //       val: snapshot.val()
    //     }
    //     rooms.push(data)
    //   })
    // })
    this.$store.dispatch('setRooms', roomsRef.child(uid))
    this.isLoading = false
  },
  methods: {
    createRoom () {
      const toast = this.$toast
      this.$dialog.prompt({
        message: `What is the name of your room?`,
        inputMaxlength: 50,
        inputPlaceholder: 'e.g. My Awesome Classroom',
        onConfirm: (value) => {
          const newRoomKey = roomsRef.push().key
          const newRoom = {
            name: value,
            active: true
          }
          // const newUserRoom = {
          //   name: value
          // }
          const user = {
            name: this.user.displayName,
            profile_picture: this.user.photoURL,
            role: 'Instructor'
          }
          const updates = {}
          updates['/rooms/' + this.user.uid + '/' + newRoomKey] = newRoom
          // updates['/usersRooms/' + this.user.uid + '/' + newRoomKey] = true
          updates['/members/' + this.user.uid + '/' + newRoomKey] = user
          db.ref().update(updates)

          // const indexes = {}
          // indexes['/users/' + this.user.uid + '/rooms/' + newRoomKey] = true
          // indexes['/rooms/' + newRoomKey + '/users/' + this.user.uid] = true
          // db.ref().update(indexes)

          toast.open(value + 'room created!')
        }
      })
    },
    deleteRoom: function (key) {
      const toast = this.$toast
      this.$dialog.confirm({
        title: 'Deleting Room',
        message: 'Are you sure you want to <strong>delete</strong> this room? This action cannot be undone.',
        confirmText: 'Delete Room',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          roomsRef.child(key).once('value', function (snapshot) {
            const owner = snapshot.val().owner
            roomsRef.child(key).remove()
            usersRef.child(owner).child('/rooms/').child(key).remove()
            membersRef.child(key).child('/').child(owner).remove()
            toast.open('Room deleted')
          })
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
