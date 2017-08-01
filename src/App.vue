<template>
  <div id="app">
    <router-view v-if="user !== null"></router-view>
  </div>
</template>

<script>
import store from './store/index'
import Firebase from 'firebase'
import { mapState } from 'vuex'
import './firebase'

const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
const randLetter2 = String.fromCharCode(65 + Math.floor(Math.random() * 26))
const randLetter3 = String.fromCharCode(65 + Math.floor(Math.random() * 26))
const uniqid = randLetter + randLetter2 + Date.now() + randLetter3

export default {
  name: 'app',
  store,
  computed: {
    ...mapState(['user', 'roomid'])
  },
  beforeCreate () {
    this.$store.commit('setRoomId', uniqid)
    Firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit('setUser', user || false)
      if (!user) {
        this.$router.replace('/login')
      } else if (user && this.$route.path === '/register') {
        this.$router.replace('/user/' + this.user.uid)
      } else if (user && this.$route.path === '/login') {
        this.$router.replace('/user/' + this.user.uid)
      }
    })
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

$turquoise-deep: hsl(205, 36%, 43%);
$grey: #cfcfcf;
$grey-invert: findColorInvert($grey);
$google: #dd4b39;
$google-invert: findColorInvert($google);
$facebook: #3b5998;
$facebook-invert: findColorInvert($facebook);

$primary: $turquoise-deep;
$primary-invert: findColorInvert($primary);

// Setup $colors to use as bulma classes
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "grey": ($grey, $grey-invert),
    "google": ($google, $google-invert),
    "facebook": ($facebook, $facebook-invert),
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

@import "~bulma";
@import "~buefy/src/scss/buefy";

body, html {
  height: 100%;
}
#app {
  height: 100%;
}
</style>
