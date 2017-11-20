<template>
  <ul>
    <li v-if="user.profile_picture" :style="{'top':topOffset, 'left':leftOffset}">
      <img  class="is-circle-image image is-64x64" :src="user.profile_picture" alt="Profile Image">
    </li>
    <li v-else>
      <img class="is-circle-image image is-64x64" src="../assets/user-placeholder.png" alt="Profile Image">
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppFreeformAvatar',
  props: {
    user: Object
  },
  data () {
    return {
      user: null,
      topOffset: null,
      leftOffset: null
    }
  },
  mounted () {
    this.topOffset = this.getRandom(0, 80) + '%'
    this.leftOffset = this.getRandom(0, 50) + '%'
  },
  methods: {
    getRandom (min, max) {
      return Math.random() * (max - min) + min
    }
  }
}
</script>

<style scoped>
ul {
  position: relative; 
  width: 100%;
  height: 100%;
}
li {
  position: absolute;
  top: 50%;
  left: 50%;
}
.column {
  margin: .25rem!important;
}
</style>
