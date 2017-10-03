<template>
  <div id="videobar" class="is-maxheight">
    <Videobar />
    <section class="content columns is-mobile is-gapless">
      <div class="column">
        <Block :full="session.blockOne" />
      </div>
    </section>
  </div>
</template>

<script>
import Videobar from '@/components/session/Videobar'
import Block from '@/components/session/Block'
import { mapState } from 'vuex'

export default {
  components: { Videobar, Block },
  name: 'videobar',
  computed: {
    ...mapState(['user', 'room', 'session'])
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
  height: 15%;
  border-bottom: 1px solid #cfcfcf;
  min-height: 96px;
}
.content {
  flex: 1;
}
</style>
