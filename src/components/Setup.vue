<template>
  <div class="column hero is-fullheight">
    <div class="hero-body" v-if="user == false || null">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <img class="brand" src="../assets/acdmy.png" />
            <!-- <p class="subtitle">Classroom of the Future</p> -->
            <SetupLogin v-if="login" />
            <SetupSignup v-else />
            <p class="has-text-centered has-text-grey">
              <a
                v-if="login"
                @click.prevent="login = false">
                Sign Up
              </a>
              <a
                v-else
                @click.prevent="login = true">
                Login
              </a>
              |
              <a v-if="login" @click="resetPassword()">
                Forgot Password
              </a>
              <a v-else href="#">
                Need Help?
              </a>
              |
              <a>
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <b-loading v-else :active.sync="isLoading" :canCancel="false"></b-loading>
  </div>
</template>

<script>
import Firebase from 'firebase'
import { mapState } from 'vuex'
import SetupLogin from '@/components/SetupLogin'
import SetupSignup from '@/components/SetupSignup'

export default {
  name: 'Setup',
  components: {
    SetupLogin,
    SetupSignup
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  data () {
    return {
      login: true,
      isLoading: true
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
    }
  }
}
</script>

<style scoped>
.is-background {
  background-color: #F62459;
  background-image: linear-gradient(rgba(162, 191, 213, 0.7),rgba(244, 249, 252, 0.8)),linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url('../assets/bg.jpg');
  background-position: center;
}
.brand {
  height: 60px;
  margin-bottom: 16px;
}
.hero {
  overflow-y: auto;
}
.container {
  margin-top: -18px;
}
</style>
