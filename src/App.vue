<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyAz3N-tQBr6W4jiGUv_FNOa3rjBkClxu9Y',
  authDomain: 'acdmy-b01f5.firebaseapp.com',
  databaseURL: 'https://acdmy-b01f5.firebaseio.com'
}

let app = Firebase.initializeApp(config)
let db = app.database()

let booksRef = db.ref('books')

export default {
  name: 'app',
  firebase: {
    books: booksRef
  }
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

$turquoise-deep: hsl(205, 36%, 43%);
$grey: #cfcfcf;
$grey-invert: findColorInvert($grey);

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
