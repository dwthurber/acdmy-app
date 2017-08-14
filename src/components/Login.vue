<template>
  <section class="hero is-fullheight is-primary is-dark">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered is-centered">
          <div class="column is-5">
            <img class="brand" src="../assets/acdmy-white.png" />
            <div class="box" key="login">
              <p><strong>Welcome.</strong> Please Login <small class="has-text-primary"> or <router-link :to="{ name: 'Signup', params: {} }">Sign Up</router-link></small></p><br>
              <b-message type="is-danger" v-if="loginFailed">
                  Hmm... Looks like that password was wrong. <a href="#">Reset Password?</a>
              </b-message>
              <b-message type="is-danger" v-if="isInvalid">
                  Please enter a valid email.
              </b-message>
              <b-message type="is-danger" v-if="noUser">
                  No account with the email. Try again or <router-link :to="{ name: 'Signup', params: {} }">Sign Up</router-link>
              </b-message>
              <form>
                <b-field label="Email (username)">
                    <b-input type="email" icon="email" v-model="email"
                        placeholder="jsmith@example.org" @keyup.enter="login">
                    </b-input>
                </b-field>
                <b-field label="Password">
                    <b-input type="password" icon="lock" @keyup.enter="login"
                        placeholder="Str0ngP@ssword" v-model="password"
                        password-reveal>
                    </b-input>
                </b-field>
                <hr>
                <p class="control">
                  <button class="button is-primary" :class="{'is-loading': authenticating}" @click.self.prevent="login">Login</button>
                </p>
              </form>
            </div>
            <div class="box">
              <div class="columns">
                <div class="column">
                  <a class="button is-google is-social" @click.self.prevent="googleLogin">Login with Google</a>
                </div>
              </div>
            </div>
            <p class="has-text-centered">
              <router-link :to="{ name: 'Signup', params: {} }">Sign Up</router-link>
              |
              <a href="#">Forgot Password?</a>
              |
              <a>Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>

  </section>
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
.is-dark {
  background-color: #F62459;
  background-image: linear-gradient(rgba(70, 116, 149, 0.6),rgba(70, 116, 149, 0.6)),linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url('../assets/bg.jpg');
  background-position: center;
}
.brand {
  height: 60px;
  margin-bottom: 16px;
}
</style>
