<template>
  <div class="image" :class="size">
    <img class="is-circle-image" :src="photoURL" :alt="displayName">
  </div>
</template>

<script>
export default {
  name: 'AppUserAvatar',
  props: [
    photoURL: String,
    displayName: String,
    size: String,
  ],
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
