<template>
  <b-dropdown disabled
    class="is-marginless has-text-left is-right-top">
    <a
      class="navbar-item is-close"
      slot="trigger"
      title="activities">
      <b-icon
        icon="view_carousel"
        :class="{'is-small': fullscreen}" />
      <!-- <p class="is-size-8 is-uppercase">
        People
      </p> -->
    </a>

    <b-dropdown-item value="think-pair-share" disabled>
      <b-icon icon="supervisor_account" size="is-small" />
      Think-Pair-Share
    </b-dropdown-item>
    <b-dropdown-item value="jigsaw" disabled>
      <b-icon icon="extension" size="is-small" />
      Jigsaw
    </b-dropdown-item>
    <b-dropdown-item value="debate" disabled>
      <b-icon icon="star_half" size="is-small" />
      Debate
    </b-dropdown-item>
    <b-dropdown-item separator></b-dropdown-item>
    <b-dropdown-item disabled>
      <b-icon icon="add_circle_outline" size="is-small" />
      Custom
    </b-dropdown-item>
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
