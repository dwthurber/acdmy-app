<template>
  <b-dropdown class="is-marginless" position="is-bottom-left">
    <a class="navbar-item is-close" slot="trigger" title="help">
      <b-icon icon="help" size="is-small"></b-icon>
    </a>

      <a class="dropdown-item"><b-icon icon="book"></b-icon> Search Guides</a>
      <!-- <hr class="dropdown-divider"> -->
      <a class="dropdown-item"><b-icon icon="question_answer"></b-icon> Chat with Support</a>
      <!-- <hr class="dropdown-divider"> -->
      <a href="https://app.craft.io/share/ECB3A0152305843009665528183" target="_blank" class="dropdown-item"><b-icon icon="feedback"></b-icon> Send feedback</a>
  </b-dropdown>
</template>

<script>
export default {
  name: 'help',
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
