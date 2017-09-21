<template>
  <div key="login" class="box">
    <h2 class="title"><strong>Welcome.</strong></h2>
    <p class="subtitle">Please login <small> or <router-link class="has-text-primary" :to="{ name: 'Signup', params: {} }">sign up</router-link></small></p>
    <b-message type="is-danger" v-if="loginFailed">
      Hmm... Looks like that password was wrong. <a href="#">Reset Password?</a>
    </b-message>
    <b-message type="is-danger" v-if="isInvalid">
      Please enter a valid email.
    </b-message>
    <b-message type="is-danger" v-if="noUser">
      No account with the email. Try again or <router-link :to="{ name: 'Signup', params: {} }">Sign Up</router-link>
    </b-message>
    <form>
      <b-field>
        <b-input type="email" icon="email" v-model="email"
          placeholder="jsmith@example.org" @keyup.enter="login">
        </b-input>
      </b-field>
      <b-field>
        <b-input type="password" icon="lock" @keyup.enter="login"
            placeholder="Password" v-model="password"
            password-reveal>
        </b-input>
      </b-field>
      <hr>
      <p class="control">
        <button class="button is-primary" :class="{'is-loading': authenticating}" @click.self.prevent="login">Login</button>
      </p>
    </form>
  </div>
</template>

<script>
import Firebase from 'firebase'
import { mapState } from 'vuex'

export default {
  name: 'login',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      email: '',
      password: '',
      displayName: '',
      authenticating: false,
      loginFailed: false,
      isInvalid: false,
      noUser: false,
      accountExists: false
    }
  },
  methods: {
    login: function () {
      this.authenticating = true
      this.isInvalid = false
      this.accountExists = false
      Firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .catch((error, authData) => {
        if (error) {
          console.log('Login Failed!', error)
          if (error.code === 'auth/user-not-found') {
            this.noUser = true
          } else if (error.code === 'auth/invalid-email') {
            this.isInvalid = true
          } else {
            this.loginFailed = true
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
.brand {
  height: 60px;
  margin: -32px auto 24px auto;
}
.is-bottom {
  position: absolute;
  bottom: 8px;
  margin: 0 auto;
}
</style>
