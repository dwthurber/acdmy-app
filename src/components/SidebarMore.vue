<template>
  <b-dropdown
    class="is-marginless has-text-left is-right-bottom">
    <a
      class="navbar-item is-close"
      slot="trigger"
      title="more">
      <b-icon icon="more" />
      <!-- <p class="is-size-8 is-uppercase">
        People
      </p> -->
    </a>
    <b-dropdown-item >
      Room Settings
    </b-dropdown-item>
    <b-dropdown-item separator></b-dropdown-item>
    <b-dropdown-item >
      Privacy Policy
    </b-dropdown-item>
    <b-dropdown-item custom>
      <p class="subtitle is-7"><a href="https://acdmy.io" target="_blank"> Acdmy.io </a> <small class="has-text-grey">v0.1.0</small></p>
      <!-- <p class="subtitle is-7">&copy; 2017 | All Rights Reserved</p> -->
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'SidebarMore'
}
</script>

<style scoped>

</style>
