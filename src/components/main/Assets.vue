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
import uploadcare from 'uploadcare-widget'

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
      uploadcare.openDialog(null, {
        imagesOnly: false,
        multiple: true
      }).done(function (file) {
        file.promise().done(function (fileInfo) {
          console.log(fileInfo.cdnUrl)
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
