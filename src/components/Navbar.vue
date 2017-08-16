<template>
  <nav class="navbar is-marginless" id="top">
    <div class="navbar-brand">
      <router-link :to="{ name: 'Main' }" class="navbar-item"><img src="../assets/acdmy.png" alt="Acdmy: Synchronous Online Learning Platform"></router-link>
      <div class="is-hidden-desktop navbar-center navbar-item is-paddingless">
        <small class="uppercase" v-if="!$route.params.roomid">My Rooms</small>
        <!-- <small class="uppercase" v-if="$route.params.roomid && currentRoom">{{currentRoom.name}}</small> -->
        <Tabs v-else />
      </div>
      <div class="navbar-end navbar-item is-hidden-desktop">
        <Help />
        <Notifications />
        <a class="navbar-item is-close" title="toggle mute" v-if="$route.params.sessionid">
          <b-icon class="is-primary is-circle" icon="mic"></b-icon>
        </a>
        <Account />
      </div>
    </div>
    <div class="navbar-menu">
      <div class="navbar-center navbar-item is-paddingless">
        <small class="uppercase" v-if="!$route.params.roomid">My Rooms</small>
        <!-- <small class="uppercase" v-if="$route.params.roomid && currentRoom">{{currentRoom.name}}</small> -->
        <Tabs v-else />
      </div>
      <div class="navbar-end is-marginless">
        <Help />
        <Notifications />
        <a class="navbar-item is-close" title="toggle mute" v-if="$route.params.sessionid">
          <b-icon class="is-primary is-circle" icon="mic"></b-icon>
        </a>
        <Account />
      </div>
    </div>
  </nav>
</template>

<script>
import Help from '@/components/navbar/Help'
import Notifications from '@/components/navbar/Notifications'
import Account from '@/components/navbar/Account'
import Tabs from '@/components/navbar/Tabs'

export default {
  name: 'navbar',
  components: {
    Help,
    Notifications,
    Account,
    Tabs
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.navbar {
  border-bottom: 1px solid #f3f3f3;
  background-color: #ffffff;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 19;
}
.uppercase {
  text-transform: uppercase;
  font-size: 0.7rem;
}
.is-close {
  padding-left: 4px!important;
  padding-right: 4px!important;
}
.navbar-center {
  margin: 0 auto;
}
.navbar-burger {
  margin-left: 0;
}
@media screen and (max-width: 1007px) {
  .navbar-brand,
  .navbar-item {
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>
