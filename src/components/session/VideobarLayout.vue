<template>
  <div id="videobar" class="is-maxheight">
    <Videobar />
    <section class="content columns is-mobile is-gapless">
      <div class="column">
        <Block />
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
.content {
  flex: 1;
}
</style>
