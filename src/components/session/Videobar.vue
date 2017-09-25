<template>
  <div class="columns is-mobile videobar is-gapless is-multiline is-marginless">
    <VideoContainer v-for="(user, index) in room.people" :user="user" :key="user['.key']" v-if="user.online"></VideoContainer>
  </div>
</template>

<script>
import VideoContainer from '@/components/session/VideoContainer'
import { mapState } from 'vuex'

export default {
  components: { VideoContainer },
  name: 'videobar',
  computed: {
    ...mapState(['room'])
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.videobar {
  border-bottom: 1px solid #cfcfcf;
  min-height: 101px;
}
</style>
