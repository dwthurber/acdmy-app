<template>
  <nav class="sidebar" :class="{'expanded':expanded}">
    <div class="sidebar-details" :class="{'delay':option == 'profile'}" v-if="expanded && option == 'profile'">
      <nav class="level">
        <div class="level-left">
          <img class="level-item image is-circle-image is-38x38" :src="user.photoURL">
          <p class="level-item">{{ user.displayName }}</p>
        </div>
        <div class="level-right">
          <a class="level-item" @click="expand(null)">
            <b-icon icon="close" />
          </a>
        </div>
      </nav>
      <hr>
      <b-field>
        <b-select placeholder="Video Source" icon="videocam" expanded>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </b-select>
      </b-field>
      <b-field>
        <b-select placeholder="Audio Input Source" icon="mic" expanded>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </b-select>
      </b-field>
      <b-field>
        <b-select placeholder="Audio Output Source" icon="volume_up" expanded>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </b-select>
      </b-field>
      <hr>
      <button class="button is-danger is-wide">End Session</button>
    </div>
    <div class="sidebar-start" v-if="!expanded">
      <a class="profile-image" title="Account" @click="expand('profile')" >
        <img v-if="user.photoURL" class="is-circle-image image is-38x38" :src="user.photoURL" alt="Profile Image">
        <img v-else class="is-circle-image image is-38x38" src="../assets/user-placeholder.png" alt="Profile Image">
      </a><br />
      <b-tooltip label="Mute/Unmute" position="is-right">
        <a class="navbar-item">
          <b-icon class="is-success" icon="mic"></b-icon>
        </a>
      </b-tooltip><br />
      <b-tooltip label="People" position="is-right">
        <a class="navbar-item" @click="expand('people')">
          <b-icon class="" icon="people"></b-icon>
        </a>
      </b-tooltip><br />
      <b-tooltip label="Groups" position="is-right">
        <a class="navbar-item">
          <b-icon class="" icon="group_work"></b-icon>
        </a>
      </b-tooltip><br />
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
          <a><b-icon icon="book"></b-icon> Search Guides</a>
          <hr>
          <a><b-icon icon="question_answer"></b-icon> Chat with Support</a>
          <hr>
          <a href="https://app.craft.io/share/ECB3A0152305843009665528183" target="_blank"><b-icon icon="feedback"></b-icon> Send feedback</a>
        </div>
        </div>
      </b-modal>
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
      option: null,
      help: false
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
  /*background-color: rgba(240,240,240,.95);*/
  position: relative;
  z-index: 25;
  /*align-items: center;*/
  /*justify-content: center;*/
  transition: width 0.8s;
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
  width: 100%;
}
.is-wide {
  width: 100%;
}
</style>
