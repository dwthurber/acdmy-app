<template>
  <b-dropdown
    class="is-marginless has-text-left is-right-top"
    v-model="room.data.layout">
    <a
      class="navbar-item is-close"
      slot="trigger"
      title="layout">
      <template v-if="room.data.layout == 'videobar'">
        <b-icon
          icon="view_compact"
          :class="{'is-small': fullscreen}" />
      </template>
      <template v-else-if="room.data.layout == 'splitscreen'">
        <b-icon
          icon="view_quilt"
          :class="{'is-small': fullscreen}" />
      </template>
      <template v-else-if="room.data.layout == 'presentation'">
        <b-icon
          icon="picture_in_picture_alt"
          :class="{'is-small': fullscreen}" />
      </template>
      <template v-else-if="room.data.layout == 'fullscreen'">
        <b-icon
          icon="view_comfy"
          :class="{'is-small': fullscreen}" />
      </template>
      <template v-else-if="room.data.layout == 'groups'">
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
    <b-dropdown-item @click="updateLayout('freeform')" value="freeform">
      <b-icon icon="group_work" />
      Freeform
    </b-dropdown-item>
    <b-dropdown-item separator></b-dropdown-item>
    <b-dropdown-item custom>
      <p class="subtitle is-7 is-uppercase">Session Layouts</p>
    </b-dropdown-item>
    <b-dropdown-item @click="updateLayout('videobar')" value="videobar">
      <b-icon icon="view_compact" />
      Videobar
    </b-dropdown-item>
    <b-dropdown-item @click="updateLayout('fullscreen')" value="fullscreen">
      <b-icon icon="view_comfy" />
      Fullscreen
    </b-dropdown-item>
    <b-dropdown-item value="/splitscreen" disabled>
      <b-icon icon="view_quilt" />
      Splitscreen
    </b-dropdown-item>
    <b-dropdown-item value="/presentation" disabled>
      <b-icon icon="picture_in_picture_alt" />
      Presentation
    </b-dropdown-item>
    <b-dropdown-item value="/groups" disabled>
      <b-icon icon="view_module" />
      Breakout Groups
    </b-dropdown-item>
    <!-- <b-dropdown-item separator></b-dropdown-item>
    <b-dropdown-item disabled>
      <b-icon icon="add_circle_outline" size="is-small" />
      Add Custom
    </b-dropdown-item> -->
  </b-dropdown>
</template>

<script>
import { mapState } from 'vuex'
import { db } from '@/firebase'

export default {
  name: 'SidebarLayout',
  props: {
    fullscreen: Boolean
  },
  computed: {
    ...mapState(['room'])
  },
  methods: {
    updateLayout (val) {
      let updates = {}
      updates['/rooms/' + this.room.data.id + '/layout'] = val
      db.ref().update(updates)
    }
  }
}
</script>

<style scoped>

</style>
