<template>
  <section class="hero is-small">

    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Chat
        </h1>
        <h2 class="subtitle">
          A simple admin template
        </h2>
      </div>
    </div>

  </section>
</template>

<script>
import { roomsRef, peopleRef } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'Chat',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['user', 'route'])
  },
  created () {
    this.setActiveRoom()
  },
  methods: {
    setActiveRoom () {
      // this.$store.dispatch('setCurrentRoom', roomsRef.child(this.route.params.roomid))
      // this.$store.dispatch('setPeople', peopleRef.child(this.route.params.roomid))
      peopleRef.child(this.route.params.roomid).child(this.user.uid).update({
        online: true
      })
    }
  }
}
</script>

<style scoped>

</style>
