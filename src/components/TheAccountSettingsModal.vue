<template>
  <div class="modal-card" @click.stop>
    <section class="modal-card-body">
      <div class="content has-text-centered">
        <a @click="upload()">
          <figure class="image is-128x128">
            <div class="hover">
              <b-icon icon="file_upload" size="is-medium" class="is-light" />
            </div>
            <img v-if="photoUrl" class="is-circle-image" :src="photoUrl" :alt="user.displayName">
            <img v-else c src="../assets/user-placeholder.png" alt="User Profile Image">
          </figure>
        </a>
      </div>

      <p class="subtitle has-text-primary is-5">
        Display Name
      </p>
      <b-field>
        <b-input
          icon="person"
          v-model="displayName">
        </b-input>
      </b-field>
      <p class="subtitle has-text-primary is-5">
        Email
      </p>
      <b-field>
        <b-input
          type="email"
          icon="email"
          v-model="email">
        </b-input>
      </b-field>
      <p class="subtitle has-text-primary is-5">
        Password
      </p>
      <b-field>
        <b-input
          placeholder="•••••••••••"
          disabled
          expanded>
        </b-input>
        <p class="control">
          <button class="button" @click="resetPassword()">
            Reset Password
          </button>
        </p>
      </b-field>
      <hr>
      <a class="button is-primary" @click="updateProfile()">Save changes</a>
      <a class="button" @click="$parent.close()">Cancel</a>
    </section>
  </div>
</template>

<script>
import Firebase from 'firebase'
import { client } from '@/filestack'
import { usersRef, db } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'AccountSettingsModal',
  computed: {
    ...mapState([
      'user'
    ])
  },
  data () {
    return {
      saving: false,
      displayName: null,
      email: null,
      photoUrl: ''
    }
  },
  created () {
    this.displayName = this.user.displayName
    this.email = this.user.email
    this.photoUrl = this.user.photoURL
  },
  methods: {
    upload () {
      let user = Firebase.auth().currentUser
      let store = this.$store
      let toast = this.$toast
      // this.$parent.close()

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
        user.updateProfile({
          photoURL: result.filesUploaded[0].url
        }).then(function () {
          usersRef.child(user.uid).child('rooms').once('value', function (snap) {
            snap.forEach(function (childSnapshot) {
              const roomKey = childSnapshot.key
              let updates = {}
              updates['/people/' + roomKey + '/' + user.uid + '/profile_picture'] = result.filesUploaded[0].url
              db.ref().update(updates)
              // peopleRef.child(roomKey).child(user.uid).child('name').update(displayName)
            })
          })
          store.commit('SET_USER', Firebase.auth().currentUser)
          toast.open({
            message: 'Profile updated!'
          })
        }).catch(function (error) {
          console.log(error)
        })
      })
    },
    resetPassword: function () {
      let toast = this.$toast
      let parent = this.$parent
      Firebase.auth().sendPasswordResetEmail(this.user.email).then(function () {
        parent.close()
        toast.open({
          message: 'Email sent'
        })
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
    },
    updateProfile () {
      let toast = this.$toast
      let parent = this.$parent
      let store = this.$store
      let snackbar = this.$snackbar
      let displayName = this.displayName
      let email = this.email
      let user = Firebase.auth().currentUser

      if (user) {
        if (displayName) {
          user.updateProfile({
            displayName: displayName
          }).then(function () {
            // update db user ref
            let updates = {}
            updates['/users/' + user.uid + '/displayName'] = displayName
            db.ref().update(updates)
            usersRef.child(user.uid).child('rooms').once('value', function (snap) {
              snap.forEach(function (childSnapshot) {
                const roomKey = childSnapshot.key
                let updates = {}
                updates['/people/' + roomKey + '/' + user.uid + '/name'] = displayName
                db.ref().update(updates)
                // peopleRef.child(roomKey).child(user.uid).child('name').update(displayName)
              })
            })

            user.updateEmail(email).then(function () {
              // Update db user ref
              let updates = {}
              updates['/users/' + user.uid + '/email'] = email
              db.ref().update(updates)
            }).catch(function (error) {
              console.log(error)
              if (error.code === 'auth/email-already-in-use') {
                snackbar.open({
                  duration: 5000,
                  message: 'Email already is use by another account',
                  type: 'is-danger',
                  position: 'is-bottom-left',
                  actionText: 'dismiss'
                })
              } else if (error.code === 'auth/invalid-email') {
                snackbar.open({
                  duration: 5000,
                  message: 'Email provided is not valid',
                  type: 'is-danger',
                  position: 'is-bottom-left',
                  actionText: 'dismiss'
                })
              }
            })
            store.commit('SET_USER', Firebase.auth().currentUser)
            toast.open({
              message: 'Profile updated!'
            })
            parent.close()
          }).catch(function (error) {
            console.log(error)
          })
        } else {
          snackbar.open({
            duration: 5000,
            message: 'Display name cannot be empty',
            type: 'is-danger',
            position: 'is-bottom-left',
            actionText: 'dismiss'
          })
        }
      } else {
        console.log('error retrieving user')
      }
    }
  }
}
</script>

<style scoped>
.is-128x128 img {
  max-height: initial;
  height: 128px;
  width: auto;
  overflow: hidden;
}
.is-centered {
  margin: 0 auto;
  width: 96px;
}
.subtitle.is-5 {
  margin: 16px 0 8px 0;
}
.section {
  padding: 0;
}
figure {
  position: relative;
}
.hover {
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  display: none;
  border: 2px dashed white;
  width: 97%;
  height: 97%;
  margin: 1.5%;
  border-radius: 50%;
}
.hover .icon {
  line-height: 128px;
  display: inline;
}
figure:hover .hover {
  display: inline-block;
}
.content a {
  display: inline-block;
}
.content figure {
  margin: 0.5em;
}
</style>
