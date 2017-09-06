<template>
  <div>
    <nav class="level">
      <div class="level-left">
        <h2 class="subtitle is-3 level-item">
          Manage Sessions
        </h2>
      </div>
      <div class="level-right">
        <button class="button level-item is-primary is-outlined" @click="isModalActive = true"><b-icon icon="playlist_add" size="is-small"></b-icon> &nbsp; Schedule Session</button>
        <button class="button level-item is-primary" @click="confirm"><b-icon icon="add_circle_outline" size="is-small"></b-icon> &nbsp; Start New Session</button>
      </div>
    </nav>
    <b-modal :active.sync="isModalActive" has-modal-card>
      <form action="">
        <div class="modal-card" @click.stop>
          <section class="modal-card-body">
            <p class="subtitle is-3">Schedule New Session</p>
            <b-field label="Session Title">
              <b-input icon="view_list" placeholder="e.g. Week 1" v-model="sessionName"></b-input>
            </b-field>
            <b-field label="Session Date">
              <b-datepicker
                :min-date="minDate"
                v-model="date"
                placeholder="Click to select..."
                icon="today">

                <button class="button is-primary"
                  @click="date = new Date()">
                  <b-icon icon="today"></b-icon>
                  <span>Today</span>
                </button>

                <button class="button is-danger"
                  @click="date = null">
                  <b-icon icon="clear"></b-icon>
                  <span>Clear</span>
                </button>
              </b-datepicker>
            </b-field>
            <b-field label="Session Length">
              <b-input icon="timelapse" type="number" placeholder="Default: 3 hours" v-model="sessionLength"></b-input>
            </b-field>
            <b-field label="Starting Layout">
              <b-select placeholder="Layout" icon="view_compact" v-model="layout">
                <option value="1">Video Bar</option>
                <option value="2">Full Screen</option>
                <option value="3">Split Screen</option>
                <option value="3">Lecture</option>
              </b-select>
            </b-field>
            <hr>
            <a class="button is-success">Schedule Session</a>
            <a class="button" @click="isModalActive = false">Cancel</a>
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
      minDate: null,
      sessionName: null,
      date: new Date(),
      sessionLength: null,
      layout: 1
    }
  },
  created () {
    this.setSessions()
    const today = new Date()
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0)
  },
  methods: {
    setSessions () {
      this.$store.dispatch('setSessions', sessionsRef.child(this.route.params.roomid))
    },
    confirm () {
      this.$dialog.confirm({
        message: 'Are you sure you want to start a session with your default settings now?',
        onConfirm: () => this.$toast.open('Session start confirmed')
      })
    }
  }
}
</script>

<style scoped>

</style>
