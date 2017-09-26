<template>
  <div class="tabs is-centered">
    <small class="uppercase has-text-grey" v-if="room.data">{{room.data.name}}</small>
    <p class="uppercase has-text-grey" v-else>All Rooms</p>
    <ul v-if="route.params.roomid && !route.params.sessionid">
      <!-- <router-link :to="{ name: 'Main-Classroom' }" tag="li" exact><a class="is-size-7"><b-icon icon="group_work" size="is-small"></b-icon> Room</a></router-link>
      <router-link :to="{ name: 'Main-Chat' }" tag="li" exact><a class="is-size-7"><b-icon icon="question_answer" size="is-small"></b-icon> Chat</a></router-link> -->
      <router-link :to="{ name: 'Dashboard-Sessions' }" tag="li"><a class="is-size-7"><b-icon icon="dashboard" size="is-small"></b-icon> Dashboard</a></router-link>
    </ul>
    <ul v-else-if="route.params.sessionid">
      <li>
        <a class="is-size-7" @click="peopleDropdown()" :class="{'active' : isPeopleActive}"><b-icon icon="people" size="is-small"></b-icon> People</a>
      </li>
      <li>
        <a class="is-size-7" @click="chatDropdown()" :class="{'active' : isChatActive}"><b-icon icon="question_answer" size="is-small"></b-icon> Chat</a>
      </li>
      <li>
        <a class="is-size-7" @click="sessionDropdown()" :class="{'active' : isSessionActive}"><b-icon icon="view_quilt" size="is-small"></b-icon> Session</a>
      </li>
      <li>
        <a class="is-size-7"><b-icon icon="more" size="is-small"></b-icon> More</a>
      </li>
    </ul>
    <tab-dropdown :isActive="isPeopleActive">
      <people-dropdown />
    </tab-dropdown>
    <tab-dropdown :isActive="isChatActive">
      <p>Chat</p>
    </tab-dropdown>
    <tab-dropdown :isActive="isSessionActive">
      <p>Session</p>
    </tab-dropdown>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import tabDropdown from '@/components/navbar/TabDropdown'
import peopleDropdown from '@/components/navbar/PeopleDropdown'

export default {
  name: 'tabs',
  components: { tabDropdown, peopleDropdown },
  computed: {
    ...mapState(['room', 'route'])
  },
  data () {
    return {
      isPeopleActive: false,
      isChatActive: false,
      isSessionActive: false
    }
  },
  methods: {
    peopleDropdown () {
      this.isChatActive = false
      this.isSessionActive = false
      this.isPeopleActive = !this.isPeopleActive
    },
    chatDropdown () {
      this.isPeopleActive = false
      this.isSessionActive = false
      this.isChatActive = !this.isChatActive
    },
    sessionDropdown () {
      this.isChatActive = false
      this.isPeopleActive = false
      this.isSessionActive = !this.isSessionActive
    }
  }
}
</script>

<style scoped>
.tabs {
  margin: 0 auto;
  text-align: center;
  position: absolute;
  width: 100%;
  left: 0;
  top: 6px;
  z-index: 18;
}
.tabs ul {
  padding-top: 16px;
}
.tabs small {
  position: absolute;
  width: 100%;
  top: 0;
}
.uppercase {
  text-transform: uppercase;
  font-size: 0.7rem;
}
.tabs a:hover,
.router-link-active a,
.tabs a.active {
  color: hsl(205, 36%, 43%);
  border-bottom-color: hsl(205, 36%, 43%);
}
p.uppercase {
  margin: 12px auto;
  display: block;
}
</style>
