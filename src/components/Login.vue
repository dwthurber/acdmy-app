<template>
  <section class="hero is-fullheight is-primary is-dark">
    <b-loading :active.sync="authenticating" :canCancel="false"></b-loading>
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-4 is-offset-4">
            <h1 class="title">
              Sign In
            </h1>
            <div class="box">
              <b-message type="is-danger" v-if="loginFailed">
                  Uh oh. That didn't work. <a href="#">Reset Password?</a>
              </b-message>
              <form>
                <b-field label="Email (username)">
                    <b-input type="email" icon="email" v-model="email"
                        placeholder="jsmith@example.org" @keyup.enter="login">
                    </b-input>
                </b-field>
                <b-field label="Password">
                    <b-input type="password" icon="lock" @keyup.enter="login"
                        placeholder="Str0ngP@ssword" v-model="password"
                        password-reveal>
                    </b-input>
                </b-field>
                <hr>
                <p class="control">
                  <button class="button is-primary" @click.self.prevent="login">Sign In</button>
                </p>
              </form>
            </div>
            <div class="box">
              <a class="button is-google is-social">Sign in with Google</a>
            </div>
            <p class="has-text-centered">
              <a href="#/register">Sign Up</a>
              |
              <a href="#">Forgot password?</a>
            </p>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import Firebase from 'firebase'
import '../firebase'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      authenticating: false,
      loginFailed: false
    }
  },
  methods: {
    login: function () {
      this.authenticating = true
      Firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function (error, authData) {
        if (error) {
          console.log('Login Failed!', error)
          this.loginFailed = true
        } else {
          console.log('Authenticated successfully with payload:', authData)
        }
        this.authenticating = false
      }.bind(this))
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
  background-image: linear-gradient(rgba(70, 116, 149, 0.6),rgba(70, 160, 119, 0.6)),linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url('../assets/bg.jpg');
  background-position: center;
}
</style>
