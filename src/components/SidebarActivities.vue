<template>
  <b-dropdown
    class="is-marginless has-text-left is-right-bottom">
    <a
      class="navbar-item is-close"
      slot="trigger"
      title="activities">
      <b-icon
        icon="extension"
        :class="{'is-small': fullscreen}" />
      <!-- <p class="is-size-8 is-uppercase">
        People
      </p> -->
    </a>

    <a class="dropdown-item">
      <b-icon icon="book" />
      Search Guides
    </a>
    <hr class="dropdown-divider">
    <a class="dropdown-item">
      <b-icon icon="question_answer" />
      Chat with Support
    </a>
    <hr class="dropdown-divider">
    <a
      href="https://app.craft.io/share/ECB3A0152305843009665528183"
      target="_blank"
      class="dropdown-item">
      <b-icon icon="feedback" />
      Send feedback
    </a>
  </b-dropdown>
</template>

<script>
export default {
  name: 'SidebarActivities',
  props: {
    fullscreen: Boolean
  }
}
</script>

<style scoped>

</style>
