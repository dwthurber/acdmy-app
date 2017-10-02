<template>
  <div class="tabs nav-tabs is-centered">
    <small class="uppercase has-text-grey" v-if="room.data">{{room.data.name}}</small>
    <p class="uppercase has-text-grey" v-else>All Rooms</p>
    <ul v-if="route.params.roomid && !route.params.sessionid">
      <router-link :to="{ name: 'Main-Classroom' }" tag="li"><a class="is-size-7"><b-icon icon="group_work" size="is-small"></b-icon> Room</a></router-link>
      <router-link :to="{ name: 'Main-Chat' }" tag="li"><a class="is-size-7"><b-icon icon="question_answer" size="is-small"></b-icon> Chat</a></router-link>
      <router-link :to="{ name: 'Dashboard-Sessions' }" tag="li"><a class="is-size-7"><b-icon icon="dashboard" size="is-small"></b-icon> Dashboard</a></router-link>
    </ul>
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
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.nav-tabs {
  margin: 0 auto;
  text-align: center;
  position: absolute;
  width: 100%;
  left: 0;
  top: 6px;
  z-index: 18;
}
.nav-tabs ul {
  padding-top: 16px;
}
.nav-tabs small {
  position: absolute;
  width: 100%;
  top: 0;
}
.uppercase {
  text-transform: uppercase;
  font-size: 0.7rem;
}
.nav-tabs a:hover,
.router-link-active a,
.nav-tabs a.active {
  color: hsl(205, 36%, 43%);
  border-bottom-color: hsl(205, 36%, 43%);
}
p.uppercase {
  margin: 12px auto;
  display: block;
}
</style>
