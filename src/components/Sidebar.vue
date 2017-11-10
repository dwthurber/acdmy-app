<template>
  <div class="column is-narrow">
    <div class="hero is-fullheight has-text-centered is-sidebar is-paddingless" :class="{'small-sidebar':fullscreen}">
      <div class="hero-head">
        <SidebarAccount :fullscreen="fullscreen" class="avatar" />
        <SidebarPeople :fullscreen="fullscreen" />
        <p v-if="!fullscreen" class="is-size-8 is-uppercase">
          People
        </p>
        <SidebarLayout :fullscreen="fullscreen" />
        <p v-if="!fullscreen" class="is-size-8 is-uppercase">
          Layout
        </p>
        <!-- <SidebarActivities />
        <p class="is-size-8 is-uppercase">
          Activities
        </p> -->
        <!-- <SidebarPlanner />
        <p class="is-size-8 is-uppercase">
          Planner
        </p> -->
        <!-- <b-icon class="" icon="dashboard" />
        <p class="is-size-8 is-uppercase">
          Menu
        </p> -->
        <SidebarMore :fullscreen="fullscreen" />
        <p v-if="!fullscreen" class="is-size-8 is-uppercase">
          More
        </p>
      </div>
      <div class="hero-end">
        <SidebarNotifications />
        <SidebarHelp />
        <SidebarChat :fullscreen="fullscreen" />
        <!-- <p class="is-size-8 is-uppercase">
          Chat
        </p> -->
      </div>
    </div>
  </div>
</template>

<script>
import SidebarHelp from '@/components/SidebarHelp'
import SidebarNotifications from '@/components/SidebarNotifications'
import SidebarAccount from '@/components/SidebarAccount'
import SidebarPeople from '@/components/SidebarPeople'
import SidebarLayout from '@/components/SidebarLayout'
import SidebarActivities from '@/components/SidebarActivities'
import SidebarMore from '@/components/SidebarMore'
import SidebarChat from '@/components/SidebarChat'
import SidebarPlanner from '@/components/SidebarPlanner'
import { mapState } from 'vuex'

export default {
  name: 'sidebar',
  props: {
    fullscreen: Boolean
  },
  components: {
    SidebarHelp,
    SidebarNotifications,
    SidebarAccount,
    SidebarPeople,
    SidebarLayout,
    SidebarActivities,
    SidebarMore,
    SidebarChat,
    SidebarPlanner
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped>
.avatar {
  margin-bottom: .5rem;
}
.hero-head {
  padding-top: .5rem;
}
.hero-end {
  padding-bottom: .5rem;
}
.is-sidebar {
  width: 60px;
}
.hero-head .is-uppercase {
  opacity: 0;
  transition-duration: 0.5s;
  margin-bottom: 0;
}
.hero-head:hover .is-uppercase {
  opacity: 1;
  transition-duration: 0.5s;
}
.chat {
  margin-top: 8px;
}
.small-sidebar {
  width: 52px;
}
</style>
