<template>
  <div>
    <section class="hero is-small">

      <div class="hero-body has-text-centered">
        <div class="container">
          <h1 class="title is-spaced">
            Hello {{ user.displayName }}!
          </h1>
          <h2 class="subtitle">
            Education is the most powerful weapon which you can use to change the world<br>
            <small>~ Nelson Mandela</small>
          </h2>
        </div>
      </div>
    </section>
    <section>
      <div class="container is-fluid">
        <div class="columns is-mobile is-multiline is-centered">
          <div class="column is-3 is-fullheight">
            <div class="block has-text-centered">
              <router-link :to="{ name: 'Dashboard-AddRoom', params: {} }">
                <b-icon icon="library_add" size="is-large"></b-icon>
                <p class="title is-spaced is-4">Add Room</p>
              </router-link>
            </div>
          </div>
          <div class="column is-3">
            <router-link :to="{ name: 'Dashboard-Classroom', params: {roomid: 'CHqI16'} }" tag="div" class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src="http://via.placeholder.com/250x250" alt="Image">
                </figure>
              </div>
              <div class="card-content">
                <div class="content">
                  My Awesome Class<br>
                  <small class="has-text-grey">Inactive</small>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import StatusIndicator from '@/components/StatusIndicator'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Dashboard-Main',
  components: { StatusIndicator },
  computed: {
    ...mapGetters(['users']),
    ...mapState(['user'])
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.card:hover {
  cursor: pointer;
  box-shadow: 1px 1px 10px 1px #ccc;
}
.is-fullheight {
  margin: auto 0;
}
.is-spaced {
  margin-top: 16px;
}
</style>
