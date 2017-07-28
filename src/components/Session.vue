<template>
  <div>
    <Navbar></Navbar>
    <div class="columns videobar is-gapless is-multiline">
      <Video></Video>
      <Video></Video>
      <Video></Video>
      <Video></Video>
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
      msg: ''
    }
  }
}
</script>

<style scoped>
.videobar {
  border-bottom: 1px solid #cfcfcf;
}

</style>
