<template>
  <div id="videobar" class="is-maxheight">
    <div class="columns is-mobile videobar is-gapless is-multiline is-marginless">
      <VideoContainer v-for="(user, index) in room.people" :user="user" :key="user['.key']"></VideoContainer>
    </div>
    <Block />
  </div>
</template>

<script>
import VideoContainer from '@/components/session/Video'
import Block from '@/components/session/Block'
import { mapState } from 'vuex'

export default {
  components: { VideoContainer, Block },
  name: 'videobar',
  computed: {
    ...mapState(['user', 'room'])
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
}
#session {
  /*overflow: hidden;*/
}
</style>
