<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import store from './store/index'

export default {
  name: 'app',
  store
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

$turquoise-deep: hsl(205, 36%, 43%);
$grey: #cfcfcf;
$grey-invert: findColorInvert($grey);
$google: #dd4b39;
$google-invert: findColorInvert($google);

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
