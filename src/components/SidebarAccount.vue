<template>
  <b-dropdown
    class="has-text-left is-right-bottom"
    :hoverable="isAccountModalActive">
    <a
      class="navbar-item"
      slot="trigger"
      title="user profile">
      <img v-if="user.photoURL" class="is-circle-image image" :class="{'is-16x16':fullscreen, 'is-32x32':!fullscreen}" :src="user.photoURL" alt="Profile Image">
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
          <AppUserAvatar
            size="is-64x64"
            :photoURL="user.photoURL"
            :displayName="user.displayName" />
        </figure>
      </article>
    </b-dropdown-item>
    <b-dropdown-item separator />
    <b-dropdown-item>
      <b-icon icon="videocam" /> Test Video Setup
    </b-dropdown-item>
    <b-dropdown-item separator />
    <b-dropdown-item>
      <p class="title is-6">Current Plan: <span class="tag is-primary is-rounded">Pro</span></p>
      <p class="subtitle is-7">Unlimited minutes remaining this month</p>
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
import AppUserAvatar from '@/components/AppUserAvatar'
import Firebase from 'firebase'
import { mapState } from 'vuex'

export default {
  name: 'SidebarAccount',
  props: {
    fullscreen: Boolean
  },
  components: {
    AccountSettingsModal,
    AppUserAvatar
  },
  computed: {
    ...mapState([
      'user',
      'route',
      'userDetails'
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
      // set presence
      const uid = this.user.uid
      const userStatusDatabaseRef = Firebase.database().ref(`/status/${uid}`)
      const isOfflineForDatabase = {
        state: 'offline',
        last_changed: Firebase.database.ServerValue.TIMESTAMP
      }
      userStatusDatabaseRef.update(isOfflineForDatabase)

      // clear vuexstore
      this.$store.commit('SET_USER_ROOMS', [])
      this.$store.commit('SET_ALL_ROOMS', [])
      this.$store.commit('SET_CURRENT_ROOM', null)
      this.$store.commit('SET_PEOPLE', [])
      this.$store.commit('SET_CURRENT_USER', {})

      // logout firebase auth
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
a.navbar-item {
  padding: 8px 12px;
}
</style>
