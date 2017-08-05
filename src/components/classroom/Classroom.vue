<template>
  <section class="hero is-fullheight">

    <div class="hero-body">
      <!-- <draggable @start="drag=true" @end="drag=false" class="container">
        <avatar v-for="user in users" :left="randomNumber()" :top="randomNumber()" :photoURL="user.photoURL" :displayName="user.displayName" key="user['.key']"/>
      </draggable> -->
    </div>

  </section>
</template>

<script>
import avatar from '@/components/Avatar'
import draggable from 'vuedraggable'
import { db } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'Classroom',
  components: {
    avatar,
    draggable
  },
  computed: {
    ...mapState(['userProfile', 'rooms', 'currentRoom'])
  },
  mounted () {
    const currentRoomRef = db.ref('rooms/' + this.$route.params.roomid)
    this.$store.dispatch('setCurrentRoom', currentRoomRef)
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
.is-fullheight {
  
}
.container {
  position: relative;
}
</style>
