<template>
  <nav class="sidebar has-text-centered" :class="{'expanded':expanded}">
    <div class="sidebar-start">
      <a class="" title="toggle mute" @click="expand()">
        <img v-if="user.photoURL" class="is-circle-image image is-32x32" :src="user.photoURL" alt="Profile Image">
        <img v-else class="is-circle-image image is-32x32" src="../assets/user-placeholder.png" alt="Profile Image">
      </a>
      <a class="navbar-item is-close" title="toggle mute">
        <b-icon class="is-primary is-circle" icon="mic"></b-icon>
      </a>
      <a class="navbar-item" title="toggle mute">
        <b-icon size="is-small" class="is-grey" icon="notifications"></b-icon>
      </a>
    </div>
    <div class="sidebar-center">
      <div class="center">
      <a class="navbar-item" title="toggle mute">
        <b-icon class="" icon="people"></b-icon>
      </a>
      </div>
      <a class="navbar-item" title="toggle mute">
        <b-icon class="" icon="group_work"></b-icon>
      </a>
      <a class="navbar-item" title="toggle mute">
        <b-icon class="" icon="view_quilt"></b-icon>
      </a>
      <a class="navbar-item" title="toggle mute">
        <b-icon class="" icon="more"></b-icon>
      </a>
    </div>
    <div class="sidebar-end">

    </div>
    <div class="sidebar-help">
      <a class="navbar-item" title="toggle mute">
        <b-icon class="" icon="help"></b-icon>
      </a>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'sidebar',
  components: {
  },
  computed: {
    ...mapState(['user', 'route'])
  },
  data () {
    return {
      expanded: false,
      option: null
    }
  },
  methods: {
    expand (value) {
      this.expanded = !this.expanded
      this.option = value
    }
  }
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 70px;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.25rem 0.25rem;
  background-color: rgba(240,240,240,.95);
  position: relative;
  z-index: 25;
  align-items: center;
  justify-content: center;
  transition: width 1s;
}
.expanded {
  width: 250px;
}
.sidebar-start,
.sidebar-end {
  flex-grow: 1;
}
.sidebar-start img {
  display: inline-block;
}
.sidebar-center {
  padding: 50% 0;
}
</style>
