<template>
  <b-dropdown
    class="is-marginless has-text-left is-right-top">
    <a
      class="navbar-item is-close"
      slot="trigger"
      title="more">
      <b-icon
        icon="more"
        :class="{'is-small': fullscreen}" />
      <!-- <p class="is-size-8 is-uppercase">
        People
      </p> -->
    </a>
    <b-dropdown-item disabled v-if="room.user.role != 'Student'">
      <b-icon icon="library_books" size="is-small"></b-icon>
      Session planner
    </b-dropdown-item>
    <b-dropdown-item disabled>
      <b-icon icon="multiline_chart" size="is-small"></b-icon>
      Analytics
    </b-dropdown-item>
    <b-dropdown-item disabled>
      <b-icon icon="video_library" size="is-small"></b-icon>
      Recordings
    </b-dropdown-item>
    <b-dropdown-item disabled v-if="room.user.role != 'Student'">
      <b-icon icon="folder" size="is-small"></b-icon>
      Assets
    </b-dropdown-item>
    <b-dropdown-item separator v-if="room.data.owner == user.uid || room.user.role != 'Student'"></b-dropdown-item>
    <b-dropdown-item custom v-if="room.data.owner == user.uid || room.user.role != 'Student'">
      <p class="subtitle is-7 is-uppercase">Options</p>
    </b-dropdown-item>
    <b-dropdown-item disabled v-if="room.user.role != 'Student'">
      <b-icon icon="done_all" size="is-small"></b-icon>
      Show Engagement
    </b-dropdown-item>
    <b-dropdown-item v-if="room.data.owner == user.uid">
      <b-icon icon="settings" size="is-small"></b-icon>
      Room Settings
    </b-dropdown-item>
    <b-dropdown-item separator></b-dropdown-item>
    <b-dropdown-item custom>
      <p class="title is-6"><a href="https://acdmy.io" target="_blank"> Acdmy.io </a> <small class="has-text-grey">v0.1.0</small></p>
      <p class="subtitle is-7">
        <a href="">Privacy Policy</a> | <a href="">Accessibility</a>
      </p>
      <!-- <p class="subtitle is-7">&copy; 2017 | All Rights Reserved</p> -->
    </b-dropdown-item>

  </b-dropdown>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SidebarMore',
  computed: {
    ...mapState([
      'user',
      'room'
    ])
  },
  props: {
    fullscreen: Boolean
  }
}
</script>

<style scoped>

</style>
