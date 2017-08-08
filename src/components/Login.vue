<template>
  <section class="hero is-fullheight is-primary is-dark">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered is-centered">
          <div class="column is-5">
            <img class="brand" src="../assets/acdmy-white.png" />
            <transition name="fade" mode="out-in">
              <div class="box" v-if="!signingUp" key="login">
                <p><strong>Welcome.</strong> Please Login <small class="has-text-primary"> or <a href="#" @click.self.prevent="signingUp = true">Sign Up</a></small></p><br>
                <b-message type="is-danger" v-if="loginFailed">
                    Hmm... Looks like that password was wrong. <a href="#">Reset Password?</a>
                </b-message>
                <b-message type="is-danger" v-if="isInvalid">
                    Please enter a valid email.
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
              <div class="box" v-else key="signup">
                <b-message type="is-danger" v-if="accountExists">
                    An account with that email already exists. <a href="#" @click.self.prevent="signingUp = false">Login</a>
                </b-message>
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
                  <button class="button is-default" @click.self.prevent="signingUp = false">Cancel</button>
                </p>
              </div>
            </transition>
            <div class="box">
              <div class="columns">
                <div class="column">
                  <a class="button is-google is-social" @click.self.prevent="googleLogin">Google</a>
                </div>
                <div class="column">
                  <a class="button is-facebook is-social" @click.self.prevent="facebookLogin">Facebook</a>
                </div>
              </div>
            </div>
            <p class="has-text-centered">
              <a v-if="!signingUp" href="#" @click.self.prevent="signingUp = true">Sign Up</a>
              <a v-else href="#" @click.self.prevent="signingUp = false">Login</a>
              |
              <a v-if="!signingUp" href="#">Forgot Password?</a>
              <a v-else href="#">Need Help?</a>
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
import '@/firebase'
import { mapState } from 'vuex'

const google = new Firebase.auth.GoogleAuthProvider()
const facebook = new Firebase.auth.FacebookAuthProvider()

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
      accountExists: false,
      signingUp: false
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
            this.signingUp = true
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
          this.accountExists = true
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
