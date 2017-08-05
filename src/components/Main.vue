<template>
  <div v-if="user !== false">
    <b-loading :active.sync="isLoading" :canCancel="false"></b-loading>
    <router-view v-if="$route.params.roomid"></router-view>
    <div class="container" v-else>
      <div class="columns is-tablet is-multiline">
        <div class="column is-4-desktop is-6-tablet" v-if="userProfile.role != 'Student'">
          <div class="card is-fullheight is-primary is-outlined" @click="isAddRoomActive = true">
            <div class="card-content">
              <div class="content has-text-centered">
                <b-icon icon="library_add" size="is-medium"></b-icon>
                <p class="is-size-5 add-room">Add Room</p>
              </div>
            </div>
          </div>
        </div>
        <b-modal :active.sync="isAddRoomActive" :width="640">
            <div class="box">
              <h4 class="title is-4">Create a Room</h4>
              <b-message type="is-danger" v-if="isInvalid">
                  Please enter a room name
              </b-message>
              <form>
                <b-field label="Room Name">
                    <b-input type="text" v-model="name" maxlength="30"
                        placeholder="My Awesome Classroom" @keyup.enter="createRoom" >
                    </b-input>
                </b-field>
                <hr>
                <p class="control">
                  <button class="button is-primary" :class="{'is-loading': saving}" @click.self.prevent="createRoom">Create</button>
                </p>
              </form>
            </div>
        </b-modal>
        <div class="column is-4-desktop is-6-tablet" v-for="room in rooms" :key="room['.key']">
          <router-link :to="{ name: 'Main-Classroom', params: {roomid: room['.key']} }" tag="div" class="card is-fullheight">
            <div class="card-hover">
              <small class="status is-uppercase">Active</small>
              <button class="button is-danger is-outlined remove"><b-icon icon="delete_forever" size="is-small"></b-icon></button>
            </div>
            <div class="card-content has-text-centered">
              <div class="content">
                <p class="is-size-5">{{room.name}}</p>
                <small><b-icon icon="people" size="is-small" class="re-align"></b-icon> 12 students</small> <small><b-icon icon="view_list" size="is-small" class="re-align"></b-icon> 6 sessions</small>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { db } from '@/firebase'

export default {
  name: 'main',
  computed: {
    ...mapState(['user', 'userProfile', 'rooms'])
  },
  data () {
    return {
      isLoading: true,
      isAddRoomActive: false,
      name: null,
      isInvalid: false,
      saving: false
    }
  },
  mounted () {
    const usersRef = db.ref('users')
    const userProfileRef = db.ref('users/' + this.user.uid)
    userProfileRef.update({
      online: true
    })
    const profile = {
      name: this.user.displayName,
      email: this.user.email,
      profile_picture: this.user.photoURL,
      role: null,
      online: true
    }
    usersRef.child(this.user.uid).once('value', function (snapshot) {
      if (snapshot.val() !== null) {
        // console.log('user exists!')
      } else {
        userProfileRef.set(profile)
      }
    })

    const roomsRef = db.ref('rooms')
    this.$store.dispatch('setUserProfile', userProfileRef)
    this.$store.dispatch('setRooms', roomsRef)
    this.isLoading = false
  },
  methods: {
    createRoom: function () {
      this.saving = true
      const roomsRef = db.ref('rooms')
      if (this.name == null || '') {
        this.isInvalid = true
      } else {
        const newRoomKey = roomsRef.push().key
        const newRoom = {
          name: this.name,
          active: true,
          owner: this.user.uid
        }
        const updates = {}
        updates['/rooms/' + newRoomKey] = newRoom
        updates['/users/' + this.user.uid + '/rooms/' + newRoomKey] = true

        db.ref().update(updates)
      }
      this.name = null
      this.saving = false
      this.isAddRoomActive = false
    },
    deleteRoom: function (key) {
      // const updates = {}
      // updates['/rooms/' + key] = null
      // updates['/users/' + this.user.uid + '/rooms/' + key] = null
      //
      // db.ref().update(updates)
    }
  }
}
</script>
<style scoped>
.container {
  padding: 24px;
}
.card {
  position: relative;
  background-color: hsl(205, 36%, 43%);
  color: #fff;
  min-height: 300px;
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
.is-fullheight {
  height: 100%;
}
.status {
  position: absolute;
  top: 4px;
  right: 8px;
  color: #fff;
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
