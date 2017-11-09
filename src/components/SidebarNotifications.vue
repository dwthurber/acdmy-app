<template>
  <b-dropdown
    class="is-marginless is-right-top">
    <a
      class="navbar-item"
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
  name: 'SidebarNotifications',
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
