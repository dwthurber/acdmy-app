<template>
  <div id="app">
    <Navbar v-if="user" />
    <router-view v-if="user !== null"></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Firebase from 'firebase'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {Navbar},
  computed: {
    ...mapState(['user'])
  },
  beforeCreate () {
    Firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit('SET_USER', user || false)
      if (!user) {
        this.$router.replace('/login')
      } else if (user && this.$route.path === '/login') {
        this.$router.replace('/')
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
.menu-label {
  padding-left: 8px;
}
.re-align {
  margin-top: -3px;
}
.is-circle {
  border: 1px solid #cfcfcf;
  border-radius: 50%;
  padding: 16px;
}
.is-circle-image {
  border-radius: 50%;
}
</style>
