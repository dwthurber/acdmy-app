<template>
  <nav class="navbar is-marginless" id="top">
    <div class="navbar-brand">
      <SidebarAccount />
      <div class="is-hidden-desktop navbar-center navbar-item is-paddingless">
      </div>
      <div class="navbar-end navbar-item is-hidden-desktop">
        <SidebarHelp />
        <SidebarNotifications />
      </div>
    </div>
    <div class="navbar-menu">
      <div class="navbar-center navbar-item is-paddingless">
      </div>
      <div class="navbar-end is-marginless">
        <SidebarHelp />
        <SidebarNotifications />
        <router-link
          :to="{ name: 'Main' }"
          class="navbar-item">
          <img src="../assets/acdmy.png" alt="Acdmy: Synchronous Online Learning Platform">
        </router-link>
      </div>
    </div>
    <NavbarTabs />
  </nav>
</template>

<script>
import SidebarHelp from '@/components/SidebarHelp'
import SidebarNotifications from '@/components/SidebarNotifications'
import SidebarAccount from '@/components/SidebarAccount'
import NavbarTabs from '@/components/NavbarTabs'

export default {
  name: 'Navbar',
  components: {
    SidebarHelp,
    SidebarNotifications,
    SidebarAccount,
    NavbarTabs
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.navbar {
  /*border-bottom: 1px solid #f3f3f3;
  background-color: #ffffff;*/
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
