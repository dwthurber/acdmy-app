<template>
  <form action="">
    <div class="modal-card" @click.stop>
      <section class="modal-card-body">
        <p class="subtitle is-3">
          Schedule New Session
        </p>
        <hr>
        <b-field>
          <b-input
            icon="view_list"
            placeholder="Session Name"
            v-model="sessionName">
          </b-input>
        </b-field>
        <br>
        <p class="subtitle has-text-primary is-5">
          Details
        </p>
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
            icon="today"
            :readonly="false">
            <button
              class="button is-primary"
              @click="date = new Date()">
              <b-icon icon="today" />
              <span>Today</span>
            </button>
            <button
              class="button is-danger"
              @click="startDate = null">
              <b-icon icon="clear" />
              <span>Clear</span>
            </button>
          </b-datepicker>
          <b-select
            placeholder="Time"
            v-model="startTime">
            <option value="0">12:00 am</option>
            <option value="1">1:00 am</option>
            <option value="2">2:00 am</option>
            <option value="3">3:00 am</option>
            <option value="4">4:00 am</option>
            <option value="5">5:00 am</option>
            <option value="6">6:00 am</option>
            <option value="7">7:00 am</option>
            <option value="8">8:00 am</option>
            <option value="9">9:00 am</option>
            <option value="10">10:00 am</option>
            <option value="11">11:00 am</option>
            <option value="12">12:00 pm</option>
            <option value="13">1:00 pm</option>
            <option value="14">2:00 pm</option>
            <option value="15">3:00 pm</option>
            <option value="16">4:00 pm</option>
            <option value="17">5:00 pm</option>
            <option value="18">6:00 pm</option>
            <option value="19">7:00 pm</option>
            <option value="20">8:00 pm</option>
            <option value="21">9:00 pm</option>
            <option value="22">10:00 pm</option>
            <option value="23">11:00 pm</option>
          </b-select>
        </b-field>
        <b-field>
          <p class="control">
            <a class="button is-static">
              End
            </a>
          </p>
          <b-datepicker
            :min-date="startDate"
            v-model="endDate"
            placeholder="Click to select..."
            icon="today"
            :readonly="false">
            <button class="button is-danger"
              @click="endDate = null">
              <b-icon icon="clear" />
              <span>Clear</span>
            </button>
          </b-datepicker>
          <b-select
            placeholder="Time"
            v-model="endTime">
            <option value="0">12:00 am</option>
            <option value="1">1:00 am</option>
            <option value="2">2:00 am</option>
            <option value="3">3:00 am</option>
            <option value="4">4:00 am</option>
            <option value="5">5:00 am</option>
            <option value="6">6:00 am</option>
            <option value="7">7:00 am</option>
            <option value="8">8:00 am</option>
            <option value="9">9:00 am</option>
            <option value="10">10:00 am</option>
            <option value="11">11:00 am</option>
            <option value="12">12:00 pm</option>
            <option value="13">1:00 pm</option>
            <option value="14">2:00 pm</option>
            <option value="15">3:00 pm</option>
            <option value="16">4:00 pm</option>
            <option value="17">5:00 pm</option>
            <option value="18">6:00 pm</option>
            <option value="19">7:00 pm</option>
            <option value="20">8:00 pm</option>
            <option value="21">9:00 pm</option>
            <option value="22">10:00 pm</option>
            <option value="23">11:00 pm</option>
          </b-select>
        </b-field>
        <br>
        <span class="subtitle has-text-primary is-5">
          Options
        </span>
        <a class="has-text-warning" href="#">
          <b-icon icon="help_outline" size="is-small" />
        </a>
        <br />
        <br />
        <b-field>
          <p class="control">
            <a class="button is-static">
              Starting Layout
            </a>
          </p>
          <b-select
            placeholder="Layout"
            icon="view_compact"
            v-model="layout">
            <option value="1">Video Bar</option>
            <option value="2">Full Screen</option>
            <option value="3">Split Screen</option>
            <option value="3">Lecture</option>
          </b-select>
        </b-field>
        <hr>
        <a
          class="button is-primary"
          @click="scheduleSession"
          :class="{'is-loading': saving}">
          Schedule Session
        </a>
        <a class="button" @click="$parent.close()">Cancel</a>
      </section>
    </div>
  </form>
</template>

<script>
import { db, sessionsRef } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'ScheduleSessionModal',
  computed: {
    ...mapState([
      'route',
      'room'
    ])
  },
  data () {
    return {
      minDate: null,
      sessionName: null,
      startDate: null,
      startTime: null,
      endDate: new Date(),
      endTime: null,
      layout: 1,
      saving: false
    }
  },
  created () {
    const today = new Date()
    this.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0)
  },
  methods: {
    scheduleSession () {
      let snackbar = this.$snackbar
      this.isInvalid = false
      let roomKey = this.route.params.roomid
      let newSessionKey = sessionsRef.push().key
      let startDate = this.startDate
      let endDate = this.endDate
      let startTime = Number(this.startTime)
      let endTime = Number(this.endTime)

      if (this.sessionName && this.startDate && this.startTime && this.endDate && this.endTime) {
        var start = startDate
        start.setHours(startTime + 0, 0, 0)
        var end = endDate
        end.setHours(endTime + 0, 0, 0)

        const newSession = {
          name: this.sessionName,
          start: start,
          end: end,
          layout: this.layout
        }

        if (end > start) {
          let updates = {}
          updates['/sessions/' + roomKey + '/' + newSessionKey] = newSession

          if (this.room.sessions.length) {
            updates['/rooms/' + roomKey + '/sessions'] = this.room.sessions.length + 1
          } else {
            updates['/rooms/' + roomKey + '/sessions'] = 1
          }
          db.ref().update(updates)

          this.$parent.close()
          this.$toast.open('Session scheduled')
        } else {
          snackbar.open({
            duration: 10000,
            message: 'Cool! Looks like you are trying to time travel! Sadly, our sessions cannot end before they start.',
            type: 'is-danger',
            position: 'is-bottom-right',
            actionText: 'dismiss'
          })
        }
      } else {
        snackbar.open({
          duration: 10000,
          message: 'Our computer brain has not learned to read minds (YET!) so please fill out all fields.',
          type: 'is-danger',
          position: 'is-bottom-right',
          actionText: 'dismiss'
        })
      }
      this.saving = false
    }
  }
}
</script>

<style scoped>
a.has-text-warning {
  position: relative;
  bottom: 5px;
  right: 3px;
}
</style>
