<template>
  <div id="fullscreen" class="box is-paddingless">
    <div class="columns is-multiline is-gapless">
      <div class="column is-6" v-for="(user, index) in room.people">
        <AppVideoContainer
          :user="user"
          :key="user['.key']"
           />
        </div>
    </div>
  </div>
</template>

<script>
import AppVideoContainer from '@/components/AppVideoContainer'
import { mapState } from 'vuex'

export default {
  name: 'LayoutFullscreen',
  components: {
    AppVideoContainer
  },
  computed: {
    ...mapState([
      'user',
      'room'
    ])
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
#fullscreen {
  flex: 1;
  display: flex;
  flex-direction: column;
  /*background-color: #333;*/
}
.columns {
  flex-grow: 1;
}
</style>
