<template>
  <div class="columns is-gapless is-marginless is-mobile">
    <div class="column is-3 vertical-scroll">
      <div v-if="people == 'students'">
        <p class="uppercase">Students</p>
        <div v-for="student in room.people" v-if="student.role == 'Student'">
          <p class="title is-6 has-text-weight-light">{{student.name}}
            <b-icon type="is-success" v-if="student.online" icon="cloud_circle" size="is-small"/>
            <b-icon type="is-light" v-else icon="cloud_circle" size="is-small"/>
          </p>
          <p class="subtitle is-7">{{student.role}}</p>
        </div>
      </div>
      <div v-else-if="people == 'instructors'">
        <p class="uppercase">Instructors</p>
        <div v-for="student in room.people" v-if="student.role == 'Instructor'">
          <p class="title is-6 has-text-weight-light">{{student.name}}
            <b-icon type="is-success" v-if="student.online" icon="cloud_circle" size="is-small"/>
            <b-icon type="is-light" v-else icon="cloud_circle" size="is-small"/>
          </p>
          <p class="subtitle is-7">{{student.role}}</p>
        </div>
      </div>
      <div v-else-if="people == 'support'">
        <p class="uppercase">Support</p>
        <div v-for="student in room.people" v-if="student.role == 'Support'">
          <p class="title is-6 has-text-weight-light">{{student.name}}
            <b-icon type="is-success" v-if="student.online" icon="cloud_circle" size="is-small"/>
            <b-icon type="is-light" v-else icon="cloud_circle" size="is-small"/>
          </p>
          <p class="subtitle is-7">{{student.role}}</p>
        </div>
      </div>
    </div>
    <div class="column is-narrow is-controls">
      <a :class="{'active': people == 'students'}" @click="people = 'students'">
        <b-icon icon="group" />
      </a>
      <a :class="{'active': people == 'instructors'}" @click="people = 'instructors'">
        <b-icon icon="supervisor_account" />
      </a>
      <a :class="{'active': people == 'support'}" @click="people = 'support'">
        <b-icon icon="person_outline" />
      </a>
    </div>
    <div class="column has-text-left">
      <nav class="level is-mobile">
        <div class="level-left">
          <p class="title is-5 level-item">Groups</p>
        </div>
        <div class="level-right">
          <button class="button is-info is-outlined is-size-7 level-item">Start Random</button>
          <button class="button is-primary is-size-7 level-item">Start Current</button>
        </div>
      </nav>
      <b-tabs expanded v-model="activeTab">
        <b-tab-item label="Pictures">
          Lorem ipsum dolor sit amet.
        </b-tab-item>

        <b-tab-item label="Music">
          Lorem <br>
          ipsum <br>
          dolor <br>
          dolor <br>
          dolor <br>
          dolor <br>
          dolor <br>
          dolor <br>
          dolor <br>
          dolor <br>
          dolor <br>
          dolor <br>
          dolor <br>
          dolor <br>
          dolor <br>
          dolor <br>
          dolor <br>
          dolor <br>
          dolor <br>
          dolor <br>
          dolor <br>
          sit <br>
          amet.
        </b-tab-item>

        <b-tab-item label="Videos">
          Nunc nec velit nec libero vestibulum eleifend.
          Curabitur pulvinar congue luctus.
          Nullam hendrerit iaculis augue vitae ornare.
          Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'peopleTab',
  computed: {
    ...mapState(['room', 'route'])
  },
  data () {
    return {
      people: 'students',
      activeTab: 0
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.column {
  padding: 4px 12px!important;
}
.is-controls {
  border-left: 1px solid hsl(205, 40%, 73%);
  border-right: 1px solid hsl(205, 40%, 73%);
  min-height: 350px;
  padding: 0!important;
}
.vertical-scroll {
  overflow-y: auto;
}
.uppercase {
  text-transform: uppercase;
  font-size: 0.7rem;
}
.level {
  margin-top: 4px;
}
p.uppercase {
  margin: 12px auto;
  display: block;
}
a.is-size-7 {
  margin-top: 8px;
}
a {
  border-bottom: none;
}
.is-controls a {
  padding: 12px 4px;
  border-left: 2px solid #fff;
}
.is-controls a.active {
  border-left-color: hsl(205, 40%, 73%);
  color: hsl(205, 40%, 73%);
}
.tab-item {
  margin-top: 12px;
}
</style>
