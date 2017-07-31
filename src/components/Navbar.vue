<template>
  <nav class="navbar is-marginless">
    <div class="navbar-brand">
      <div class="navbar-item" >
        <img src="../assets/acdmyA.png" alt="Acdmy: Synchronous Online Learning Platform">
      </div>
      <p class="navbar-item is-paddingless">Classroom of the Future</p>
    </div>
    <div class="navbar-center navbar-item is-paddingless">
      <a class="navbar-item is-close" href="#">
        <b-icon class="is-circle" icon="question_answer"></b-icon>
      </a>
      <a class="navbar-item is-close" href="#">
        <b-icon class="is-circle" icon="group"></b-icon>
      </a>
      <a class="navbar-item is-close" href="#">
        <b-icon class="is-circle" icon="dashboard"></b-icon>
      </a>
    </div>
    <div class="navbar-end is-marginless">
      <b-dropdown class="is-marginless" position="is-bottom-left">
        <a class="navbar-item is-close" slot="trigger" title="notifications">
          <b-icon class="is-grey" icon="notifications" size="is-small"></b-icon>
        </a>

          <b-dropdown-option subheader class="has-text-centered" v-if="!notifications">All up to date!</b-dropdown-option>
      </b-dropdown>
      <b-dropdown class="is-marginless" position="is-bottom-left">
        <a class="navbar-item is-close" slot="trigger" title="help">
          <b-icon class="is-grey" icon="help" size="is-small"></b-icon>
        </a>

          <b-dropdown-option><b-icon icon="book"></b-icon> Search Guides</b-dropdown-option>
          <hr class="dropdown-divider">
          <b-dropdown-option><b-icon icon="question_answer"></b-icon> Chat with Support</b-dropdown-option>
      </b-dropdown>
      <a class="navbar-item is-close" title="toggle mute">
        <b-icon class="is-primary is-circle" icon="mic"></b-icon>
      </a>
      <b-dropdown class="is-marginless" position="is-bottom-left">
        <a class="navbar-item" href="#" slot="trigger" title="user profile">
          <img v-if="user.photoURL" class="is-circle-image" :src="user.photoURL" alt="User Profile Image">
          <img v-else class="is-circle-image" src="../assets/user-placeholder.png" alt="User Profile Image">
        </a>

        <b-dropdown-option subheader class="is-user-dropdown">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  <h4 class="title"><strong v-if="user.displayName">{{user.displayName}}</strong><strong v-else>First Last</strong></h4>
                  <p class="subtitle is-6">Instructor</p>
                  <p class="subtitle is-6"><small>{{user.email}}</small><br>
                    <small class="has-text-success" v-if="emailsent">email sent</small>
                    <small class="has-text-danger" v-if="!user.emailVerified && !emailsent && !isSending"><a class="has-text-danger" href="#" @click.prevent="verifyEmail">Please verify email</a></small>
                    <small class="has-text-grey" v-if="isSending">Sending email...</small>
                  </p>
                  <p><small><a @click="isAccountModalActive = true" href="#">Account Settings</a></small> | <small><a href="#" @click.self.prevent="logout">Logout</a></small></p>
                  <b-modal :active.sync="isAccountModalActive" has-modal-card>
                      <modal-account></modal-account>
                  </b-modal>
                </p>
              </div>
            </div>
            <figure class="media-right">
              <p class="image is-64x64">
                <img v-if="user.photoURL" class="is-circle-image" :src="user.photoURL" alt="User Profile Image">
                <img v-else class="is-circle-image" src="../assets/user-placeholder.png" alt="User Profile Image">
              </p>
            </figure>
          </article>
        </b-dropdown-option>
        <hr class="dropdown-divider">
        <b-dropdown-option subheader>
          <b-field>
            <b-select placeholder="Video Source" icon="videocam" expanded>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </b-select>
          </b-field>
          <b-field>
            <b-select placeholder="Audio Input Source" icon="mic" expanded>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </b-select>
          </b-field>
          <b-field>
            <b-select placeholder="Audio Output Source" icon="volume_up" expanded>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </b-select>
          </b-field>
        </b-dropdown-option>
        <hr class="dropdown-divider">
        <b-dropdown-option subheader>
          <div class="columns">
            <div class="column">
              <button class="button is-dark is-outlined is-wide">Room Settings</button>
            </div>
            <div class="column">
              <button class="button is-dark is-outlined is-wide">Student View </button>
            </div>
          </div>
        </b-dropdown-option>
      </b-dropdown>
    </div>
  </nav>
</template>

<script>
import ModalAccount from './AccountSettings'
import Firebase from 'firebase'
import '../firebase'
import { mapState } from 'vuex'

export default {
  name: 'navbar',
  components: {
    ModalAccount
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      notifications: false,
      emailsent: false,
      isAccountModalActive: false,
      isSending: false
    }
  },
  methods: {
    logout: function () {
      Firebase.auth().signOut().then(function () {}, function (error) {
        console.error('Sign Out Error', error)
      })
    },
    verifyEmail: function () {
      this.isSending = true
      this.user.sendEmailVerification()
        .then((response) => {
          console.log('Email Sent')
          this.emailsent = true
          this.isSending = false
        }).catch((error) => {
          console.error('Email Error', error)
          this.isSending = false
        })
    },
    close: function () {
      this.isAccountModalActive = false
    }
  }
}
</script>

<style scoped>
.navbar {
  border-bottom: 1px solid #cfcfcf;
}
/*a.navbar-item:hover {
  background-color: #fff;
}*/
.navbar-brand,
.navbar-end {
  width: 33%;
}
.is-circle {
  border: 1px solid #cfcfcf;
  border-radius: 50%;
  padding: 16px;
}
.is-close {
  padding-left: 4px!important;
  padding-right: 4px!important;
}
.navbar-center {
  margin: 0 auto;
}
.is-user-dropdown {
  width: 400px;
}
.is-circle-image {
  border-radius: 50%;
}
.is-wide {
  width: 100%
}
</style>
