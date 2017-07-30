<template>
  <section class="hero is-fullheight is-primary is-dark">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-4 is-offset-4">
            <h1 class="title">
              Acdmy.io
            </h1>
            <div class="box">
              <div class="columns">
                <div class="column">
                  <a class="button is-google is-social" @click.self.prevent="googleLogin">Google</a>
                </div>
                <div class="column">
                  <a class="button is-facebook is-social" @click.self.prevent="facebookLogin">Facebook</a>
                </div>
              </div>
              <b-message type="is-danger" v-if="loginFailed">
                  Uh oh. That didn't work. <a href="#">Reset Password?</a>
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
            <p class="has-text-centered">
              <a href="#/register">Sign Up</a>
              |
              <a href="#">Forgot password?</a>
            </p>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import Firebase from 'firebase'
import '../firebase'

const google = new Firebase.auth.GoogleAuthProvider()
const facebook = new Firebase.auth.FacebookAuthProvider()

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      authenticating: false,
      loginFailed: false
    }
  },
  methods: {
    login: function () {
      this.authenticating = true
      Firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .catch((error, authData) => {
        if (error) {
          console.log('Login Failed!', error)
          this.loginFailed = true
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
    },
    facebookLogin: function () {
      Firebase.auth().signInWithPopup(facebook)
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
  background-image: linear-gradient(rgba(70, 116, 149, 0.6),rgba(70, 160, 119, 0.6)),linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url('../assets/bg.jpg');
  background-position: center;
}
</style>
