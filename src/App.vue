<template>
  <div id="app">
    <router-view v-if="user != null"></router-view>
  </div>
</template>

<script>
import Firebase from 'firebase'
import { mapState } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState(['user', 'route'])
  },
  beforeCreate () {
    Firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit('SET_USER', user || false)
      if (!user && this.route.name !== 'SetupSignup') {
        this.$router.replace({ name: 'SetupLogin' })
      } else if (user && this.route.name === 'SetupLogin') {
        this.$router.replace({ name: 'Main' })
      } else if (user && this.route.name === 'SetupSignup') {
        this.$router.replace({ name: 'Main' })
      }
    })
  }
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

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

$grey: hsl(0, 0%, 71%);
$grey-invert: findColorInvert($grey);

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
    "grey": ($grey, $grey-invert),
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $info;

$title-weight: $weight-normal;
$subtitle-weight: $weight-light;

@import "~bulma";
@import "~buefy/src/scss/buefy";

body, html {
  height: 100%;
  background-color: #fcfcfc;
}
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.dropdown.is-right-top .dropdown-menu {
  right: auto;
  left: 100%;
  bottom: 0;
  top: auto;
}
.dropdown.is-right-bottom .dropdown-menu {
  right: auto;
  left: 100%;
  top: 0;
  bottom: auto;
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
.is-close {
  padding-left: 8px!important;
  padding-right: 8px!important;
}
.b-tabs, .tabs {
  margin-bottom: 16px!important;
}
.b-tabs {
  max-height: 100%;
}
a.has-text-grey:hover {
  color: hsl(0, 0%, 20%)!important;
}
.is-size-8 {
  line-height: 12px;
  margin-bottom: 8px;
  font-weight: 200;
  font-size: 10px!important;
}
</style>
