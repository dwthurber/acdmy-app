<template>
  <nav class="sidebar" :class="{'expanded':expanded}">
    <div class="sidebar-details" id="slide" v-if="expanded">
      <sidebar-account v-if="option == 'profile'"/>
      <sidebar-people v-if="option == 'people'"/>
    </div>
    <div class="sidebar-start has-text-centered">
      <a class="profile-image" title="Account" @click="expand('profile')" >
        <img v-if="user.photoURL" class="is-circle-image image is-38x38" :src="user.photoURL" alt="Profile Image">
        <img v-else class="is-circle-image image is-38x38" src="../../../assets/user-placeholder.png" alt="Profile Image">
      </a><br />
      <a class="audio">
        <b-icon class="is-success is-circle" icon="mic"></b-icon>
        <!-- <p class="is-size-8">Audio</p> -->
      </a><br />
      <a class="has-text-grey" v-show="room.user.role == 'Student'">
        <b-icon class="" icon="pan_tool"></b-icon>
        <p class="is-size-8 is-uppercase">Hand</p>
      </a>
      <a class="has-text-grey" :class="{'active': option == 'people'}" @click="expand('people')" v-show="room.user.role == 'Instructor'">
        <b-icon class="" icon="people"></b-icon>
        <p class="is-size-8 is-uppercase">People</p>
      </a>
      <a class="has-text-grey">
        <b-icon class="" icon="question_answer"></b-icon>
        <p class="is-size-8 is-uppercase">Chat</p>
      </a>
      <a class="has-text-grey" v-show="room.user.role == 'Instructor'">
        <b-icon class="" icon="view_quilt"></b-icon>
        <p class="is-size-8 is-uppercase">Layout</p>
      </a>
      <a class="has-text-grey" v-show="room.user.role == 'Instructor'">
        <b-icon class="" icon="apps"></b-icon>
        <p class="is-size-8 is-uppercase">Activities</p>
      </a>
      <a class="has-text-grey" v-show="room.user.role == 'Instructor'">
        <b-icon class="" icon="more"></b-icon>
        <p class="is-size-8 is-uppercase">More</p>
      </a>

    </div>
    <div class="sidebar-end has-text-centered">
      <a title="help" @click="help = true">
        <b-icon class="is-grey" icon="help"></b-icon>
      </a>
      <b-modal :active.sync="help" canCancel :width="300">
        <div class="card box is-paddingless has-text-left">
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
      if (value === this.option) {
        this.$emit('update:expanded', false)
        this.$emit('update:option', null)
      } else {
        this.$emit('update:option', value)
        this.$emit('update:expanded', true)
      }
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
.active {
  color: hsl(205, 36%, 43%)!important;
}
.expanded {
  width: 280px;
  align-items: flex-start;
}
.sidebar-start {
  flex-grow: 1;
  overflow-y: auto;
  position: absolute;
}
.sidebar-end {
  position: absolute;
  bottom: 16px;
  left: 20px;
}
.sidebar-start .is-size-8 {
  opacity: 0;
  transition-duration: 0.3s;
}
.sidebar:hover .is-size-8 {
  opacity: 1;
}
.image.is-38x38 {
  width: 38px;
  height: 38px;
}
.profile-image {
  display: inline-block;
  padding: 0 0.5rem;
}
.audio {
  position: relative;
  bottom: 4px;
  line-height: 60px;
}
.sidebar-details {
  padding: 0.25rem 0.5rem 0 4rem;
  width: 270px;
  flex-grow: 1;
  overflow-y: auto;
}
#slide {
  position: relative;
  left: -210px;
  animation: slide 0.6s forwards;
}
@keyframes slide {
  100% {
    left: 0;
  }
}
</style>
