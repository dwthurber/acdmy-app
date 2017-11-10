<template>
  <b-dropdown
    class="is-marginless has-text-left is-right-bottom">
    <a
      class="navbar-item is-close"
      slot="trigger"
      title="people"
      >
      <b-icon
        icon="people"
        :class="{'is-small': fullscreen}" />
      <!-- <p class="is-size-8 is-uppercase">
        People
      </p> -->
    </a>

    <b-dropdown-item custom class="is-wide-dropdown">
      <article class="media" v-for="person in room.people">
        <figure class="media-left">
          <p class="image is-24x24">
            <img class="is-circle-image" :src="person.profile_picture">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{person.name}}</strong> <small>{{person.role}}</small>
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                <b-icon icon="chat" size="is-small" />
              </a>
              <a class="level-item">
                <b-icon icon="insert_chart" size="is-small" />
              </a>
              <a class="level-item">
                <b-icon icon="more_vert" size="is-small" />
              </a>
            </div>
          </nav>
        </div>
      </article>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SidebarPeople',
  props: {
    fullscreen: Boolean
  },
  computed: {
    ...mapState(['room'])
  }
}
</script>

<style scoped>
.is-wide-dropdown {
  min-width: 300px;
  height: 100%;
  max-height: 700px;
  overflow: scroll;
}
</style>
