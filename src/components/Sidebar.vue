<template>
  <nav class="sidebar" :class="{'expanded':expanded}">
    <div class="sidebar-start">
      <transition name="fade">
      <a class="profile-image" title="toggle mute" @click="expand('profile')" v-if="!expanded || option == 'profile'">
        <img v-if="user.photoURL" class="is-circle-image image is-38x38" :src="user.photoURL" alt="Profile Image">
        <img v-else class="is-circle-image image is-38x38" src="../assets/user-placeholder.png" alt="Profile Image">
      </a>
      </transition>
      <transition name="fade">
        <a class="navbar-item" title="toggle mute" v-if="!expanded">
          <b-icon class="is-success" icon="mic"></b-icon>
        </a>
      </transition>
      <!-- <a class="navbar-item" title="toggle mute">
        <b-icon size="is-small" class="is-grey" icon="notifications"></b-icon>
      </a> -->
      <transition name="fade">
        <a class="navbar-item" title="toggle mute" @click="expand('people')" v-if="!expanded || option == 'people'">
          <b-icon class="" icon="people"></b-icon>
        </a>
      </transition>
      <transition name="fade">
        <a class="navbar-item" title="toggle mute" v-if="!expanded">
          <b-icon class="" icon="group_work"></b-icon>
        </a>
      </transition>
      <transition name="fade">
        <a class="navbar-item" title="toggle mute" v-if="!expanded">
          <b-icon class="" icon="question_answer"></b-icon>
        </a>
      </transition>
      <transition name="fade">
        <a class="navbar-item" title="toggle mute" v-if="!expanded">
          <b-icon class="" icon="view_quilt"></b-icon>
        </a>
      </transition>
      <transition name="fade">
        <a class="navbar-item" title="toggle mute" v-if="!expanded">
          <b-icon class="" icon="more"></b-icon>
        </a>
      </transition>
    </div>
    <div class="sidebar-end">

    </div>
    <div class="sidebar-help">
      <a class="navbar-item" title="toggle mute" v-if="!expanded">
        <b-icon type="is-grey" icon="help"></b-icon>
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
  width: 63px;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.25rem 0.25rem;
  background-color: rgba(240,240,240,.95);
  position: relative;
  z-index: 25;
  /*align-items: center;*/
  /*justify-content: center;*/
  transition: width 1s;
}
.expanded {
  width: 250px;
  align-items: flex-start;
}
.sidebar-start,
.sidebar-end {
  flex-grow: 1;
}
.sidebar-center {
  padding: 50% 0;
}
.image.is-38x38 {
  width: 38px;
  height: 38px;
}
.profile-image {
  display: inline-block;
  padding: 0 0.5rem;
}
</style>
