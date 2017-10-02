<template>
  <div>
    <b-field>
      <b-select placeholder="Video Source" icon="videocam" expanded>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </b-select>
    </b-field>
    <b-field>
      <b-select placeholder="Audio Input Source" icon="mic" expanded>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </b-select>
    </b-field>
    <b-field>
      <b-select placeholder="Audio Output Source" icon="volume_up" expanded>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </b-select>
    </b-field>
    <hr>
    <button class="button is-danger is-wide">End Session</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'sidebar-account',
  components: {
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.is-wide {
  width: 100%;
}
</style>
