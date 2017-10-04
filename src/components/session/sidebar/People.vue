<template>
  <div>
    <nav class="level">
      <div class="level-left">
        <b-icon class="level-item" icon="people" size="is-medium"></b-icon>
        <p class="level-item subtitle is-5">
          <span>People</span>
        </p>
      </div>
    </nav>
    <nav class="panel">
      <!-- <p class="panel-heading">
        People
      </p> -->
      <!-- <div class="panel-block">
        <p class="control has-icons-left">
          <input class="input is-small" type="text" placeholder="search">
          <span class="icon is-small is-left">
            <i class="fa fa-search"></i>
          </span>
        </p>
      </div> -->
      <p class="panel-tabs">
        <a class="is-active">People</a>
        <a>Groups</a>
      </p>

      <div class="panel-block" v-for="person in room.people">
        <article class="media">
          <figure class="media-left">
            <p class="image is-24x24">
              <img class="is-circle-image" :src="person.profile_picture">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                {{person.name}}
              </p>
            </div>
          </div>
        </article>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'sidebar-people',
  computed: {
    ...mapState(['room'])
  },
  data () {
    return {
      activeTab: 0
    }
  }
}
</script>

<style scoped>

</style>
