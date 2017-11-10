<template>
  <div id="freeform" class="box">

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LayoutFreeform',
  computed: {
    ...mapState([
      'user',
      'room'
    ])
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
#freeform {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
