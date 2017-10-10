<template>
  <b-dropdown
    class="is-marginless"
    position="is-bottom-left">
    <a
      class="navbar-item is-close"
      slot="trigger"
      title="notifications">
      <b-icon icon="notifications" size="is-small" type="is-grey" />
    </a>

    <div
      class="dropdown-item has-text-centered"
      v-if="!notifications"
      custom >
      All up to date!
    </div>
  </b-dropdown>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavbarNotifications',
  computed: {
    ...mapState([])
  },
  data () {
    return {
      notifications: false
    }
  }
}
</script>

<style scoped>

</style>
