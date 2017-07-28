<template>
  <nav class="navbar is-marginless">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <img src="../assets/acdmyA.png" alt="Acdmy: Synchronous Online Learning Platform">
      </a>
      <p class="navbar-item is-paddingless">Classroom of the Future</p>
    </div>
    <div class="navbar-center navbar-item is-paddingless">
      <a class="navbar-item is-close" href="#">
        <b-icon class="is-circle" icon="question_answer"></b-icon>
      </a>
      <a class="navbar-item is-close" href="#">
        <b-icon class="is-circle" icon="group"></b-icon>
      </a>
      <a class="navbar-item is-close" href="#">
        <b-icon class="is-circle" icon="dashboard"></b-icon>
      </a>
    </div>
    <div class="navbar-end is-marginless">
      <a class="navbar-item is-close">
        <b-icon class="is-grey" icon="notifications" size="is-small"></b-icon>
      </a>
      <a class="navbar-item is-close">
        <b-icon class="is-grey" icon="help" size="is-small"></b-icon>
      </a>
      <a class="navbar-item is-close">
        <b-icon class="is-primary is-circle" icon="mic"></b-icon>
      </a>
      <a class="navbar-item" href="#">
        <img class="is-24x24" src="../assets/logo.png" alt="Acdmy: Synchronous Online Learning Platform">
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      logo: ''
    }
  }
}
</script>

<style scoped>
.navbar {
  border-bottom: 1px solid #cfcfcf;
}
.navbar-brand,
.navbar-end {
  width: 33%;
}
.is-circle {
  border: 1px solid #cfcfcf;
  border-radius: 50%;
  padding: 16px;
}
.is-close {
  padding-left: 4px!important;
  padding-right: 4px!important;
}
.navbar-center {
  margin: 0 auto;
}
</style>
