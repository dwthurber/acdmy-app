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
              <a v-else href="#">Forgot Password</a>
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

const google = new Firebase.auth.GoogleAuthProvider()

export default {
  name: 'login',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      email: '',
      password: '',
      displayName: '',
      authenticating: false,
      loginFailed: false,
      isInvalid: false,
      noUser: false,
      accountExists: false
    }
  },
  methods: {
    login: function () {
      this.authenticating = true
      this.isInvalid = false
      this.accountExists = false
      Firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .catch((error, authData) => {
        if (error) {
          console.log('Login Failed!', error)
          if (error.code === 'auth/user-not-found') {
            this.noUser = true
          } else if (error.code === 'auth/invalid-email') {
            this.isInvalid = true
          } else {
            this.loginFailed = true
          }
        } else {
          console.log('Authenticated successfully with payload:', authData)
        }
        this.authenticating = false
      })
    },
    googleLogin: function () {
      Firebase.auth().signInWithPopup(google)
      .then((result) => {
        console.log('Authenticated successfully with payload:', result)
      }).catch((error) => {
        console.log('Login Failed!', error)
      })
    }
  }
}
</script>

<style scoped>
.is-social {
  width: 100%;
  margin: 4px 0;
}
.is-background {
  background-color: #F62459;
  background-image: linear-gradient(rgba(70, 116, 149, 0.6),rgba(70, 116, 149, 0.6)),linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url('../assets/bg.jpg');
  background-position: center;
}
.brand {
  height: 60px;
  margin-bottom: 16px;
}
.is-vcentered {
  align-items: center;
  justify-content: center;
}
</style>
