<template>
  <div>
    <nav class="level">
      <div class="level-left">
        <h2 class="subtitle is-3 level-item">
          Manage Sessions
        </h2>
      </div>
      <div class="level-right" v-show="room.user.role == 'Instructor'">
        <button class="button level-item is-primary is-outlined" @click="confirm"><b-icon icon="add_circle_outline" size="is-small"></b-icon> &nbsp; Start New Session</button>
        <button class="button level-item is-primary" @click="isModalActive = true"><b-icon icon="add_to_queue" size="is-small"></b-icon> &nbsp; Schedule Session</button>
      </div>
    </nav>
    <b-modal :active.sync="isModalActive" has-modal-card canCancel>
      <ScheduleSession />
    </b-modal>
    <div class="box">
      <p class="subtitle is-uppercase is-7 has-text-grey">Upcoming Sessions</p>
      <section class="hero has-text-centered" v-if="room.sessions.length == 0">
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
      <b-table
        :data="room.sessions"
        :bordered="isBordered"
        :striped="isStriped"
        :narrowed="isNarrowed"
        :checkable="isCheckable"
        :loading="isLoading"
        :mobile-cards="hasMobileCards"
        :paginated="isPaginated"
        :per-page="perPage"
        :pagination-simple="isPaginationSimple"
        default-sort="startDate"
        :isDetailed="isDetailed"
        :checked-rows.sync="checkedRows">

        <template scope="props">
          <b-table-column field="name" label="Name" sortable>
            {{ props.row.name }}
          </b-table-column>
          <b-table-column field="startDate" label="When" sortable>
            {{ props.row.startDate | formatDate }}
          </b-table-column>
          <!-- <b-table-column field="endDate" label="End" sortable>
            {{ props.row.endDate | formatDate }} at {{ props.row.endTime }}
          </b-table-column> -->
          <b-table-column field="" label="" v-if="room.user.role == 'Instructor'" centered>
            <router-link class="button is-primary is-outlined is-small" :to="{name: 'Session', params: {sessionid: props.row['.key']}}" append exact>
              Start Session
            </router-link>
          </b-table-column>
          <b-table-column field="" label="More" width="50" v-if="room.user.role == 'Instructor'" centered>
            <a @click="deleteSession(props.row['.key'])"><b-icon icon="delete" size="is-small" type="is-danger"></b-icon></a>
          </b-table-column>
        </template>
        <div slot="empty" class="has-text-centered">
          No Sessions
        </div>
      </b-table>
    </div>
  </div>
</template>

<script>
import { db, sessionsRef } from '@/firebase'
import { mapState } from 'vuex'
import moment from 'moment'
import ScheduleSession from '@/components/main/ScheduleSession'

export default {
  name: 'Dashboard-Sessions',
  components: {ScheduleSession},
  computed: {
    ...mapState(['room', 'route', 'rooms'])
  },
  filters: {
    formatDate: function (value) {
      if (value) {
        return moment(String(value)).calendar()
      }
    }
  },
  data () {
    return {
      isModalActive: false,
      checkedRows: [],
      selected: {},
      isBordered: false,
      isStriped: true,
      isNarrowed: false,
      isCheckable: false,
      isEmpty: false,
      isLoading: true,
      isDetailed: true,
      hasMobileCards: true,
      isPaginated: false,
      isPaginationSimple: true,
      perPage: 10,
      now: new Date()
    }
  },
  created () {
    this.isLoading = false
  },
  methods: {
    confirm () {
      this.$dialog.confirm({
        message: 'Are you sure you want to start a session with your default settings now?',
        onConfirm: () => this.$toast.open('Session start confirmed')
      })
    },
    deleteSession: function (key) {
      const toast = this.$toast
      // const uid = this.user.uid
      this.$dialog.confirm({
        title: 'Deleting Session',
        message: 'Are you sure you want to <strong>delete</strong> this session? This action cannot be undone.',
        confirmText: 'Delete Session',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          let roomKey = this.route.params.roomid
          var count = this.room.sessions.length - 1
          console.log(count)
          sessionsRef.child(roomKey).child(key).remove()

          let updates = {}
          updates['/rooms/' + roomKey + '/sessions'] = count
          db.ref().update(updates)
          toast.open('Session removed')
        }
      })
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .level-right .button {
    margin: 8px auto;
  }
}
</style>
