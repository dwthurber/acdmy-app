<template>
  <nav class="sidebar" :class="{'expanded':expanded}">
    <div class="sidebar-details" id="slide" v-if="expanded">
      <sidebar-account v-if="option == 'profile'"/>
      <sidebar-people v-if="option == 'people'"/>
    </div>
    <div class="sidebar-start" v-if="!expanded">
      <a class="profile-image" title="Account" @click="expand('profile')" >
        <img v-if="user.photoURL" class="is-circle-image image is-38x38" :src="user.photoURL" alt="Profile Image">
        <img v-else class="is-circle-image image is-38x38" src="../../../assets/user-placeholder.png" alt="Profile Image">
      </a><br />
      <b-tooltip label="Mute/Unmute" position="is-right">
        <a class="navbar-item">
          <b-icon class="is-success" icon="mic"></b-icon>
        </a>
      </b-tooltip><br />
      <b-tooltip label="People/Groups" position="is-right">
        <a class="navbar-item" @click="expand('people')">
          <b-icon class="" icon="people"></b-icon>
        </a>
      </b-tooltip><br />
      <!-- <b-tooltip label="Groups" position="is-right">
        <a class="navbar-item">
          <b-icon class="" icon="group_work"></b-icon>
        </a>
      </b-tooltip><br /> -->
      <b-tooltip label="Chat" position="is-right">
        <a class="navbar-item">
          <b-icon class="" icon="question_answer"></b-icon>
        </a>
      </b-tooltip><br />
      <b-tooltip label="Session" position="is-right">
        <a class="navbar-item">
          <b-icon class="" icon="view_quilt"></b-icon>
        </a>
      </b-tooltip><br />
      <b-tooltip label="More" position="is-right">
        <a class="navbar-item">
          <b-icon class="" icon="more"></b-icon>
        </a>
      </b-tooltip>
    </div>
    <div class="sidebar-end" v-if="!expanded">
      <a class="navbar-item" title="help" @click="help = true">
        <b-icon type="is-grey" icon="help"></b-icon>
      </a>
      <b-modal :active.sync="help" canCancel :width="300">
        <div class="card box is-paddingless">
          <div class="card-content">
          <a class="has-text-dark is-size-5"><b-icon icon="book" size="is-medium"></b-icon> Search Guides</a>
          <hr>
          <a class="has-text-dark is-size-5"><b-icon icon="question_answer" size="is-medium"></b-icon> Chat with Support</a>
          <hr>
          <a class="has-text-dark is-size-5" href="https://app.craft.io/share/ECB3A0152305843009665528183" target="_blank"><b-icon icon="feedback" size="is-medium"></b-icon> Send feedback</a>
        </div>
        </div>
      </b-modal>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import sidebarAccount from '@/components/session/sidebar/Account'
import sidebarPeople from '@/components/session/sidebar/People'

export default {
  name: 'sidebar',
  props: ['option', 'expanded'],
  components: {
    sidebarAccount,
    sidebarPeople
  },
  computed: {
    ...mapState(['user', 'room'])
  },
  data () {
    return {
      help: false
    }
  },
  methods: {
    expand (value) {
      this.$emit('update:option', value)
      this.$emit('update:expanded', !this.expanded)
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
  position: relative;
  z-index: 25;
  transition: width 0.6s;
}
.expanded {
  width: 250px;
  align-items: flex-start;
}
.sidebar-start {
  flex-grow: 1;
}
.image.is-38x38 {
  width: 38px;
  height: 38px;
}
.profile-image {
  display: inline-block;
  padding: 0 0.5rem;
}
.sidebar-details {
  padding: 0 0.5rem;
  width: 240px;
  flex-grow: 1;
  overflow-y: auto;
}
#slide {
  position: relative;
  left: -185px;
  animation: slide 0.6s forwards;
}
@keyframes slide {
  100% {
    left: 0;
  }
}
</style>
