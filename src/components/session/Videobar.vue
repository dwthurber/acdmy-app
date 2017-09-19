<template>
  <div id="videobar" class="is-maxheight">
    <div class="columns is-mobile videobar is-gapless is-multiline is-marginless">
      <VideoContainer v-for="(user, index) in room.people" :user="user" :key="user['.key']"></VideoContainer>
    </div>
    <div class="block">
      <Block />
    </div>
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
#videobar {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.videobar {
  border-bottom: 1px solid #cfcfcf;
  min-height: 101px;
}
.block {
  flex: 1;
}
</style>
