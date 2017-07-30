<template>
  <section class="hero is-fullheight is-primary is-dark">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-4 is-offset-4">
            <h1 class="title">
              Register for an Account
            </h1>
            <div class="box" v-if="!signUpManual">
              <a class="button is-google is-social" @click.self.prevent="googleLogin">Sign up with Google</a>
              <a class="button is-facebook is-social" @click.self.prevent="facebookLogin">Facebook</a>
              <hr>
              <a class="button is-grey is-social" @click.self.prevent="signUpManual = true">Sign up with Email</a>
            </div>
            <div class="box" v-else>
              <b-field label="Name">
                  <b-input icon="person" placeholder="Jane Smith" v-model="displayName"></b-input>
              </b-field>
              <b-field label="Email (username)">
                  <b-input type="email" icon="email" v-model="email"
                      placeholder="jsmith@example.org">
                  </b-input>
              </b-field>
              <b-field label="Password">
                  <b-input type="password" icon="lock" v-model="password"
                      placeholder="Str0ngP@ssword"
                      password-reveal>
                  </b-input>
              </b-field>
              <hr>
              <p class="control">
                <button class="button is-primary" @click.self.prevent="signUp" :class="{'is-loading': authenticating}">Register</button>
                <button class="button is-default" @click.self.prevent="signUpManual = false">Cancel</button>
              </p>
            </div>
            <p class="has-text-centered">
              <a href="#/login">Login</a>
              |
              <a href="#">Need help?</a>
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
  name: 'register',
  data () {
    return {
      displayName: '',
      email: '',
      password: '',
      authenticating: false,
      signUpManual: false
    }
  },
  methods: {
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
    },
    signUp: function () {
      this.authenticating = true
      Firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        user.updateProfile({
          displayName: this.displayName
          // photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then((response) => {
          console.log('added Display Name')
        }).catch((error) => {
          // An error happened.
          console.log('Failed to add Display Name', error)
        })
        user.sendEmailVerification()
          .then((response) => {
            console.log('Email Sent')
            this.emailsent = true
          }).catch((error) => {
            console.error('Email Error', error)
          })
      }).catch((error, authData) => {
        if (error) {
          console.log('Signup Failed!', error)
          this.loginFailed = true
        } else {
          console.log('Authenticated successfully with payload:', authData)
        }
        this.authenticating = false
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
