<template>
  <b-dropdown class="is-marginless" position="is-bottom-left">
    <a class="navbar-item is-close" slot="trigger" title="notifications">
      <b-icon icon="notifications" size="is-small"></b-icon>
    </a>

      <div custom class="dropdown-item has-text-centered" v-if="!notifications">All up to date!</div>
  </b-dropdown>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'notifications',
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
.is-close {
  padding-left: 8px!important;
  padding-right: 8px!important;
}
</style>
