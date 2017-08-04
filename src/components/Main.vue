<template>
  <div v-if="user !== false">
    <b-loading :active.sync="isLoading" :canCancel="false"></b-loading>
    <Navbar />
    <router-view v-if="$route.params.roomid"></router-view>
    <div class="container is-fluid" v-else>
      <div class="columns is-mobile is-multiline is-centered">
        <div class="column is-3">
          <router-link :to="{ name: 'Main-Classroom', params: {roomid: 'CHqI16'} }" tag="div" class="card is-fullheight is-primary is-outlined">
            <div class="card-hover"></div>
            <div class="card-content">
              <div class="content has-text-centered">
                <b-icon icon="library_add" size="is-medium"></b-icon>
                <p class="is-size-5 add-room">Add Room</p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="column is-3">
          <router-link :to="{ name: 'Main-Classroom', params: {roomid: 'CHqI16'} }" tag="div" class="card is-fullheight">
            <div class="card-hover">
              <small class="status">Active</small>
            </div>
            <div class="card-content has-text-centered">
              <div class="content">
                <p class="is-size-5">My Awesome Class</p>
                <small><b-icon icon="people" size="is-small" class="re-align"></b-icon> 12 students</small> <small><b-icon icon="view_list" size="is-small" class="re-align"></b-icon> 6 sessions</small>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import { db } from '@/firebase'

const usersRef = db.ref('users')

export default {
  components: { Navbar },
  name: 'main',
  computed: {
    ...mapGetters(['users']),
    ...mapState(['user'])
  },
  data () {
    return {
      isLoading: true,
      dashboardRoute: ''
    }
  },
  mounted () {
    this.$store.dispatch('setUsersRef', usersRef)
    this.isLoading = false
  }
}
</script>
<style scoped>
.container {
  padding: 24px;
}
.card {
  position: relative;
  background-color: hsl(205, 36%, 43%);
  color: #fff;
  min-height: 250px;
  transition-duration: 0.3s;
}
.is-outlined {
  background-color: #fff;
  border: 1px solid hsl(205, 36%, 43%);
  color: hsl(205, 36%, 43%);
}
.content small {
  margin: 0 4px;
}
.card-content {
  height: 130px;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: -65px;
}
.card-hover {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #333;
  opacity: 0;
  transition-duration: 0.3s;
}
.card:hover {
  cursor: pointer;
}
.card p {
  transition-duration: 0.3s;
}
.card:hover p {
  transform: translateY(5px);
  transition-duration: 0.3s;
}
.card:hover .card-hover {
  opacity: 0.4;
}
.is-fullheight {
  height: 100%;
}
.status {
  position: absolute;
  top: 4px;
  right: 8px;
  color: #fff;
}
.add-room {
  margin-top: 8px;
}
</style>
