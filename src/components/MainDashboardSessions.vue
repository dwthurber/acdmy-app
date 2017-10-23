<template>
  <div>
    <nav class="level">
      <div class="level-left">
        <h2 class="subtitle is-3 level-item">
          Sessions
        </h2>
      </div>
      <div
        class="level-right"
        v-show="room.user.role == 'Instructor'">
        <button
          class="button level-item is-primary is-outlined"
          @click="confirm">
          <b-icon icon="add_circle_outline" size="is-small" />
          &nbsp; Start New Session
        </button>
        <button
          class="button level-item is-primary"
          @click="isModalActive = true">
          <b-icon icon="add_to_queue" size="is-small" />
          &nbsp; Schedule Session
        </button>
      </div>
    </nav>
    <b-modal
      :active.sync="isModalActive"
      has-modal-card
      canCancel>
      <ScheduleSessionModal />
    </b-modal>
    <div class="box">
      <section
        class="hero has-text-centered"
        v-if="room.sessions.length == 0">
        <div class="hero-body">
          <b-icon icon="remove_from_queue" type="has-text-grey" size="is-large" />
          <br /><br />
          <h1 class="title has-text-grey">
            No Upcoming Sessions
          </h1>
          <h2 class="subtitle has-text-grey">
            Schedule one above
          </h2>
        </div>
      </section>
      <b-table
        v-else
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
        default-sort="start"
        :default-sort-direction="defaultSortDirection"
        :isDetailed="isDetailed"
        :checked-rows.sync="checkedRows">

        <template slot-scope="props">
          <b-table-column
            field="name"
            label="Name"
            sortable>
            {{ props.row.name }}
          </b-table-column>
          <b-table-column
            field="start"
            label="When"
            sortable>
            {{ props.row.start | formatDate }}
          </b-table-column>
          <!-- <b-table-column field="endDate" label="End" sortable>
            {{ props.row.endDate | formatDate }} at {{ props.row.endTime }}
          </b-table-column> -->
          <b-table-column
            field=""
            label=""
            v-if="room.user.role == 'Instructor'"
            centered>
            <router-link
              class="button is-success is-outlined is-small"
              :to="{name: 'Session', params: {sessionid: props.row['.key']}}"
              append
              exact>
              Start Session
            </router-link>
          </b-table-column>
          <b-table-column
            field=""
            label=""
            width="50"
            v-if="room.user.role == 'Instructor'"
            centered>
            <a @click="deleteSession(props.row['.key'])">
              <b-icon icon="delete" size="is-small" type="is-danger" />
            </a>
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
import ScheduleSessionModal from '@/components/TheScheduleSessionModal'

export default {
  name: 'MainDashboardSessions',
  components: {
    ScheduleSessionModal
  },
  computed: {
    ...mapState([
      'room',
      'route',
      'rooms'
    ])
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
      defaultSortDirection: 'desc',
      perPage: 10,
      now: new Date()
    }
  },
  created () {
    this.isLoading = false
  },
  filters: {
    formatDate: function (value) {
      if (value) {
        return moment(String(value)).calendar()
      }
    },
    formatFromNow: function (value) {
      if (value) {
        return moment(String(value)).fromNow()
      }
    }
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
