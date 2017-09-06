<template>
  <div>
    <nav class="level">
      <div class="level-left">
        <h2 class="subtitle is-3 level-item">
          Manage Sessions
        </h2>
      </div>
      <div class="level-right">
        <button class="button level-item is-primary is-outlined" @click="isModalActive = true"><b-icon icon="playlist_add" size="is-small"></b-icon> &nbsp; Add Session</button>
      </div>
    </nav>
    <b-modal :active.sync="isModalActive" has-modal-card>
      <form action="">
        <div class="modal-card" @click.stop>
          <section class="modal-card-body">
            <p class="subtitle is-4">Add Session</p>
            <b-field>
                <b-input icon="person" placeholder="Session Name" v-model="sessionName"></b-input>
            </b-field>
            <template>
              <b-field label="Select a date">
                <b-datepicker
                  placeholder="Click to select..."
                  icon="today">
                </b-datepicker>
              </b-field>
            </template>
            <a class="button is-success">Save changes</a>
            <a class="button" @click="$parent.close()">Cancel</a>
          </section>
        </div>
      </form>
    </b-modal>
    <div class="box">
      <p class="subtitle is-uppercase is-7 has-text-grey">Upcoming Sessions</p>
      <section class="hero has-text-centered" v-if="sessions.length == 0">
        <div class="hero-body">
          <h1 class="title has-text-grey">
            No Upcoming Sessions
          </h1>
          <h2 class="subtitle has-text-grey">
            Schedule one above
          </h2>
        </div>
      </section>
    </div>
    <div class="box">
      <p class="subtitle is-uppercase is-7 has-text-grey">All Sessions</p>
    </div>
  </div>
</template>

<script>
import { sessionsRef } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'Dashboard-Sessions',
  computed: {
    ...mapState(['sessions', 'route'])
  },
  data () {
    return {
      isModalActive: false,
      sessionName: null
    }
  },
  created () {
    this.setSessions()
  },
  methods: {
    setSessions () {
      this.$store.dispatch('setSessions', sessionsRef.child(this.route.params.roomid))
    }
  }
}
</script>

<style scoped>

</style>
