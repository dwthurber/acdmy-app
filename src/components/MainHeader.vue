<template>
  <div class="hero-head">
    <div class="level is-mobile">
      <div class="level-item">
        <b-dropdown position="is-bottom-left" v-model="room.data['.key']">
          <a class="has-text-grey" slot="trigger">
            <span class="is-uppercase is-size-7">{{ room.data.name }}</span>
            <b-icon icon="keyboard_arrow_down" size="is-small"></b-icon>
          </a>

          <b-dropdown-item custom>
            <p class="subtitle is-7 is-uppercase">Options</p>
          </b-dropdown-item>
          <b-dropdown-item>Rename</b-dropdown-item>
          <b-dropdown-item separator></b-dropdown-item>
          <b-dropdown-item custom>
            <p class="subtitle is-7 is-uppercase">Switch Rooms</p>
          </b-dropdown-item>
          <b-dropdown-item
            v-for="roomid in userRooms"
            :key="roomid['.key']">
            <div
              v-for="(room, index) in allRooms"
              v-if="room['.key'] == roomid['.key']"
              :key="room['.key']"
              :value="room['.key']">
              {{room.name}}
            </div>
          </b-dropdown-item>
          <b-dropdown-item separator></b-dropdown-item>
          <b-dropdown-item><b-icon icon="add_circle_outline" size="is-small" /> Add a Room</b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="level-right">
        <!-- <a class="navbar-item is-close" title="Enter Fullscreen" @click.prevent="fullscreen = true">
          <b-icon icon="fullscreen" />
        </a> -->
        <!-- <img class="level-item" src="../assets/acdmy.png" alt="Acdmy: Synchronous Online Learning Platform"> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MainHeader',
  components: {
  },
  computed: {
    ...mapState(['room', 'userRooms', 'allRooms'])
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
.hero-head {
  /*padding: 0 .5rem;*/
  margin-bottom: 1px;
}
.level {
  min-height: 2.25rem;
}
.level-item .has-text-grey {
  letter-spacing: 0.15rem;
  font-weight: 300;
}
</style>
