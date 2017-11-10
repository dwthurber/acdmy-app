<template>
  <div id="videobar">
    <div class="columns is-mobile videobar is-gapless is-marginless is-multiline is-paddingless box">
      <div class="column is-1-desktop is-2-tablet is-4-mobile" v-for="(user, index) in room.people">
        <AppVideoContainer
          :user="user"
          :key="user['.key']"
           />
      </div>
    </div>
    <section class="content columns is-mobile is-gapless">
      <div class="column">
        <AppBlock />
      </div>
    </section>
  </div>
</template>

<script>
import AppVideoContainer from '@/components/AppVideoContainer'
import AppBlock from '@/components/AppBlock'
import { mapState } from 'vuex'

export default {
  name: 'LayoutVideobar',
  components: {
    AppVideoContainer,
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
  max-height: 120px;
}
.content {
  flex: 1;
}
</style>
