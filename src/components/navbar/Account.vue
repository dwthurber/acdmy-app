<template>
  <b-dropdown position="is-bottom-left">
    <a class="navbar-item"  slot="trigger" title="user profile">
      <img v-if="user.photoURL" class="is-circle-image image is-32x32" :src="user.photoURL" alt="Profile Image">
      <img v-else class="is-circle-image image is-32x32" src="../../assets/user-placeholder.png" alt="Profile Image">
    </a>

    <b-dropdown-item custom class="is-wide-dropdown">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <p>
              <h4 class="title"><strong>{{user.displayName}}</strong></h4>
              <p class="subtitle is-6"><small>{{user.email}}</small><br>
                <small class="has-text-success" v-if="emailsent">Email sent</small>
                <small class="has-text-danger" v-if="!user.emailVerified && !emailsent && !isSending"><a class="has-text-danger"  @click.prevent="verifyEmail">Please verify email</a></small>
                <small class="has-text-grey" v-if="isSending">Sending email...</small>
              </p>
              <p><small><a @click="isAccountModalActive = true" >Account</a></small> | <small><a  @click.self.prevent="logout">Logout</a></small></p>
              <b-modal :active.sync="isAccountModalActive" has-modal-card canCancel>
                  <modal-account></modal-account>
              </b-modal>
            </p>
          </div>
        </div>
        <figure class="media-right">
          <p class="image is-64x64">
            <img v-if="user.photoURL" class="is-circle-image" :src="user.photoURL" alt="Profile Image">
            <img v-else class="is-circle-image" src="../../assets/user-placeholder.png" alt="Profile Image">
          </p>
        </figure>
      </article>
    </b-dropdown-item>
    <hr class="dropdown-divider">
    <b-dropdown-item class="dropdown-item">
      <b-icon icon="videocam" /> Test Video Setup
    </b-dropdown-item>
    <!-- <b-dropdown-option custom>
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
</template>

<script>
import ModalAccount from '@/components/navbar/AccountSettings'
import Firebase from 'firebase'
import { mapState } from 'vuex'
import { peopleRef } from '@/firebase'

export default {
  name: 'account',
  components: {
    ModalAccount
  },
  computed: {
    ...mapState(['user', 'room', 'route'])
  },
  data () {
    return {
      emailsent: false,
      isAccountModalActive: false,
      isSending: false
    }
  },
  methods: {
    logout: function () {
      if (this.route.params.roomid) {
        peopleRef.child(this.route.params.roomid).child(this.user.uid).update({
          online: false
        })
      }
      this.$store.commit('SET_USER_ROOMS', null)
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
  }
}
</script>

<style scoped>
.is-wide-dropdown {
  min-width: 350px;
}
.is-wide {
  width: 100%
}
.is-64x64 img {
  max-height: initial;
  height: 64px;
  width: auto;
  overflow: hidden;
}
.image.is-32x32 {
  max-height: initial;
}
</style>
