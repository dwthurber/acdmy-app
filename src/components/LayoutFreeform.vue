<template>
  <div id="freeform" class="box columns is-marginless is-mobile is-centered is-multiline">
    <div class="column is-marginless" v-for="person in room.people" :class="{'is-2':room.people.length > 8}">
      <AppFreeformAvatar :user="person" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppFreeformAvatar from '@/components/AppFreeformAvatar'

export default {
  name: 'LayoutFreeform',
  components: {
    AppFreeformAvatar
  },
  computed: {
    ...mapState([
      'user',
      'room'
    ])
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
#freeform {
  width: 100%;
}
</style>
