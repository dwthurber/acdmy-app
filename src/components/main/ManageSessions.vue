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
    <b-modal :active.sync="isModalActive" has-modal-card canCancel>
      <form action="">
        <div class="modal-card" @click.stop>
          <section class="modal-card-body">
            <p class="subtitle is-3">Schedule New Session</p>
            <hr>
            <b-field>
              <b-input icon="view_list" placeholder="Session Name" v-model="sessionName"></b-input>
            </b-field>
            <br>
            <p class="subtitle has-text-primary is-5">Details</p>
            <b-field>
              <p class="control">
                <a class="button is-static">
                  Start
                </a>
              </p>
              <b-datepicker
                :min-date="minDate"
                v-model="startDate"
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
              <b-select placeholder="Time" v-model="startTime">
                <option>12:00 am</option>
                <option>12:30 am</option>
                <option>1:00 am</option>
                <option>1:30 am</option>
                <option>2:00 am</option>
                <option>2:30 am</option>
                <option>3:00 am</option>
                <option>3:30 am</option>
                <option>4:00 am</option>
                <option>4:30 am</option>
                <option>5:00 am</option>
                <option>5:30 am</option>
                <option>6:00 am</option>
                <option>6:30 am</option>
                <option>7:00 am</option>
                <option>7:30 am</option>
                <option>8:00 am</option>
                <option>8:30 am</option>
                <option>9:00 am</option>
                <option>9:30 am</option>
                <option>10:00 am</option>
                <option>10:30 am</option>
                <option>11:00 am</option>
                <option>11:30 am</option>
                <option>12:00 pm</option>
                <option>12:30 pm</option>
                <option>1:00 pm</option>
                <option>1:30 pm</option>
                <option>2:00 pm</option>
                <option>2:30 pm</option>
                <option>3:00 pm</option>
                <option>3:30 pm</option>
                <option>4:00 pm</option>
                <option>4:30 pm</option>
                <option>5:00 pm</option>
                <option>5:30 pm</option>
                <option>6:00 pm</option>
                <option>6:30 pm</option>
                <option>7:00 pm</option>
                <option>7:30 pm</option>
                <option>8:00 pm</option>
                <option>8:30 pm</option>
                <option>9:00 pm</option>
                <option>9:30 pm</option>
                <option>10:00 pm</option>
                <option>10:30 pm</option>
                <option>11:00 pm</option>
                <option>11:30 pm</option>
              </b-select>
            </b-field>
            <b-field>
              <p class="control">
                <a class="button is-static">
                  End
                </a>
              </p>
              <b-datepicker
                :min-date="minDate"
                v-model="endDate"
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
              <b-select placeholder="Time" v-model="endTime">
                <option>12:00 am</option>
                <option>12:30 am</option>
                <option>1:00 am</option>
                <option>1:30 am</option>
                <option>2:00 am</option>
                <option>2:30 am</option>
                <option>3:00 am</option>
                <option>3:30 am</option>
                <option>4:00 am</option>
                <option>4:30 am</option>
                <option>5:00 am</option>
                <option>5:30 am</option>
                <option>6:00 am</option>
                <option>6:30 am</option>
                <option>7:00 am</option>
                <option>7:30 am</option>
                <option>8:00 am</option>
                <option>8:30 am</option>
                <option>9:00 am</option>
                <option>9:30 am</option>
                <option>10:00 am</option>
                <option>10:30 am</option>
                <option>11:00 am</option>
                <option>11:30 am</option>
                <option>12:00 pm</option>
                <option>12:30 pm</option>
                <option>1:00 pm</option>
                <option>1:30 pm</option>
                <option>2:00 pm</option>
                <option>2:30 pm</option>
                <option>3:00 pm</option>
                <option>3:30 pm</option>
                <option>4:00 pm</option>
                <option>4:30 pm</option>
                <option>5:00 pm</option>
                <option>5:30 pm</option>
                <option>6:00 pm</option>
                <option>6:30 pm</option>
                <option>7:00 pm</option>
                <option>7:30 pm</option>
                <option>8:00 pm</option>
                <option>8:30 pm</option>
                <option>9:00 pm</option>
                <option>9:30 pm</option>
                <option>10:00 pm</option>
                <option>10:30 pm</option>
                <option>11:00 pm</option>
                <option>11:30 pm</option>
              </b-select>
            </b-field>
            <br>
            <p class="subtitle has-text-primary is-5">Options</p>
            <b-field>
              <p class="control">
                <a class="button is-static">
                  Starting Layout
                </a>
              </p>
              <b-select placeholder="Layout" icon="view_compact" v-model="layout">
                <option value="1">Video Bar</option>
                <option value="2">Full Screen</option>
                <option value="3">Split Screen</option>
                <option value="3">Lecture</option>
              </b-select>
            </b-field>
            <hr>
            <a class="button is-success" @click="scheduleSession">Schedule Session</a>
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
      <b-table
        :data="sessions"
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
        :selected.sync="selected"
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
          <b-table-column field="" label="" width="85">
            <button class="button is-danger is-outlined is-small" @click="deleteSession(props.row['.key']); isDeleteRoomActive = true"><b-icon icon="delete" size="is-small"></b-icon></button>
            <router-link class="button is-primary is-outlined is-small" :to="{name: 'Session', params: {sessionid: props.row['.key']}}" append exact>
              <b-icon icon="remove_red_eye" size="is-small"></b-icon>
            </router-link>
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
import { db, sessionsRef, roomsRef } from '@/firebase'
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'Dashboard-Sessions',
  computed: {
    ...mapState(['sessions', 'route', 'rooms'])
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
      minDate: null,
      sessionName: null,
      startDate: new Date(),
      startTime: null,
      endDate: new Date(),
      endTime: null,
      layout: 1,
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
      perPage: 10
    }
  },
  created () {
    this.setSessions()
    const today = new Date()
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0)
    this.isLoading = false
  },
  methods: {
    setSessions () {
      this.$store.dispatch('setSessions', sessionsRef.child(this.route.params.roomid))
    },
    scheduleSession () {
      let roomKey = this.route.params.roomid
      let newSessionKey = sessionsRef.push().key

      const newSession = {
        name: this.sessionName,
        startDate: this.startDate,
        startTime: this.startTime,
        endDate: this.endDate,
        endTime: this.endTime,
        layout: this.layout
      }
      let updates = {}
      updates['/sessions/' + roomKey + '/' + newSessionKey] = newSession
      updates['/rooms/' + roomKey + '/sessions/' + newSessionKey] = true
      db.ref().update(updates)

      // add session count
      const roomsUsersRef = roomsRef.child(roomKey).child('users').child('/')
      roomsUsersRef.once('value', function (snap) {
        snap.forEach(function (childSnapshot) {
          const userKey = childSnapshot.key
          let updates = {}
          updates['/users/' + userKey + '/rooms/' + roomKey + '/sessions/' + newSessionKey] = true
          db.ref().update(updates)
        })
      })

      this.isModalActive = false
      this.$toast.open('Session scheduled')
    },
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
          const roomsUsersRef = roomsRef.child(roomKey).child('users').child('/')
          roomsUsersRef.once('value', function (snap) {
            snap.forEach(function (childSnapshot) {
              const userKey = childSnapshot.key
              let updates = {}
              updates['/users/' + userKey + '/rooms/' + roomKey + '/sessions/' + key] = null
              db.ref().update(updates)
            })
          })
          // then remove room and associated nodes
          sessionsRef.child(roomKey).child(key).remove()
          roomsRef.child(roomKey).child('sessions').child(key).remove()
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
