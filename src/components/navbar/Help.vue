<template>
  <b-dropdown class="is-marginless" position="is-bottom-left">
    <a class="navbar-item is-close" slot="trigger" title="help">
      <b-icon icon="help" size="is-small"></b-icon>
    </a>

      <a class="dropdown-item"><b-icon icon="book"></b-icon> Search Guides</a>
      <hr class="dropdown-divider">
      <a class="dropdown-item"><b-icon icon="question_answer"></b-icon> Chat with Support</a>
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
.is-close {
  padding-left: 8px!important;
  padding-right: 8px!important;
}
</style>
