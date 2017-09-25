<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <img class="brand" src="../assets/acdmy.png" />
            <!-- <p class="subtitle">Classroom of the Future</p> -->
            <router-view></router-view>
            <p class="has-text-centered has-text-grey">
              <router-link v-if="$route.path == '/signup'" :to="{ name: 'Login', params: {} }">Login</router-link>
              <router-link v-else :to="{ name: 'Signup', params: {} }">Sign Up</router-link>
              |
              <a v-if="$route.path == '/signup'" href="#">Need Help?</a>
              <a v-else @click="resetPassword()">Forgot Password</a>
              |
              <a>Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="column is-8-widescreen is-7-desktop is-half-tablet is-hidden-mobile">
      <section class="hero is-fullheight is-background is-dark">
        <div class="hero-body">
          <div class="container">

          </div>
        </div>

      </section>
    </div> -->
  </div>
</template>

<script>
import Firebase from 'firebase'
import { mapState } from 'vuex'

export default {
  name: 'login',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
    }
  },
  methods: {
    resetPassword: function () {
      let toast = this.$toast
      this.$dialog.prompt({
        message: `What's your email address?`,
        inputPlaceholder: 'e.g. jsmith@example.org',
        onConfirm: (value) => {
          Firebase.auth().sendPasswordResetEmail(value).then(function () {
            toast.open('Email sent')
          }).catch(function (error) {
            if (error.code === 'auth/user-not-found') {
              toast.open({
                message: 'No user with that email exists',
                type: 'is-danger'
              })
            } else if (error.code === 'auth/invalid-email') {
              toast.open({
                message: 'Email address bad. Please try again',
                type: 'is-warning'
              })
            } else {
              toast.open({
                message: 'An error occured. Please try again',
                type: 'is-danger'
              })
            }
            console.log(error)
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.is-background {
  background-color: #F62459;
  background-image: linear-gradient(rgba(162, 191, 213, 0.7),rgba(244, 249, 252, 0.8)),linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url('../assets/bg.jpg');
  background-position: center;
}
.brand {
  height: 60px;
  margin-bottom: 16px;
}
.hero {
  overflow-y: auto;
}
.container {
  margin-top: -18px;
}
</style>
