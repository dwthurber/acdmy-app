<template>
  <div key="signup" class="box">
    <h2 class="title"><strong>Welcome.</strong></h2>
    <p class="subtitle">Please setup your profile or <router-link class="has-text-primary" :to="{ name: 'Login', params: {} }">login</router-link></small></p></p>
    <b-field>
      <button class="is-primary is-outlined button" @click.prevent="upload()"><b-icon icon="photo" /> &nbsp; Click to Add Profile Picture</button>
      <div v-if="file">
        <span class="file-name">
          {{ file.filename }}
        </span>
      </div>
    </b-field>
    <form>
      <hr />
      <b-field>
        <b-input type="email" icon="email" v-model="email"
          placeholder="jsmith@example.org" @keyup.enter.prevent="signUp">
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
      <!-- <p class="subtitle has-text-primary is-5">Password</p> -->
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
  </div>
</template>

<script>
import Firebase from 'firebase'
import { client } from '@/filestack'
import { db, usersRef } from '@/firebase'
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
      profile: false,
      roomId: '',
      file: null
    }
  },
  methods: {
    upload () {
      let self = this

      client.pick({
        accept: 'image/*',
        maxFiles: 1,
        uploadInBackground: false,
        fromSources: ['local_file_system', 'webcam', 'url', 'imagesearch', 'facebook', 'instagram', 'googledrive', 'dropbox', 'box', 'onedrive'],
        imageDim: [800, 800],
        transformations: {
          crop: {
            force: true,
            aspectRatio: 1 / 1
          },
          rotate: true
        }
      }).then(function (result) {
        console.log(result.filesUploaded)
        // var url = JSON.stringify(result.filesUploaded[0].url)
        self.file = result.filesUploaded[0]
      })
    },
    signUp: function () {
      this.authenticating = true
      let snackbar = this.$snackbar
      let router = this.$router
      let store = this.$store
      let roomKey = this.route.query.room
      // let roomId = this.roomId
      // if (this.route.query.room) {
      //   roomId = this.route.query.room
      // }

      if (this.displayName && this.password && this.email) {
        if (this.password === this.passwordVerification) {
          Firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            user.updateProfile({
              displayName: this.displayName,
              photoURL: this.file.url
            }).then(function () {

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

            // add user to room if defined by url
            if (roomKey) {
              console.log('Add to room ' + roomKey)
              const userDetails = {
                name: this.displayName,
                role: 'Student'
              }

              let updates = {}
              updates['/people/' + roomKey + '/' + user.uid] = userDetails
              if (this.room.students.length) {
                updates['/rooms/' + roomKey + '/students'] = this.room.students.length + 1
              } else {
                updates['/rooms/' + roomKey + '/students'] = 1
              }
              db.ref().update(updates)

              let indexes = {}
              indexes['/users/' + user.uid + '/rooms/' + roomKey] = true
              indexes['/rooms/' + roomKey + '/users/' + user.uid] = true
              db.ref().update(indexes)
            }

            user.sendEmailVerification()
              .then((response) => {
                console.log('Email Sent')
              }).catch((error) => {
                console.error('Email Error', error)
              })
            store.commit('SET_USER', user)
          }).catch((error, authData) => {
            if (error) {
              console.log('Signup Failed!', error)
              if (error.code === 'auth/invalid-email') {
                snackbar.open({
                  duration: 5000,
                  message: 'Email provided is not valid',
                  type: 'is-danger',
                  position: 'is-bottom-left',
                  actionText: 'dismiss'
                })
              } else if (error.code === 'auth/weak-password') {
                snackbar.open({
                  duration: 5000,
                  message: 'Password should be at least 6 characters',
                  type: 'is-danger',
                  position: 'is-bottom-left',
                  actionText: 'dismiss'
                })
              } else if (error.code === 'auth/email-already-in-use') {
                snackbar.open({
                  duration: 5000,
                  message: 'An account with that email already exists',
                  type: 'is-danger',
                  position: 'is-bottom-left',
                  actionText: 'login',
                  onAction: () => {
                    router.replace({ name: 'Login' })
                  }
                })
              }
            } else {
              console.log('Authenticated successfully with payload:', authData)
            }
            this.authenticating = false
          })
        } else {
          this.authenticating = false
          snackbar.open({
            duration: 5000,
            message: 'Passwords do not match',
            type: 'is-danger',
            position: 'is-bottom-left',
            actionText: 'dismiss'
          })
        }
      } else {
        this.authenticating = false
        snackbar.open({
          duration: 5000,
          message: 'Please fill out all fields',
          type: 'is-danger',
          position: 'is-bottom-left',
          actionText: 'dismiss'
        })
      }
    }
  }
}
</script>

<style scoped>
.subtitle.is-5 {
  margin: 20px 0 12px 0;
}
</style>
