<template>
  <nav class="navbar is-marginless" id="top">
    <div class="navbar-brand">
      <router-link :to="{ name: 'Main' }" class="navbar-item"><img src="../assets/acdmy.png" alt="Acdmy: Synchronous Online Learning Platform"></router-link>
      <div class="is-hidden-desktop navbar-center navbar-item is-paddingless">
      </div>
      <div class="navbar-end navbar-item is-hidden-desktop">
        <Help />
        <Notifications />
        <Account />
      </div>
    </div>
    <div class="navbar-menu">
      <div class="navbar-center navbar-item is-paddingless">
      </div>
      <div class="navbar-end is-marginless">
        <Help />
        <Notifications />
        <Account />
      </div>
    </div>
    <Tabs />
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
  width: 100%;
}
.navbar-brand,
.navbar-end {
  z-index: 20;
}
.navbar-center {
  margin: 0 auto;
}
@media screen and (max-width: 1007px) {
  .navbar-brand,
  .navbar-item {
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>
