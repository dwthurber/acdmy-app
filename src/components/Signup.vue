<template>
  <section class="hero is-fullheight is-primary is-dark">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered is-centered">
          <div class="column is-5">
            <img class="brand" src="../assets/acdmy-white.png" />
            <div class="box" key="signup">
              <b-message type="is-danger" v-if="accountExists">
                  An account with that email already exists. <a href="#">Login</a>
              </b-message>
              <b-message type="is-danger" v-if="isInvalid">
                  Please provide a valid email address
              </b-message>
              <!-- <b-field label="Name">
                  <b-input icon="person" placeholder="Jane Smith" v-model="displayName"></b-input>
              </b-field> -->
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
                <button class="button is-primary" @click.self.prevent="signUp" :class="{'is-loading': authenticating}">Sign Up</button>
                <button class="button is-default" href="/login">Cancel</button>
              </p>
            </div>
            <p class="has-text-centered">
              <router-link :to="{ name: 'Login', params: {} }">Login</router-link>
              |
              <a href="#">Need Help?</a>
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
  name: 'signup',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      email: '',
      password: '',
      authenticating: false,
      loginFailed: false,
      isInvalid: false,
      accountExists: false
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
    signUp: function () {
      this.authenticating = true
      Firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        user.sendEmailVerification()
          .then((response) => {
            console.log('Email Sent')
          }).catch((error) => {
            console.error('Email Error', error)
          })
      }).catch((error, authData) => {
        if (error) {
          console.log('Signup Failed!', error)
          if (error.code === 'auth/invalid-email') {
            this.isInvalid = true
          } else {
            this.accountExists = true
          }
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
  background-image: linear-gradient(rgba(70, 116, 149, 0.6),rgba(70, 116, 149, 0.6)),linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url('../assets/bg.jpg');
  background-position: center;
}
.brand {
  height: 60px;
  margin-bottom: 16px;
}
</style>
