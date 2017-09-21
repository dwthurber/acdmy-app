<template>
  <div key="signup" class="box">
    <h2 class="title"><strong>Welcome.</strong></h2>
    <p class="subtitle">Please setup your profile or <router-link class="has-text-primary" :to="{ name: 'Login', params: {} }">login</router-link></small></p></p>
    <b-message type="is-danger" v-if="accountExists">
        An account with that email already exists. <a href="#">Login</a>
    </b-message>
    <b-message type="is-danger" v-if="isInvalid">
        Please fill out all fields
    </b-message>
    <form>
      <p class="subtitle has-text-primary is-5">Profile Picture</p>
      <b-field v-if="!profile_picture">
        <b-upload v-model="profile_picture" drag-drop>
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon
                  icon="file_upload"
                  size="is-large">
                </b-icon>
              </p>
              <p>Drop your file here or click to upload</p>
            </div>
          </section>
        </b-upload>
      </b-field>
      <div v-else>
        <span class="tag is-primary">
          {{ profile_picture[0].name }}
          <button class="delete is-small"
            type="button"
            @click="deleteDropFile(index)">
          </button>
        </span>
      </div>
      <p class="subtitle has-text-primary is-5">Account</p>
      <b-field>
        <b-input type="email" icon="email" v-model="email"
          placeholder="jsmith@example.org" @keyup.enter="signUp">
        </b-input>
      </b-field>
      <b-field type="is-success" v-if="route.query.room">
          <b-input icon="widgets" :placeholder="route.query.room" v-model="roomId" disabled></b-input>
      </b-field>
      <!-- <b-field label="Room ID" v-else>
          <b-input icon="widgets" placeholder="Room ID" v-model="roomId"></b-input>
      </b-field> -->
      <b-field>
          <b-input icon="person" placeholder="Full Name" v-model="displayName" @keyup.enter="signUp"></b-input>
      </b-field>
      <p class="subtitle has-text-primary is-5">Password</p>
      <b-message type="is-danger" v-if="passwordMismatch">
          Passwords do not match
      </b-message>
      <b-message type="is-danger" v-if="weakPassword">
          Password should be at least 6 characters
      </b-message>
      <b-field>
          <b-input type="password" icon="lock" v-model="password"
              placeholder="Password"
              password-reveal @keyup.enter="signUp">
          </b-input>
      </b-field>
      <b-field>
          <b-input type="password" icon="lock" v-model="passwordVerification"
              placeholder="Confirm Password"
              password-reveal @keyup.enter="signUp">
          </b-input>
      </b-field>
      <hr>
      <p class="control">
        <button class="button is-primary" @click.self.prevent="signUp" :class="{'is-loading': authenticating}">Sign Up</button>
        <router-link :to="{ name: 'Login', params: {} }" class="button is-default">Cancel</router-link>
      </p>
    </form>
    <!-- <hr> -->
    <!-- <button class="button is-google is-social" @click.self.prevent="googleLogin">Or, Signup with Google</button> -->
  </div>
</template>

<script>
import Firebase from 'firebase'
import { storageRef, usersRef } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'signup',
  computed: {
    ...mapState(['user', 'route'])
  },
  data () {
    return {
      email: '',
      password: '',
      passwordVerification: '',
      displayName: '',
      authenticating: false,
      loginFailed: false,
      isInvalid: false,
      accountExists: false,
      profile: false,
      profile_picture: null,
      roomId: '',
      passwordMismatch: false,
      weakPassword: false
    }
  },
  methods: {
    deleteDropFile: function () {
      this.profile_picture = null
    },
    signUp: function () {
      this.authenticating = true
      this.isInvalid = false
      this.passwordMismatch = false
      this.weakPassword = false
      let profilePicture = this.profile_picture[0]
      // let roomId = this.roomId
      // if (this.route.query.room) {
      //   roomId = this.route.query.room
      // }

      if (this.displayName && this.password && this.email) {
        if (this.password === this.passwordVerification) {
          Firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            user.updateProfile({
              displayName: this.displayName
            }).then(function () {
              console.log(profilePicture)
              storageRef.child(profilePicture.name).put(profilePicture).then(function (snapshot) {
                console.log('success' + snapshot.downloadURL)
                user.updateProfile({
                  photoURL: snapshot.downloadURL
                }).then(function () {
                  // Update successful.
                }).catch(function (error) {
                  console.log(error)
                })
              })
            }).catch(function (error) {
              console.log(error)
            })

            // define default profile setup used to create first time user
            const profile = {
              isAdmin: false,
              email: this.email,
              displayName: this.displayName
            }
            usersRef.child(user.uid).set(profile)

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
              } else if (error.code === 'auth/weak-password') {
                this.weakPassword = true
              } else {
                this.accountExists = true
              }
            } else {
              console.log('Authenticated successfully with payload:', authData)
            }
            this.authenticating = false
          })
        } else {
          this.passwordMismatch = true
          this.authenticating = false
        }
      } else {
        this.isInvalid = true
        this.authenticating = false
      }
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
  height: 60px;
  margin: -32px auto 24px auto;
}
.is-bottom {
  position: absolute;
  bottom: 8px;
  margin: 0 auto;
}
.upload {
  border-radius: 50%;
}
.subtitle.is-5 {
  margin: 20px 0 12px 0;
}
</style>
