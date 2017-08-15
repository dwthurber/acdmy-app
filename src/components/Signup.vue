<template>
  <div class="hero is-fullheight is-white">
    <div class="hero-body">
      <div class="container">
        <div v-if="!profile" key="signup">
          <img class="brand image is-hidden-tablet" src="../assets/acdmy.png" />
          <h2 class="title"><strong>Welcome.</strong></h2>
          <p class="subtitle">Let's start with an email address.</p>
          <br><br>
          <b-message type="is-danger" v-if="accountExists">
              An account with that email already exists. <a href="#">Login</a>
          </b-message>
          <b-message type="is-danger" v-if="isInvalid">
              Please provide a valid email address
          </b-message>
          <b-field label="Email (username)">
            <b-input type="email" icon="email" v-model="email"
              placeholder="jsmith@example.org">
            </b-input>
          </b-field>
          <p class="control">
            <button class="button is-primary" @click.self.prevent="profile = true">Sign Up</button>
            <router-link :to="{ name: 'Login', params: {} }" class="button is-default">Cancel</router-link>
          </p>
          <hr>
          <button class="button is-google is-social" @click.self.prevent="googleLogin">Or, Signup with Google</button>
        </div>
        <div v-else key="profile">
          <h2 class="title"><strong>Profile Setup.</strong></h2>
          <p class="subtitle">Don't worry, we'll keep it private.</p>
          <label><strong>Profile Picture</strong></label>
          <b-field>
            <b-upload v-model="profile_picture">
              <a class="button is-primary is-outlined">
                <b-icon icon="file_upload"></b-icon>
                <span>Click to upload</span>
              </a>
            </b-upload>
            <div v-if="profile_picture && profile_picture.length">
              <span class="file-name">
                {{ profile_picture[0].name }}
              </span>
            </div>
          </b-field>
          <b-field label="Name">
              <b-input icon="person" placeholder="Jane Smith" v-model="displayName"></b-input>
          </b-field>
          <b-field label="Password">
              <b-input type="password" icon="lock" v-model="password"
                  placeholder="Str0ngP@ssword"
                  password-reveal>
              </b-input>
          </b-field>
          <hr>
          <p class="control">
            <button class="button is-primary" @click.self.prevent="signUp" :class="{'is-loading': authenticating}">Done</button>
            <button class="button is-default" @click.self.prevent="profile = false">Cancel</button>
          </p>
        </div>

      </div>
      <div class="is-bottom">
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
</template>

<script>
import Firebase from 'firebase'
import { storageRef } from '@/firebase'
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
      displayName: '',
      authenticating: false,
      loginFailed: false,
      isInvalid: false,
      accountExists: false,
      profile: false,
      profile_picture: null
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
      let name = this.displayName
      Firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        storageRef.child(this.profile_picture[0].name).put(this.profile_picture[0]).then(function (snapshot) {
          console.log('success' + snapshot.downloadURL)
          user.updateProfile({
            displayName: name,
            photoURL: snapshot.downloadURL
          }).then(function () {
            // Update successful.
          }).catch(function (error) {
            console.log(error)
          })
        })
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
.brand {
  height: 80px;
  margin-bottom: 16px;
}
.is-bottom {
  position: absolute;
  bottom: 8px;
  margin: 0 auto;
}
.upload {
  border-radius: 50%;
}
</style>
