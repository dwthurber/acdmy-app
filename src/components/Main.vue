<template>
  <div class="main">
    <Navbar v-if="user" />
    <router-view v-if="user"></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import { mapState } from 'vuex'

export default {
  name: 'main',
  components: {Navbar},
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped>
.main {
  flex: 1;
  overflow-y: auto;
}
.container {
  padding: 24px;
}
</style>
