<template>
  <div class="column is-narrow">
    <div class="hero is-fullheight has-text-centered is-sidebar is-paddingless">
      <div class="hero-head">
        <SidebarAccount class="avatar" />
        <b-icon class="" icon="people" />
        <p class="is-size-8 is-uppercase">
          People
        </p>
        <b-icon class="" icon="group_work" />
        <p class="is-size-8 is-uppercase">
          Layout
        </p>
        <b-icon class="" icon="apps" />
        <p class="is-size-8 is-uppercase">
          Activities
        </p>
        <b-icon class="" icon="library_books" />
        <p class="is-size-8 is-uppercase">
          Planner
        </p>
        <b-icon class="" icon="dashboard" />
        <p class="is-size-8 is-uppercase">
          Menu
        </p>
        <b-icon class="" icon="more" />
        <p class="is-size-8 is-uppercase">
          More
        </p>
      </div>
      <div class="hero-end">
        <SidebarNotifications /><br />
        <SidebarHelp /><br />
        <b-icon class="chat" icon="chat" />
        <p class="is-size-8 is-uppercase">
          Chat
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarHelp from '@/components/SidebarHelp'
import SidebarNotifications from '@/components/SidebarNotifications'
import SidebarAccount from '@/components/SidebarAccount'
import { mapState } from 'vuex'

export default {
  name: 'sidebar',
  components: {
    SidebarHelp,
    SidebarNotifications,
    SidebarAccount
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped>
.avatar {
  margin: .5rem auto;
}
.is-sidebar {
  width: 64px;
}
.is-sidebar .is-uppercase {
  opacity: 0;
  transition-duration: 0.5s;
}
.is-sidebar:hover .is-uppercase {
  opacity: 1;
  transition-duration: 0.5s;
}
.chat {
  margin-top: 8px;
}
</style>
