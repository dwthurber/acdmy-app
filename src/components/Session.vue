<template>
  <div>
    <b-loading :active.sync="isLoading" :canCancel="false"></b-loading>
    <Navbar></Navbar>
    <div class="columns videobar is-gapless is-multiline">
      <Video v-for="(user, index) in users" :user="user" :key="user.id"></Video>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Video from './Video'

export default {
  components: { Navbar, Video },
  name: 'session',
  data () {
    return {
      users: [
        { id: 0, name: 'Derek', hand: false },
        { id: 1, name: 'Alyssa', hand: true },
        { id: 2, name: 'Ryan', hand: false },
        { id: 3, name: 'Emily', hand: false }
      ],
      isLoading: true
    }
  },
  mounted () {
    this.isLoading = false
  }
}
</script>

<style scoped>
.videobar {
  border-bottom: 1px solid #cfcfcf;
}

</style>
