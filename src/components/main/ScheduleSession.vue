<template>
  <form action="">
    <div class="modal-card" @click.stop>
      <section class="modal-card-body">
        <p class="subtitle is-3">Schedule New Session</p>
        <hr>
        <b-message type="is-danger" v-if="isInvalid">
          Please complete all fields
        </b-message>
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
        <span class="subtitle has-text-primary is-5">Options </span><a class="has-text-warning" href="#"><b-icon icon="help_outline" size="is-small"/></a>
        <br>
        <br>
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
        <a class="button is-primary" @click="scheduleSession" :class="{'is-loading': saving}">Schedule Session</a>
        <a class="button" @click="$parent.close()">Cancel</a>
      </section>
    </div>
  </form>
</template>

<script>
import { db, sessionsRef } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'ScheduleSession',
  computed: {
    ...mapState(['route', 'room'])
  },
  data () {
    return {
      minDate: null,
      sessionName: null,
      startDate: new Date(),
      startTime: null,
      endDate: new Date(),
      endTime: null,
      layout: 1,
      saving: false,
      isInvalid: false
    }
  },
  created () {
    const today = new Date(today.getDate())
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0)
  },
  methods: {
    scheduleSession () {
      this.isInvalid = false
      this.saving = true
      let roomKey = this.route.params.roomid
      let newSessionKey = sessionsRef.push().key

      if (this.sessionName && this.startDate && this.startTime && this.endDate && this.endTime) {
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

        if (this.room.sessions.length) {
          updates['/rooms/' + roomKey + '/sessions'] = this.room.sessions.length + 1
        } else {
          updates['/rooms/' + roomKey + '/sessions'] = 1
        }
        db.ref().update(updates)

        this.$parent.close()
        this.$toast.open('Session scheduled')
      } else {
        this.isInvalid = true
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
