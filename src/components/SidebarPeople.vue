<template>
  <b-dropdown
    class="is-marginless has-text-left is-right-bottom">
    <a
      class="navbar-item is-close"
      slot="trigger"
      title="people"
      >
      <b-icon
        icon="people"
        :class="{'is-small': fullscreen}" />
      <!-- <p class="is-size-8 is-uppercase">
        People
      </p> -->
    </a>

    <b-dropdown-item custom>
      <p v-for="person in room.people">{{person.name}}</p>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SidebarPeople',
  props: {
    fullscreen: Boolean
  },
  computed: {
    ...mapState(['room'])
  }
}
</script>

<style scoped>

</style>
