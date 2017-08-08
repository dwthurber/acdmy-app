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
import { roomsRef, roomsUsersRef } from '@/firebase'

export default {
  name: 'Chat',
  data () {
    return {
    }
  },
  mounted () {
    this.$store.dispatch('setCurrentRoom', roomsRef.child(this.$route.params.roomid))
    this.$store.dispatch('setUsers', roomsUsersRef.child(this.$route.params.roomid))
  }
}
</script>

<style scoped>

</style>
