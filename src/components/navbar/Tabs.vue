<template>
  <div class="tabs is-centered">
    <small class="uppercase" v-if="currentRoom">{{currentRoom.name}}</small>
    <ul v-if="route.params.roomid">
      <router-link :to="{ name: 'Main-Classroom' }" tag="li" exact><a class="is-size-7"><b-icon icon="group_work" size="is-small"></b-icon> Room</a></router-link>
      <router-link :to="{ name: 'Main-Chat' }" tag="li" exact><a class="is-size-7"><b-icon icon="question_answer" size="is-small"></b-icon> Chat</a></router-link>
      <router-link :to="{ name: 'Dashboard-Sessions' }" tag="li"><a class="is-size-7"><b-icon icon="dashboard" size="is-small"></b-icon> Dashboard</a></router-link>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'tabs',
  computed: {
    ...mapState(['currentRoom', 'route'])
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.tabs ul {
  padding-top: 16px;
  border-bottom: none;
  position: relative;
}
.tabs small {
  position: absolute;
  width: 100%;
  top: 4px;
  text-align: center;
}
.uppercase {
  text-transform: uppercase;
  font-size: 0.7rem;
}
.tabs a:hover,
.router-link-active a {
  color: hsl(205, 36%, 43%);
}
</style>
