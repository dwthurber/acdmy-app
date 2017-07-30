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

export default {
  name: 'app',
  store,
  computed: {
    ...mapState(['user'])
  },
  beforeCreate () {
    Firebase.auth().onAuthStateChanged((user) => {
      // initially user = null, after auth it will be either <fb_user> or false
      this.$store.commit('setUser', user || false)
      if (user && this.$route.path === '/login') {
        this.$router.replace('/')
      } else if (user && this.$route.path === '/register') {
        this.$router.replace('/')
      } else if (!user && this.$route.path !== '/login') {
        this.$router.replace('/login')
      }
    })
  },
  data: {
    return () {
      this.isLoading = true
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
  overflow: hidden;
}
#app {
  height: 100%;
}
</style>
