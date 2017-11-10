<template>
  <b-dropdown
    class="is-marginless has-text-left is-right-bottom"
    v-model="route.path">
    <a
      class="navbar-item is-close"
      slot="trigger"
      title="layout">
      <template v-if="route.path == '/videobar'">
        <b-icon
          icon="view_compact"
          :class="{'is-small': fullscreen}" />
      </template>
      <template v-else-if="route.path == '/splitscreen'">
        <b-icon
          icon="view_quilt"
          :class="{'is-small': fullscreen}" />
      </template>
      <template v-else-if="route.path == '/presentation'">
        <b-icon
          icon="picture_in_picture_alt"
          :class="{'is-small': fullscreen}" />
      </template>
      <template v-else-if="route.path == '/fullscreen'">
        <b-icon
          icon="view_comfy"
          :class="{'is-small': fullscreen}" />
      </template>
      <template v-else-if="route.path == '/groups'">
        <b-icon
          icon="group_work"
          :class="{'is-small': fullscreen}" />
      </template>
      <template v-else>
        <b-icon
          icon="group_work"
          :class="{'is-small': fullscreen}" />
      </template>

      <!-- <p class="is-size-8 is-uppercase">
        People
      </p> -->
    </a>

    <b-dropdown-item value="/" href="#/">
      <b-icon icon="group_work" />
      Freeform
    </b-dropdown-item>
    <b-dropdown-item value="/videobar" href="#/videobar">
      <b-icon icon="view_compact" />
      Videobar
    </b-dropdown-item>
    <b-dropdown-item value="/splitscreen" href="#/splitscreen">
      <b-icon icon="view_quilt" />
      Splitscreen
    </b-dropdown-item>
    <b-dropdown-item value="/presentation" href="#/presentation">
      <b-icon icon="picture_in_picture_alt" />
      Presentation
    </b-dropdown-item>
    <b-dropdown-item value="/fullscreen" href="#/fullscreen">
      <b-icon icon="view_comfy" />
      Fullscreen
    </b-dropdown-item>
    <b-dropdown-item value="/groups" href="#/groups">
      <b-icon icon="view_module" />
      Breakout Groups
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SidebarLayout',
  props: {
    fullscreen: Boolean
  },
  computed: {
    ...mapState(['route'])
  }
}
</script>

<style scoped>

</style>
