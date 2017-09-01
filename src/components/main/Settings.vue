<template>
  <div>
    <nav class="level">
      <div class="level-left">
        <h2 class="subtitle is-3 level-item">
          Room Settings
        </h2>
      </div>
      <div class="level-right">
        <div class="field level-item">
          <b-switch size="is-medium" v-model="isActive">
            <span v-if="currentRoom.active">ACTIVE</span>
            <span v-else>INACTIVE</span>
          </b-switch>
        </div>
      </div>
    </nav>
    <div class="box">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Dashboard-Settings',
  computed: {
    ...mapState(['currentRoom'])
  },
  data () {
    return {
      isActive: false
    }
  },
  mounted () {
    this.isActive = this.currentRoom.active
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

</style>
