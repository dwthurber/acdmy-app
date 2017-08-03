<template>
  <div v-if="user !== false">
    <b-loading :active.sync="isLoading" :canCancel="false"></b-loading>
    <Navbar :controls="controls" />
    <router-view v-if="$route.params.roomid"></router-view>
    <div class="container is-fluid" v-else>
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
          <router-link :to="{ name: 'Main-Classroom', params: {roomid: 'CHqI16'} }" tag="div" class="card">
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
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: { Navbar },
  name: 'main'
}
</script>
<style scoped>
.container {
  padding: 24px;
}
.card:hover {
  cursor: pointer;
  box-shadow: 1px 1px 10px 1px #ccc;
}
.is-fullheight {
  margin: auto 0;
}
</style>
