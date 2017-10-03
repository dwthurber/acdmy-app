<template>
  <div>
    <nav class="level">
      <div class="level-left">
        <h2 class="subtitle is-3 level-item">
          Manage Assets
        </h2>
      </div>
      <div class="level-right" v-show="room.user.role == 'Instructor'">
        <button class="button level-item is-primary is-outlined" @click="upload()"><b-icon icon="library_add" size="is-small"></b-icon> &nbsp; Add Assets</button>
      </div>
    </nav>
    <div class="box">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { client } from '@/filestack'

export default {
  name: 'Dashboard-Assets',
  computed: {
    ...mapState(['room'])
  },
  data () {
    return {
    }
  },
  methods: {
    upload () {
      client.pick({
        maxFiles: 5,
        imageMax: [1024, 1024]
      }).then(function (result) {
        console.log(JSON.stringify(result.filesUploaded))
      })
    }
  }
}
</script>

<style scoped>

</style>
