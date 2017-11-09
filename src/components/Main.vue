<template>
  <div class="columns is-mobile is-gapless">
    <Sidebar />
    <div class="column" v-if="userDetails.activeRoom">

      <div class="box is-paddingless">
        <div class="hero is-fullheight">
          <div class="hero-head">
            <div class="level is-mobile">
              <p class="level-item is-uppercase is-size-7">{{ room.data.name }}</p>
              <div class="level-right">
                <img class="level-item" src="../assets/acdmy.png" alt="Acdmy: Synchronous Online Learning Platform">
              </div>
            </div>
          </div>
          <div class="hero-body">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import { mapState } from 'vuex'
import { usersRef, roomsRef, peopleRef, sessionsRef } from '@/firebase'

export default {
  name: 'main',
  components: {
    Sidebar
  },
  computed: {
    ...mapState(['user', 'route', 'userDetails', 'room'])
  },
  data () {
    return {
      isCardModalActive: true
    }
  },
  mounted () {
    this.$store.dispatch('setUserDetailsRef', usersRef.child(this.user.uid))
    if (this.userDetails.activeRoom) {
      this.bindRefs()
    }
  },
  methods: {
    bindRefs () {
      this.$store.dispatch('setSessionsRef', sessionsRef.child(this.userDetails.activeRoom))
      this.$store.dispatch('setPeopleRef', peopleRef.child(this.userDetails.activeRoom))
      this.$store.dispatch('setCurrentRoomRef', roomsRef.child(this.userDetails.activeRoom))
      this.$store.dispatch('setCurrentUserRef', peopleRef.child(this.userDetails.activeRoom).child(this.user.uid))
    }
  }
}
</script>

<style scoped>
.hero-head img {
  margin: .5rem auto;
}
.hero-head .image {
  margin-bottom: 1rem;
}
.hero-head {
  padding: 0 .5rem;
}
.main {
  flex: 1;
  overflow-y: auto;
}
.level {
  min-height: 2.25rem;
}
.container {
  padding: 24px;
}
img.level-item {
  max-height: 1.75rem;
}
.level-item.is-uppercase {
  letter-spacing: 0.25rem;
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
.box {
  z-index: 10;
}
</style>
