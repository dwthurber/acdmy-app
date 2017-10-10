<template>
  <div class="columns is-mobile videobar is-gapless is-marginless is-multiline is-paddingless box">
    <AppVideoContainer
      v-for="(user, index) in room.people"
      :user="user"
      :key="user['.key']"
      v-if="user.online" />
  </div>
</template>

<script>
import AppVideoContainer from '@/components/AppVideoContainer'
import { mapState } from 'vuex'

export default {
  name: 'AppVideobar',
  components: { AppVideoContainer },
  computed: {
    ...mapState([
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
.videobar {
  border-bottom: 1px solid #cfcfcf;
}
</style>
