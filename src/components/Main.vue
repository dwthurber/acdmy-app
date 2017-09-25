<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'main',
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
