<template>
  <div key="login" class="box">
    <h2 class="title">
      <strong>Welcome.</strong>
    </h2>
    <p class="subtitle">
      Please login.
    </p>
    <form @submit.prevent="login">
      <b-field>
        <b-input
          type="email"
          icon="email"
          v-model="email"
          placeholder="jsmith@example.org">
        </b-input>
      </b-field>
      <b-field>
        <b-input
          type="password"
          icon="lock"
          placeholder="Password"
          v-model="password"
          password-reveal>
        </b-input>
      </b-field>
      <hr>
      <p class="control">
        <button
          class="button is-primary"
          :class="{'is-loading': authenticating}">
          Login
        </button>
      </p>
    </form>
  </div>
</template>

<script>
import Firebase from 'firebase'
import { mapState } from 'vuex'

export default {
  name: 'SetupLogin',
  computed: {
    ...mapState([
      'user'
    ])
  },
  data () {
    return {
      email: '',
      password: '',
      authenticating: false
    }
  },
  methods: {
    resetPassword: function () {
      let toast = this.$toast
      this.$dialog.prompt({
        message: `What's your email address?`,
        inputPlaceholder: 'e.g. jsmith@example.org',
        onConfirm: (value) => {
          Firebase.auth().sendPasswordResetEmail(value).then(function () {
            toast.open('Email sent')
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
        }
      })
    },
    login: function () {
      this.authenticating = true
      let snackbar = this.$snackbar
      let router = this.$router
      // let resetPassword = this.resetPassword()

      Firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .catch((error, authData) => {
        if (error) {
          console.log('Login Failed!', error)
          if (error.code === 'auth/user-not-found') {
            snackbar.open({
              duration: 5000,
              message: 'No user found with that email address',
              type: 'is-danger',
              position: 'is-bottom-left',
              actionText: 'signup',
              onAction: () => {
                router.replace({ name: 'Signup' })
              }
            })
          } else if (error.code === 'auth/invalid-email') {
            snackbar.open({
              duration: 5000,
              message: 'Please enter a valid email',
              type: 'is-danger',
              position: 'is-bottom-left',
              actionText: 'dismiss'
            })
          } else {
            snackbar.open({
              duration: 5000,
              message: 'Hmm... Looks like that password was wrong',
              type: 'is-danger',
              position: 'is-bottom-left',
              actionText: 'reset password',
              onAction: () => {
                this.resetPassword()
              }
            })
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

</style>
