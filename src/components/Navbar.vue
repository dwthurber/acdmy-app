<template>
  <nav class="navbar is-marginless" id="top">
    <div class="navbar-brand">
      <router-link :to="{ name: 'Main' }" class="navbar-item"><img src="../assets/acdmy.png" alt="Acdmy: Synchronous Online Learning Platform"></router-link>
      <div class="is-hidden-desktop navbar-center navbar-item is-paddingless">
        <small class="uppercase" v-if="!$route.params.roomid">My Rooms</small>
        <div class="tabs is-centered" v-else>
          <small class="uppercase" v-if="currentRoom">{{currentRoom.name}}</small>
          <ul>
            <router-link :to="{ name: 'Main-Classroom' }" tag="li" exact><a><b-icon icon="group_work" size="is-small"></b-icon> Room</a></router-link>
            <router-link :to="{ name: 'Main-Chat' }" tag="li" exact><a><b-icon icon="question_answer" size="is-small"></b-icon> Chat</a></router-link>
            <router-link :to="{ name: 'Dashboard-Sessions' }" tag="li"><a><b-icon icon="dashboard" size="is-small"></b-icon> Dashboard</a></router-link>
          </ul>
        </div>
      </div>
      <div class="navbar-end navbar-item is-hidden-desktop">
        <b-dropdown class="is-marginless" position="is-bottom-left">
          <a class="navbar-item is-close" slot="trigger" title="notifications">
            <b-icon icon="notifications" size="is-small"></b-icon>
          </a>

            <div custom class="dropdown-item has-text-centered" v-if="!notifications">All up to date!</div>
        </b-dropdown>
        <b-dropdown class="is-marginless" position="is-bottom-left">
          <a class="navbar-item is-close" slot="trigger" title="help">
            <b-icon icon="help" size="is-small"></b-icon>
          </a>

            <a class="dropdown-item"><b-icon icon="book"></b-icon> Search Guides</a>
            <hr class="dropdown-divider">
            <a class="dropdown-item"><b-icon icon="question_answer"></b-icon> Chat with Support</a>
        </b-dropdown>
        <a class="navbar-item is-close" title="toggle mute" v-if="$route.params.sessionid">
          <b-icon class="is-primary is-circle" icon="mic"></b-icon>
        </a>
        <b-dropdown class="is-marginless" position="is-bottom-left">
          <a class="navbar-item"  slot="trigger" title="user profile">
            <img v-if="user.photoURL" class="is-circle-image image is-32x32" :src="user.photoURL" alt="User Profile Image">
            <img v-else class="is-circle-image image is-32x32" src="../assets/user-placeholder.png" alt="User Profile Image">
          </a>

          <div custom class="dropdown-item">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <p>
                    <h4 class="title"><strong>{{user.displayName}}</strong></h4>
                    <p class="subtitle is-6"><small>{{user.email}}</small><br>
                      <small class="has-text-success" v-if="emailsent">email sent</small>
                      <small class="has-text-danger" v-if="!user.emailVerified && !emailsent && !isSending"><a class="has-text-danger"  @click.prevent="verifyEmail">Please verify email</a></small>
                      <small class="has-text-grey" v-if="isSending">Sending email...</small>
                    </p>
                    <p><small><a @click="isAccountModalActive = true" >Account</a></small> | <small><a  @click.self.prevent="logout">Logout</a></small></p>
                    <b-modal :active.sync="isAccountModalActive" has-modal-card>
                        <modal-account></modal-account>
                    </b-modal>
                  </p>
                </div>
              </div>
              <figure class="media-right">
                <p class="image is-64x64">
                  <img v-if="user.photoURL" class="is-circle-image" :src="user.photoURL" alt="Profile Image">
                  <img v-else class="is-circle-image" src="../assets/user-placeholder.png" alt="Profile Image">
                </p>
              </figure>
            </article>
          </div>
          <!-- <hr class="dropdown-divider">
          <b-dropdown-option custom>
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
          <b-dropdown-option custom>
            <div class="columns">
              <div class="column">
                <button class="button is-dark is-outlined is-wide">Room Settings</button>
              </div>
              <div class="column">
                <button class="button is-dark is-outlined is-wide">Student View </button>
              </div>
            </div>
          </b-dropdown-option> -->
        </b-dropdown>
      </div>
    </div>
    <div class="navbar-menu">
      <div class="navbar-center navbar-item is-paddingless">
        <small class="uppercase" v-if="!$route.params.roomid">My Rooms</small>
        <div class="tabs is-centered" v-else>
          <small class="uppercase" v-if="currentRoom">{{currentRoom.name}}</small>
          <ul>
            <router-link :to="{ name: 'Main-Classroom' }" tag="li" exact><a><b-icon icon="group_work" size="is-small"></b-icon> Room</a></router-link>
            <router-link :to="{ name: 'Main-Chat' }" tag="li" exact><a><b-icon icon="question_answer" size="is-small"></b-icon> Chat</a></router-link>
            <router-link :to="{ name: 'Dashboard-Sessions' }" tag="li"><a><b-icon icon="dashboard" size="is-small"></b-icon> Dashboard</a></router-link>
          </ul>
        </div>
      </div>
      <div class="navbar-end is-marginless">
        <b-dropdown class="is-marginless" position="is-bottom-left">
          <a class="navbar-item is-close" slot="trigger" title="notifications">
            <b-icon icon="notifications" size="is-small"></b-icon>
          </a>

            <div custom class="dropdown-item has-text-centered" v-if="!notifications">All up to date!</div>
        </b-dropdown>
        <b-dropdown class="is-marginless" position="is-bottom-left">
          <a class="navbar-item is-close" slot="trigger" title="help">
            <b-icon icon="help" size="is-small"></b-icon>
          </a>

          <a class="dropdown-item"><b-icon icon="book"></b-icon> Search Guides</a>
          <hr class="dropdown-divider">
          <a class="dropdown-item"><b-icon icon="question_answer"></b-icon> Chat with Support</a>
        </b-dropdown>
        <a class="navbar-item is-close" title="toggle mute" v-if="$route.params.sessionid">
          <b-icon class="is-primary is-circle" icon="mic"></b-icon>
        </a>
        <b-dropdown position="is-bottom-left">
          <a class="navbar-item"  slot="trigger" title="user profile">
            <img v-if="user.photoURL" class="is-circle-image image is-32x32" :src="user.photoURL" alt="Profile Image">
            <img v-else class="is-circle-image image is-32x32" src="../assets/user-placeholder.png" alt="Profile Image">
          </a>

          <div custom class="dropdown-item is-wide-dropdown">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <p>
                    <h4 class="title"><strong>{{user.displayName}}</strong></h4>
                    <p class="subtitle is-6"><small>{{user.email}}</small><br>
                      <small class="has-text-success" v-if="emailsent">email sent</small>
                      <small class="has-text-danger" v-if="!user.emailVerified && !emailsent && !isSending"><a class="has-text-danger"  @click.prevent="verifyEmail">Please verify email</a></small>
                      <small class="has-text-grey" v-if="isSending">Sending email...</small>
                    </p>
                    <p><small><a @click="isAccountModalActive = true" >Account</a></small> | <small><a  @click.self.prevent="logout">Logout</a></small></p>
                    <b-modal :active.sync="isAccountModalActive" has-modal-card>
                        <modal-account></modal-account>
                    </b-modal>
                  </p>
                </div>
              </div>
              <figure class="media-right">
                <p class="image is-64x64">
                  <img v-if="user.photoURL" class="is-circle-image" :src="user.photoURL" alt="Profile Image">
                  <img v-else class="is-circle-image" src="../assets/user-placeholder.png" alt="Profile Image">
                </p>
              </figure>
            </article>
          </div>
          <!-- <hr class="dropdown-divider">
          <b-dropdown-option custom>
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
          <b-dropdown-option custom>
            <div class="columns">
              <div class="column">
                <button class="button is-dark is-outlined is-wide">Room Settings</button>
              </div>
              <div class="column">
                <button class="button is-dark is-outlined is-wide">Student View </button>
              </div>
            </div>
          </b-dropdown-option> -->
        </b-dropdown>
      </div>
    </div>
  </nav>
