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
    ...mapState(['user', 'route'])
  },
  beforeCreate () {
    Firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit('SET_USER', user || false)
      if (!user) {
        this.$router.replace({ name: 'Login' })
      } else if (user && this.route.name === 'Login') {
        this.$router.replace({ name: 'Main' })
      } else if (user && this.route.name === 'Signup') {
        this.$router.replace({ name: 'Main' })
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

$google: #dd4b39;
$google-invert: findColorInvert($google);
$facebook: #3b5998;
$facebook-invert: findColorInvert($facebook);

$primary: hsl(205, 36%, 43%);
$primary-invert: findColorInvert($primary);

$success: hsl(153, 39%, 45%);
$success-invert: findColorInvert($success);

$warning: hsl(45, 74%, 65%);
$warning-invert: findColorInvert($warning);

$info: hsl(205, 40%, 73%);
$info-invert: findColorInvert($info);

$danger: hsl(3, 74, 65%);
$danger-invert: findColorInvert($danger);

$family-sans-serif: "Helvetica Neue", Helvetica, Arial, sans-serif;

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
  background-color: #fcfcfc;
}
#app {
  height: 100%;
  // overflow-y: hidden;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
.modal-card {
  border-radius: 5px;
}
.is-maxheight {
  height: 100%;
}
</style>
