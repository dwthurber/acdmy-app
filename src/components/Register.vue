<template>
  <section class="hero is-fullheight is-primary is-dark">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered is-centered">
          <div class="column is-5">
            <img class="brand" src="../assets/acdmy-white.png" />
            <div v-if="!user.emailVerified" class="box" key="signup">
              <p><strong>We are so glad you are signing up!</strong></p><br>
              <p>Please click the link we just sent to your email address to finish registering your account.</p>
              <hr>
              <button v-if="!emailsent" class="button is-primary" @click.self.prevent="verifyEmail" :class="{'is-loading': authenticating}">Resend Email</button>
              <button v-else class="button is-success" disabled>Email Sent</button>
            </div>
            <div v-else class="box" key="signup">
              <p>To get started, we need to know a little bit more about you.</p>
              <br>
              <b-field label="Full Name">
                  <b-input icon="person" placeholder="Jane Smith" v-model="displayName"></b-input>
              </b-field>
              <label><strong>Profile Picture</strong></label>
              <b-field>
                <b-upload v-model="dropFiles"
                  drag-drop>
                  <section class="section">
                    <div class="content has-text-centered">
                      <p>
                        <b-icon
                          icon="file_upload"
                          size="is-large">
                        </b-icon>
                      </p>
                      <p>Drop your files here or click to upload</p>
                    </div>
                  </section>
                </b-upload>
              </b-field>
              <div class="tags">
                <span v-for="(file, index) in dropFiles"
                  :key="index"
                  class="tag is-success" >
                  {{file.name}}
                  <button class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index)">
                  </button>
                </span>
              </div>
              <hr>
              <p class="control">
                <button class="button is-primary" @click.self.prevent="register" :class="{'is-loading': authenticating}">Register</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import Firebase from 'firebase'
import { storageRef } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'register',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      displayName: '',
      authenticating: false,
      emailsent: false,
      dropFiles: null
    }
  },
  methods: {
    verifyEmail: function () {
      this.authenticating = true
      this.user.sendEmailVerification()
        .then((response) => {
          console.log('Email Sent')
          this.emailsent = true
          this.authenticating = false
        }).catch((error) => {
          console.error('Email Error', error)
          this.authenticating = false
        })
    },
    deleteDropFile (index) {
      this.dropFiles.splice(index, 1)
    },
    register: function () {
      this.authenticating = true
      let name = this.displayName
      let user = Firebase.auth().currentUser
      let router = this.$router
      // console.log(this.dropFiles[0])

      storageRef.child(this.dropFiles[0].name).put(this.dropFiles[0]).then(function (snapshot) {
        console.log('success' + snapshot.downloadURL)
        user.updateProfile({
          displayName: name,
          photoURL: snapshot.downloadURL
        }).then(function () {
          // Update successful.
        }).catch(function (error) {
          console.log(error)
        })
        router.replace('/')
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
