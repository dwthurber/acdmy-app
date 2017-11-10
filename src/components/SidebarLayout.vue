<template>
  <b-dropdown
    class="is-marginless has-text-left is-right-bottom">
    <a
      class="navbar-item is-close"
      slot="trigger"
      title="layout">
      <b-icon icon="group_work" />
      <!-- <p class="is-size-8 is-uppercase">
        People
      </p> -->
    </a>

    <b-dropdown-item>
      <b-icon icon="group_work" />
      Freeform
    </b-dropdown-item>
    <b-dropdown-item>
      <b-icon icon="view_compact" />
      Videobar
    </b-dropdown-item>
    <b-dropdown-item>
      <b-icon icon="view_quilt" />
      Splitscreen
    </b-dropdown-item>
    <b-dropdown-item>
      <b-icon icon="picture_in_picture_alt" />
      Presentation
    </b-dropdown-item>
    <b-dropdown-item>
      <b-icon icon="view_comfy" />
      Fullscreen
    </b-dropdown-item>
    <b-dropdown-item>
      <b-icon icon="view_module" />
      Breakout Groups
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'SidebarLayout'
}
</script>

<style scoped>

</style>
