<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/initial-variables";

$turquoise-deep: hsl(205, 36%, 43%); //override some variables here

$primary: $turquoise-deep;

@import '~bulma';

body, html {
  height: 100%;
  overflow: hidden;
}
#app {
  height: 100%;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
</style>
