<template>
  <b-dropdown
    class="is-marginless has-text-left is-right-top">
    <a
      class="navbar-item is-close"
      slot="trigger"
      title="help">
      <b-icon icon="help" size="is-small" type="is-grey" />
    </a>

    <b-dropdown-item>
      <b-icon icon="book" />
      Search Guides
    </b-dropdown-item>
    <b-dropdown-item separator />
    <b-dropdown-item>
      <b-icon icon="question_answer" />
      Chat with Support
    </b-dropdown-item>
    <b-dropdown-item separator />
    <b-dropdown-item
      href="https://app.craft.io/share/ECB3A0152305843009665528183"
      target="_blank"
      class="dropdown-item">
      <b-icon icon="feedback" />
      Send feedback
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'SidebarHelp'
}
</script>

<style scoped>

</style>
