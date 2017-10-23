<template>
  <div class="image" :class="size">
    <img v-if="photoURL" class="is-circle-image" :src="photoURL" :alt="displayName">
    <img v-else class="is-circle-image image is-32x32" src="../assets/user-placeholder.png" alt="Profile Image">
  </div>
</template>

<script>
export default {
  name: 'AppUserAvatar',
  props: {
    photoURL: String,
    displayName: String,
    size: String
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
