<template>
  <div>
    <nav class="level">
      <div class="level-left">
        <!-- <img class="level-item image is-circle-image is-38x38" :src="user.photoURL"> -->
        <p class="level-item subtitle is-5">
          <span>{{ user.displayName }}</span>
        </p>
      </div>
    </nav>
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

</style>
