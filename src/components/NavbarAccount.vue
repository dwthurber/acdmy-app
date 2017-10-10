<template>
  <b-dropdown
    position="is-bottom-left"
    :hoverable="isAccountModalActive">
    <a
      class="navbar-item"
      slot="trigger"
      title="user profile">
      <img v-if="user.photoURL" class="is-circle-image image is-32x32" :src="user.photoURL" alt="Profile Image">
      <img v-else class="is-circle-image image is-32x32" src="../assets/user-placeholder.png" alt="Profile Image">
    </a>

    <b-dropdown-item
      class="is-wide-dropdown"
      custom>
      <article class="media">
        <div class="media-content">
          <div class="content">
            <p>
              <h4 class="title">
                <strong>{{user.displayName}}</strong>
              </h4>
              <p class="subtitle is-6">
                <small>
                  {{user.email}}
                </small>
                <br>
                <small class="has-text-success" v-if="emailsent">
                  Email sent
                </small>
                <small class="has-text-danger" v-if="!user.emailVerified && !emailsent && !isSending">
                  <a class="has-text-danger"  @click.prevent="verifyEmail">
                    Please verify email
                  </a>
                </small>
                <small class="has-text-grey" v-if="isSending">
                  Sending email...
                </small>
              </p>
              <p>
                <small>
                  <a @click="openAccountSettings()">
                    Account
                  </a>
                </small>
                |
                <small>
                  <a  @click.self.prevent="logout">
                    Logout
                  </a>
                </small>
              </p>
            </p>
          </div>
        </div>
        <figure class="media-right">
          <p class="image is-64x64">
            <img v-if="user.photoURL" class="is-circle-image" :src="user.photoURL" :alt="user.displayName">
            <img v-else class="is-circle-image" src="../assets/user-placeholder.png" alt="Profile Image">
          </p>
        </figure>
      </article>
    </b-dropdown-item>
    <hr class="dropdown-divider">
    <b-dropdown-item class="dropdown-item">
      <b-icon icon="videocam" /> Test Video Setup
    </b-dropdown-item>
    <b-modal
      :active.sync="isAccountModalActive"
      has-modal-card
      canCancel>
      <AccountSettingsModal />
    </b-modal>
  </b-dropdown>
</template>

<script>
import AccountSettingsModal from '@/components/TheAccountSettingsModal'
import Firebase from 'firebase'
import { mapState } from 'vuex'
import { peopleRef } from '@/firebase'

export default {
  name: 'NavbarAccount',
  components: {
    AccountSettingsModal
  },
  computed: {
    ...mapState([
      'user',
      'route'
    ])
  },
  data () {
    return {
      emailsent: false,
      isAccountModalActive: false,
      isSending: false
    }
  },
  methods: {
    logout () {
      if (this.route.params.roomid) {
        peopleRef.child(this.route.params.roomid).child(this.user.uid).update({
          online: false
        })
      }
      this.$store.commit('SET_USER_ROOMS', [])
      this.$store.commit('SET_ALL_ROOMS', [])
      Firebase.auth().signOut().then((response) => {
      }).catch((error) => {
        console.error('Sign Out Error', error)
      })
    },
    verifyEmail () {
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
    openAccountSettings () {
      this.$emit('active-change', false)
      this.isAccountModalActive = true
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
