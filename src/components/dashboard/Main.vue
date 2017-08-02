<template>
  <section class="hero is-small">

    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Admin Dashboard
        </h1>
        <h2 class="subtitle">
          A simple admin template
        </h2>
      </div>
    </div>
    <p v-for="user in users">{{ user.role }}</p>

    <nav class="level">
      <div class="level-item has-text-centered">
        <p class="heading">Tweets</p>
        <p class="title">3,456</p>
      </div>
      <div class="level-item has-text-centered">
        <p class="heading">Following</p>
        <p class="title">123</p>
      </div>
      <div class="level-item has-text-centered">
        <p class="heading">Followers</p>
        <p class="title">456K</p>
      </div>
      <div class="level-item has-text-centered">
        <p class="heading">Likes</p>
        <p class="title">789</p>
      </div>
    </nav>
  </section>
</template>

<script>
import { db } from '@/firebase'

const usersRef = db.ref('users')

export default {
  name: 'Dashboard-Main',
  firebase: {
    users: usersRef
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>
