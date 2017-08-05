<template>
  <section class="hero is-fullheight">

    <div class="hero-body">
      <div class="add-circle">
        <b-icon icon="add" type="is-primary" size="is-medium"></b-icon>
      </div>
      <draggable @start="drag=true" @end="drag=false" class="container" v-for="user in users" :key="user['.key']">
        <div class="image is-96x96 is-avatar" :style="{top: randomNumber() + '%', left: randomNumber() + '%'}">
          <img class="" :src="user.profile_picture" alt="User Profile Image">
          <span class="tag is-primary">{{user.name}}</span>
        </div>
      </draggable>
    </div>

  </section>
</template>

<script>
import draggable from 'vuedraggable'
import { roomsRef, roomsUsersRef } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'Classroom',
  components: {
    draggable
  },
  computed: {
    ...mapState(['currentRoom', 'users'])
  },
  mounted () {
    this.$store.dispatch('setCurrentRoom', roomsRef.child(this.$route.params.roomid))
    this.$store.dispatch('setUsers', roomsUsersRef.child(this.$route.params.roomid))
  },
  methods: {
    randomNumber: function () {
      return Math.floor(Math.random() * 90)
    },
    checkOffset: function (evt) {
      var offset = this.offset()
      var xPos = offset.left
      var yPos = offset.top
      console.log(xPos, yPos)
    }
  },
  data () {
    return {
      offest: null
    }
  }
}
</script>

<style scoped>
.hero-body {
  position: relative;
}
.is-avatar {
  border-radius: 50%;
  overflow: hidden
}
.image {
  position: absolute;
}
.is-avatar:hover .tag {
  opacity: 0.8;
  transition-duration: 0.2s;
  cursor: move;
}
.tag {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 100%;
  border-radius: 0;
  opacity: 0;
  transition-duration: 0.5s;
  overflow: ellipse;
}
.add-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 200px;
  width: 200px;
  margin-top: -100px;
  margin-left: -100px;
  border: 1px dotted hsl(205, 36%, 43%);
  border-radius: 50%;
}
.add-circle .icon {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -16px;
  margin-left: -16px;
}
</style>
