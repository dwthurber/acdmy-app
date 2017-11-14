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
    <!-- <b-dropdown-item custom>
      <p class="subtitle is-7 is-uppercase">Freeform</p>
    </b-dropdown-item> -->
    <b-dropdown-item value="/" href="#/">
      <b-icon icon="group_work" size="is-small" />
      Freeform
    </b-dropdown-item>
    <b-dropdown-item separator></b-dropdown-item>
    <b-dropdown-item custom>
      <p class="subtitle is-7 is-uppercase">Session Layouts</p>
    </b-dropdown-item>
    <b-dropdown-item value="/videobar" href="#/videobar">
      <b-icon icon="view_compact" size="is-small" />
      Videobar
    </b-dropdown-item>
    <b-dropdown-item value="/fullscreen" href="#/fullscreen">
      <b-icon icon="view_comfy" size="is-small" />
      Fullscreen
    </b-dropdown-item>
    <b-dropdown-item value="/splitscreen" href="#/splitscreen" disabled>
      <b-icon icon="view_quilt" size="is-small" />
      Splitscreen
    </b-dropdown-item>
    <b-dropdown-item value="/presentation" href="#/presentation" disabled>
      <b-icon icon="picture_in_picture_alt" size="is-small" />
      Presentation
    </b-dropdown-item>
    <b-dropdown-item value="/groups" href="#/groups" disabled>
      <b-icon icon="view_module" size="is-small" />
      Breakout Groups
    </b-dropdown-item>
    <b-dropdown-item separator></b-dropdown-item>
    <b-dropdown-item disabled>
      <b-icon icon="add_circle_outline" size="is-small" />
      Add Custom
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