</template>

<script>
import ModalAccount from './AccountSettings'
import Firebase from 'firebase'
import { mapState } from 'vuex'
import { peopleRef } from '@/firebase'

export default {
  name: 'navbar',
  components: {
    ModalAccount
  },
  computed: {
    ...mapState(['user', 'userProfile', 'currentRoom'])
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
      if (this.currentRoom) {
        peopleRef.child(this.currentRoom['.key']).child(this.user.uid).update({
          online: false
        })
      }
      Firebase.auth().signOut().then((response) => {
      }).catch((error) => {
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
  },
  updated () {
    // this.$store.dispatch('setCurrentRoom', roomsRef.child(this.$route.params.roomid))
    // this.$store.dispatch('setUsers', peopleRef.child(this.$route.params.roomid))
    // peopleRef.child(this.$route.params.roomid).child(this.user.uid).update({
    //   online: true
    // })
  }
}
</script>

<style scoped>
.navbar {
  border-bottom: 1px solid #cfcfcf;
  background-color: #fcfcfc;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 19;
}
.tabs ul {
  padding-top: 16px;
  border-bottom: none;
  position: relative;
}
.tabs small {
  position: absolute;
  width: 100%;
  top: 4px;
  text-align: center;
}
.uppercase {
  text-transform: uppercase;
  font-size: 0.7rem;
}
.navbar-brand,
.navbar-end {
  /*width: 30%;*/
}
.is-close {
  padding-left: 4px!important;
  padding-right: 4px!important;
}
.navbar-center {
  margin: 0 auto;
}
.is-wide-dropdown {
  width: 350px;
}
.is-wide {
  width: 100%
}
.tabs a:hover,
.router-link-active a {
  color: hsl(205, 36%, 43%);
}
.navbar-burger {
  margin-left: 0;
}
.is-64x64 img {
  max-height: initial;
  height: 64px;
  width: auto;
  overflow: hidden;
}
</style>
