<template>
  <div>
    <nav class="level">
      <div class="level-left">
        <h2 class="subtitle is-3 level-item">
          Settings
        </h2>
      </div>
      <div class="level-right">
        <div class="field level-item">
          <b-switch
            size="is-medium"
            v-model="isActive">
            <span v-if="room.data.active">ACTIVE</span>
            <span v-else>INACTIVE</span>
          </b-switch>
        </div>
      </div>
    </nav>
    <div class="box">
      <p class="subtitle has-text-primary is-5">
        Room Settings
      </p>
      <b-field label="Room Name">
        <b-input icon="view_list" v-model="roomName"></b-input>
      </b-field>
      <hr>
      <a class="button is-primary" :class="{'is-loading': saving}">
        Save Room
      </a>
    </div>
    <div class="box">
      <span class="subtitle has-text-primary is-5">Default Session Settings </span>
      <a class="has-text-warning" href="#">
        <b-icon icon="help_outline" size="is-small" />
      </a>
      <br />
      <br />
      <b-field>
        <p class="control">
          <a class="button is-static">
            Starting Layout
          </a>
        </p>
        <b-select
          placeholder="Layout"
          icon="view_compact"
          v-model="layout">
          <option value="1">Video Bar</option>
          <option value="2">Full Screen</option>
          <option value="3">Split Screen</option>
          <option value="3">Lecture</option>
        </b-select>
      </b-field>
      <hr>
      <a class="button is-primary" :class="{'is-loading': saving}">
        Save Default Session
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MainDashboardSettings',
  computed: {
    ...mapState([
      'room'
    ])
  },
  data () {
    return {
      saving: false,
      isActive: false,
      layout: 1,
      roomName: ''
    }
  },
  mounted () {
    this.isActive = this.room.data.active
    this.roomName = this.room.data.name
  },
  methods: {
    updateStatus () {
      // roomsRef.child(key).once('value', function (snapshot) {
      //   const owner = snapshot.val().owner
      //   roomsRef.child(key).remove()
      //   usersRoomsRef.child(owner).child('/').child(key).remove()
      //   roomsUsersRef.child(key).child('/').child(owner).remove()
      //   toast.open('Room deleted')
    }
  }
}
</script>

<style scoped>
a.has-text-warning {
  position: relative;
  bottom: 5px;
  right: 3px;
}
</style>
