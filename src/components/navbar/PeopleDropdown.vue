<template>
  <!-- <div class="box"> -->

    <b-tabs v-model="activeTab">
      <b-tab-item label="People">
        <br>
        <b-table
          :data="room.people"
          :bordered="isBordered"
          :striped="isStriped"
          :narrowed="isNarrowed"
          :checkable="isCheckable"
          :loading="isLoading"
          :mobile-cards="hasMobileCards"
          :paginated="isPaginated"
          :per-page="perPage"
          :pagination-simple="isPaginationSimple"
          default-sort="name"
          :isDetailed="isDetailed"
          :checked-rows.sync="checkedRows">

          <template scope="props">
            <b-table-column field="profile_picture" label="" width="60" centered>
              <img v-if="props.row.profile_picture" class="is-circle-image image is-32x32" :src="props.row.profile_picture">
              <img v-else class="is-circle-image image is-32x32" src="../../assets/user-placeholder.png" alt="Profile Image">
            </b-table-column>
            <b-table-column field="name" label="Name" sortable>
              {{ props.row.name }}
            </b-table-column>
            <b-table-column field="role" label="Role" sortable>
              {{ props.row.role }}
            </b-table-column>
            <b-table-column field="online" label="Status" width="90" sortable>
              <span class="tag is-success" v-if="props.row.online">
                Online
              </span>
              <span class="tag is-grey" v-else>
                Offline
              </span>
            </b-table-column>
          </template>

          <div slot="empty" class="has-text-centered">
            Loading...
          </div>
        </b-table>
      </b-tab-item>

      <b-tab-item label="Groups">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque vestibulum dui vel molestie egestas.
        Nulla vulputate elementum diam quis consectetur.
        Integer pulvinar laoreet nibh non faucibus.
        Suspendisse ut cursus lectus. Donec consectetur turpis at leo ultricies rhoncus.
        Cras consequat aliquet eros nec porta.
        Nullam sit amet mollis turpis.
        Aenean vitae tortor et velit sodales faucibus.
      </b-tab-item>

    </b-tabs>
  </div>
  <!-- <div class="columns is-mobile">
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
  </div> -->
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
  /*padding: 4px 12px!important;*/
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
