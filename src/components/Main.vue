<template>
  <div class="main">
    <b-loading :active.sync="isLoading"></b-loading>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { usersRef } from '@/firebase'

export default {
  name: 'main',
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.isLoading = true
    this.setUserProfile()
  },
  mounted () {
    this.isLoading = false
  },
  data () {
    return {
      isLoading: true
    }
  },
  methods: {
    setUserProfile () {
      const uid = this.user.uid
      // define default profile setup used to create first time user
      const profile = {
        isAdmin: false,
        email: this.user.email
      }
      usersRef.child(uid).once('value', function (snapshot) {
        if (!snapshot.val()) {
          usersRef.child(uid).set(profile)
        }
      })
    }
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
