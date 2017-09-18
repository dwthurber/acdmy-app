<template>
  <div v-if="user !== false" class="is-maxheight">
    <b-loading :active.sync="isLoading"></b-loading>
    <Navbar />
    <div class="main is-maxheight">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from '@/components/Navbar'
import { usersRef } from '@/firebase'

export default {
  name: 'main',
  components: {Navbar},
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
  padding-top: 53px;
}
.container {
  padding: 24px;
}
</style>
