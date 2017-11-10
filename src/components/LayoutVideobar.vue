<template>
  <div id="videobar">
    <AppVideobar />
    <section class="content columns is-mobile is-gapless">
      <div class="column">
        <AppBlock />
      </div>
    </section>
  </div>
</template>

<script>
import AppVideobar from '@/components/AppVideobar'
import AppBlock from '@/components/AppBlock'
import { mapState } from 'vuex'

export default {
  name: 'LayoutVideobar',
  components: {
    AppVideobar,
    AppBlock
  },
  computed: {
    ...mapState([
      'user',
      'room',
      'session'
    ])
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
  height: 16%;
  border-bottom: 1px solid #cfcfcf;
  min-height: 88px;
}
.content {
  flex: 1;
}
</style>
